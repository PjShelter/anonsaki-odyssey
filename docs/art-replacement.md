# 美术素材替换指南

## 当前状态

目前游戏使用的是**代码生成的占位图形**（纯色矩形），这是为了快速搭建架构。你可以随时替换成任何风格的美术素材。

---

## 支持的美术风格

项目架构**不限制美术风格**，你可以使用：

- **2D 手绘风格**（推荐）
- **卡通风格**
- **赛博朋克风格**
- **日系动漫风格**
- 像素风（如果你想的话）

只要是 PNG/JPG 图片，都可以直接使用。

---

## 需要替换的素材类型

### 1. 角色立绘（Portraits）

**当前位置：** 代码生成的灰色矩形

**替换方法：**

1. 准备立绘图片（推荐尺寸：400x800 或更大）
2. 放到 `public/content/base/portraits/` 目录下
3. 更新配置文件

**示例：**

```bash
public/content/base/portraits/
├── anon/
│   ├── default.png      # 爱音默认表情
│   ├── happy.png        # 爱音开心表情
│   └── angry.png        # 爱音生气表情
└── sakiko/
    ├── default.png      # 祥子默认表情
    └── happy.png
```

**配置文件：** `public/content/base/portraits/anon.default.json`

```json
{
  "id": "portrait.anon.default",
  "characterId": "character.anon",
  "expression": "default",
  "slot": ["left", "center", "right"],
  "asset": {
    "type": "image",
    "path": "/content/base/portraits/anon/default.png"
  }
}
```

---

### 2. 角色精灵（Player/Enemy）

**当前位置：** `src/game/entities/Player.ts` 和 `Enemy.ts` 中的 `createTexture()` 方法

**替换方法：**

#### 方案 A：使用静态图片

1. 准备角色图片（推荐尺寸：64x64 或 128x128）
2. 放到 `public/assets/sprites/` 目录
3. 在 `BootScene` 中预加载：

```typescript
preload() {
  this.load.image('player', '/assets/sprites/player.png');
  this.load.image('enemy', '/assets/sprites/enemy.png');
}
```

4. 修改 `Player.ts`，删除 `setFillStyle()` 方法，直接使用：

```typescript
constructor(scene: Phaser.Scene, x: number, y: number) {
  super(scene, x, y, 'player');  // 使用预加载的贴图
  scene.add.existing(this);
  scene.physics.add.existing(this);
}
```

#### 方案 B：使用精灵表（Sprite Sheet）

如果你有动画帧：

```typescript
preload() {
  this.load.spritesheet('player', '/assets/sprites/player-sheet.png', {
    frameWidth: 64,
    frameHeight: 64
  });
}

create() {
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
}
```

---

### 3. 武器和子弹

**当前位置：** `Projectile.ts` 中的黄色圆点

**替换方法：**

```typescript
// 在 BootScene 预加载
preload() {
  this.load.image('bullet', '/assets/sprites/bullet.png');
}

// 在 Projectile.ts 中使用
constructor(scene: Phaser.Scene, x: number, y: number, damage: number, speed: number) {
  super(scene, x, y, 'bullet');  // 直接使用贴图
  // ...
}
```

---

### 4. 背景和场景

**当前位置：** 纯色背景

**替换方法：**

在各个场景的 `create()` 方法中添加背景：

```typescript
create() {
  // 添加背景图
  this.add.image(640, 360, 'background').setDepth(-1);

  // 或使用平���背景
  this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0);
}
```

预加载背景：

```typescript
preload() {
  this.load.image('menu-bg', '/assets/backgrounds/menu.png');
  this.load.image('battle-bg', '/assets/backgrounds/station.png');
}
```

---

### 5. UI 元素

**当前位置：** 纯色矩形按钮

**替换方法：**

使用 9-slice（九宫格）图片：

```typescript
// 预加载
this.load.image('button', '/assets/ui/button.png');

// 使用
const button = this.add.nineslice(x, y, 'button', 0, width, height,
  leftWidth, rightWidth, topHeight, bottomHeight
);
```

或使用 rex-plugins 的圆角矩形 + 自定义样式。

---

## 推荐的美术资源结构

```
public/
├── assets/
│   ├── sprites/
│   │   ├── player.png
│   │   ├── enemies/
│   │   │   ├── drone.png
│   │   │   └── boss.png
│   │   └── bullets/
│   │       ├── bullet-basic.png
│   │       └── bullet-laser.png
│   ├── backgrounds/
│   │   ├── menu.png
│   │   ├── station.png
│   │   └── city.png
│   ├── ui/
│   │   ├── button.png
│   │   ├── panel.png
│   │   └── icons/
│   └── audio/
│       ├── bgm/
│       └── sfx/
└── content/
    └── base/
        └── portraits/
```

---

## 美术规格建议

### 分辨率
- 游戏分辨率：1280x720
- 立绘：400-600px 宽，800-1200px 高
- 角色精灵：64x64 或 128x128
- 背景：1280x720 或更大

### 格式
- 推荐 PNG（支持透明）
- 背景可用 JPG（文件更小）

### 命名规范
- 小写字母
- 用连字符分隔：`player-idle.png`
- 避免空格和特殊字符

---

## 快速测试

替换一个素材测试流程：

1. 准备一张图片 `player.png`
2. 放到 `public/assets/sprites/player.png`
3. 修改 `BootScene.ts`：

```typescript
preload() {
  this.load.image('player', '/assets/sprites/player.png');
}
```

4. 修改 `Player.ts`：

```typescript
constructor(scene: Phaser.Scene, x: number, y: number) {
  super(scene, x, y, 'player');
  scene.add.existing(this);
  scene.physics.add.existing(this);
  // 删除 setFillStyle 相关代码
}
```

5. 刷新浏览器查看效果

---

## 注意事项

1. **图片路径**：从 `public/` 开始的路径，访问时去掉 `public`
   - 文件：`public/assets/player.png`
   - 加载：`/assets/player.png`

2. **预加载**：所有资源必须在 `preload()` 中加载，才能在 `create()` 中使用

3. **性能**：大图片会影响加载速度，建议压缩优化

4. **透明度**：角色和 UI 元素用 PNG，背景可用 JPG

---

下一步建议：先替换一两个素材测试流程，确认没问题后再批量替换。
