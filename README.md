# anonsaki-odyssey

**Anonsaki's Odyssey** 是一个基于 **Phaser 3 + TypeScript** 的 2D 横版射击游戏项目骨架。

项目目标很明确：
- 战斗部分偏 **类《爆枪英雄》**
- 剧情部分是 **轻量对话展示层**，不是完整 galgame 引擎
- 只做 **局外商店**
- 内容结构尽量 **数据驱动**，方便后续做模组 / 创意工坊

## 当前状态

当前仓库是一个**空项目骨架**，只包含：

- 基础目录结构
- TypeScript / Vite / Phaser 依赖配置
- 场景文件占位
- `public/content/base` 内容目录
- `docs/` 文档目录
- 主角占位数据：
  - `anon` → 爱音
  - `sakiko` → 祥子

目前**没有实际游戏逻辑**，这是故意的。先把结构钉死，再往里填东西，省得后面长成屎山。

## 技术栈

- **Phaser 3**
- **TypeScript**
- **Vite**

## 项目结构

```txt
project-root/
├─ public/
│  ├─ content/
│  │  └─ base/
│  │     ├─ characters/
│  │     ├─ portraits/
│  │     ├─ weapons/
│  │     ├─ enemies/
│  │     ├─ maps/
│  │     ├─ story/
│  │     ├─ shop/
│  │     └─ audio/
│  └─ mods/
│
├─ src/
│  ├─ main.ts
│  └─ game/
│     ├─ scenes/
│     ├─ engine/
│     ├─ entities/
│     ├─ rigs/
│     └─ ui/
│
└─ docs/
```

## 设计原则

### 1. 不是 galgame 引擎
剧情系统只需要：
- 左 / 中 / 右 三个立绘槽位
- 当前说话角色高亮
- 其他角色变暗
- 立绘切换
- 点击继续 / 简单选项

别把事情搞复杂。

### 2. 只做局外商店
商店负责：
- 武器解锁
- 常驻强化
- 基础属性升级

不做局内商店。

### 3. 代码是引擎，内容是包
- `src/` 放逻辑
- `public/content/base/` 放官方内容
- `public/mods/` 放模组内容

这样后续扩展才不会炸。

## 角色占位

### 爱音（Anon）
- ID: `anon`
- 名字: `爱音`

### 祥子（Sakiko）
- ID: `sakiko`
- 名字: `祥子`

## 可用脚本

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 下一步建议

下一阶段适合补这些：

1. `MainMenuScene` 基础启动流程
2. `DialogueScene` 的三槽位剧情 UI
3. `BattleScene` 的空战斗场景
4. `ShopScene` 的局外商店 UI 骨架
5. 基础内容加载器

## License

MIT
