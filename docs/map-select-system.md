# 地图选关系统设计

## 需求概述

将主菜单改为**地图选关界面**，玩家可以：
- 点击关卡节点进入战斗
- 随着剧情推进解锁新关卡
- 解锁商店等功能入口

---

## 系统架构

### 1. 场景流程调整

**当前流程：**
```
BootScene → MainMenuScene → DialogueScene/BattleScene
```

**新流程：**
```
BootScene → MapSelectScene → BattleScene/DialogueScene/ShopScene
```

---

## 实现步骤

### 步骤 1：创建地图选关场景

创建 `src/game/scenes/MapSelectScene.ts`：

```typescript
import Phaser from 'phaser';
import type { SaveData } from '../types';

export class MapSelectScene extends Phaser.Scene {
  private saveData!: SaveData;

  constructor() {
    super({ key: 'MapSelectScene' });
  }

  create() {
    this.saveData = this.registry.get('saveData');

    // 背景
    this.cameras.main.setBackgroundColor(0x1a1a2e);

    // 标题
    this.add.text(640, 50, '关卡选择', {
      fontSize: '48px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // 创建关卡节点
    this.createStageNode(300, 300, 'stage-01', '第一关');
    this.createStageNode(640, 300, 'stage-02', '第二关');
    this.createStageNode(980, 300, 'stage-03', '第三关');

    // 功能入口
    this.createFunctionButton(200, 600, '商店', 'ShopScene', 'shop');
    this.createFunctionButton(640, 600, '设置', null, null);
  }

  private createStageNode(x: number, y: number, stageId: string, label: string) {
    const unlocked = this.saveData.progression.clearedMaps.includes(stageId) || stageId === 'stage-01';
    const color = unlocked ? 0x4a90e2 : 0x666666;

    const node = this.add.circle(x, y, 50, color)
      .setInteractive({ useHandCursor: unlocked })
      .on('pointerdown', () => {
        if (unlocked) this.scene.start('BattleScene', { mapId: stageId });
      });

    this.add.text(x, y + 80, label, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);

    if (!unlocked) {
      this.add.image(x, y, 'lock-icon').setScale(0.5);
    }
  }

  private createFunctionButton(x: number, y: number, label: string, targetScene: string | null, unlockFlag: string | null) {
    const unlocked = !unlockFlag || this.saveData.story.flags[unlockFlag];
    const color = unlocked ? 0x4a4a4a : 0x333333;

    const btn = this.add.rectangle(x, y, 200, 50, color)
      .setInteractive({ useHandCursor: unlocked })
      .on('pointerdown', () => {
        if (unlocked && targetScene) this.scene.start(targetScene);
      });

    this.add.text(x, y, unlocked ? label : `${label}(未解锁)`, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
  }
}
```

---

### 步骤 2：修改启动流程

修改 `src/game/scenes/BootScene.ts`：

```typescript
create() {
  // ... 现有代码 ...
  this.scene.start('MapSelectScene');  // 改为启动地图选关场景
}
```

修改 `src/main.ts`，添加新场景：

```typescript
import { MapSelectScene } from './game/scenes/MapSelectScene';

const config: Phaser.Types.Core.GameConfig = {
  // ...
  scene: [BootScene, MapSelectScene, MainMenuScene, DialogueScene, BattleScene, ShopScene, GameOverScene],
};
```

---

### 步骤 3：扩展存档结构

在 `src/game/types/runtime.ts` 中添加解锁状态：

```typescript
export interface SaveData {
  // ... 现有字段 ...
  progression: {
    gold: number;
    unlockedWeapons: string[];
    upgrades: Record<string, number>;
    clearedMaps: string[];
    unlockedStages: string[];  // 新增：已解锁关卡
  };
  story: {
    readChapters: string[];
    flags: Record<string, boolean>;
    currentChapter: string | null;
  };
}
```

---

### 步骤 4：解锁逻辑

#### 通过剧情解锁

在 `DialogueRunner` 执行剧情时设置标记：

```typescript
// 剧情节点示例
{
  "type": "setFlag",
  "flag": "shop",
  "value": true
}
```

#### 通过战斗解锁

在 `BattleScene` 战斗胜利后：

```typescript
onStageCleared() {
  const saveData = this.registry.get('saveData');
  saveData.progression.clearedMaps.push(this.currentMapId);

  // 解锁下一关
  if (this.currentMapId === 'stage-01') {
    saveData.progression.unlockedStages.push('stage-02');
  }

  const saveManager = this.registry.get('saveManager');
  saveManager.save(saveData);

  this.scene.start('MapSelectScene');
}
```

---

## 视觉设计建议

### 1. 关卡节点样式

**已解锁：**
- 蓝色圆形节点
- 可点击，有悬停效果
- 显示关卡名称

**未解锁：**
- 灰色节点
- 显示锁图标
- 不可点击

**已通关：**
- 金色边框
- 显示星级评价

### 2. 地图背景

可以使用：
- 世界地图背景图
- 关卡节点用线条连接
- 显示当前进度

### 3. 功能入口

底部显示：
- 商店（需解锁）
- 设置
- 图鉴（可选）
- 成就（可选）

---

## 配置文件示例

创建 `public/content/base/stages/stage-config.json`：

```json
{
  "stages": [
    {
      "id": "stage-01",
      "name": "废弃车站",
      "mapId": "map.abandoned-station",
      "unlockCondition": "default",
      "position": { "x": 300, "y": 300 }
    },
    {
      "id": "stage-02",
      "name": "城市街道",
      "mapId": "map.city-street",
      "unlockCondition": "stage-01-cleared",
      "position": { "x": 640, "y": 300 }
    }
  ]
}
```

---

## 实现优先级

1. **基础版本**（最小可用）
   - 3-5 个关卡节点
   - 简单的解锁逻辑
   - 商店入口

2. **完善版本**
   - 关卡连线
   - 星级评价
   - 更多功能入口

3. **高级版本**
   - 世界地图背景
   - 关卡预览
   - 难度选择

---

## 下一步

1. 创建 `MapSelectScene.ts`
2. 修改 `BootScene` 启动流程
3. 测试关卡解锁逻辑
4. 添加美术素材（背景、节点图标）

