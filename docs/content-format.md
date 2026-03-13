# Content Format

这份文档定义 `anonsaki-odyssey` 的内容组织方式。

目标只有两个：
- **让内容可维护**
- **给未来模组留路**

所以原则非常简单：

> **所有游戏内容尽量写成数据文件，代码只负责加载、校验和执行。**

---

## 1. 目录结构

推荐内容目录：

```txt
public/content/base/
├─ manifest.json
├─ characters/
├─ portraits/
├─ weapons/
├─ enemies/
├─ maps/
├─ story/
├─ shop/
└─ audio/
```

如果未来支持模组：

```txt
public/mods/<mod-id>/
├─ manifest.json
├─ characters/
├─ portraits/
├─ weapons/
├─ enemies/
├─ maps/
├─ story/
├─ shop/
└─ audio/
```

### 基本原则

- 每类资源一个目录
- 一个文件描述一个对象，或者一个文件描述一个章节/关卡
- 文件名尽量和 `id` 接近
- `id` 一旦发布，尽量别乱改

ID 改来改去是内容系统最蠢的自爆方式之一。

---

## 2. manifest.json

每个内容包都应该有 `manifest.json`，用于描述包本身。

示例：

```json
{
  "id": "base",
  "name": "Base Content Pack",
  "version": "0.1.0",
  "title": "Anonsaki Odyssey Base",
  "author": "Akanclaw",
  "description": "Official base content pack.",
  "entry": {
    "characters": "characters",
    "portraits": "portraits",
    "weapons": "weapons",
    "enemies": "enemies",
    "maps": "maps",
    "story": "story",
    "shop": "shop",
    "audio": "audio"
  }
}
```

### 推荐字段

- `id`: 内容包 ID
- `name`: 机器可读名称
- `version`: 版本号
- `title`: 展示名称
- `author`: 作者
- `description`: 简介
- `entry`: 各类内容入口目录

如果以后支持依赖关系，可以加：
- `dependencies`
- `loadAfter`

---

## 3. 通用字段约定

不管是哪类内容，建议都遵守几个通用约定：

### 3.1 id
全局唯一标识。

格式建议：

```txt
<domain>.<name>
```

例如：
- `character.anon`
- `character.sakiko`
- `weapon.rusty-pistol`
- `enemy.street-drone`
- `map.abandoned-station`
- `story.chapter-01`

### 3.2 version
可选，但推荐保留。

```json
"version": 1
```

用于内容迁移和调试。

### 3.3 tags
给检索和筛选留口子。

```json
"tags": ["starter", "pistol", "shop"]
```

### 3.4 meta
放扩展信息，别污染主结构。

```json
"meta": {
  "author": "official",
  "notes": "starter content"
}
```

---

## 4. characters/

角色定义主要服务于：
- 剧情展示
- 可玩角色基础配置
- 立绘与名字映射

示例：`characters/anon.json`

```json
{
  "id": "character.anon",
  "key": "anon",
  "name": "爱音",
  "playable": true,
  "defaultPortrait": "portrait.anon.default",
  "portraits": [
    "portrait.anon.default",
    "portrait.anon.happy",
    "portrait.anon.angry"
  ],
  "baseStats": {
    "maxHp": 100,
    "moveSpeed": 180,
    "critRate": 0.05
  },
  "starterWeapon": "weapon.rusty-pistol"
}
```

### 推荐字段

- `id`
- `key`: 短键名，便于脚本引用
- `name`
- `playable`
- `defaultPortrait`
- `portraits`
- `baseStats`
- `starterWeapon`

角色文件别塞太多战斗技能细节。复杂能力更适合拆到独立系统或 rig 配置里。

---

## 5. portraits/

立绘资源单独定义，避免角色文件里直接写死路径。

示例：`portraits/anon.default.json`

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

### 推荐字段

- `id`
- `characterId`
- `expression`
- `slot`
- `asset`

这样剧情脚本只需要写：
- 角色是谁
- 表情是什么

而不是每次手写图片路径，太原始了。

---

## 6. weapons/

武器定义要尽量数据化。

示例：`weapons/rusty-pistol.json`

```json
{
  "id": "weapon.rusty-pistol",
  "name": "Rusty Pistol",
  "type": "pistol",
  "rarity": "common",
  "stats": {
    "damage": 12,
    "fireIntervalMs": 240,
    "projectileSpeed": 640,
    "magazineSize": 12,
    "reloadMs": 1200
  },
  "projectile": {
    "kind": "bullet.basic",
    "pierce": 0,
    "spread": 0
  },
  "price": 100,
  "unlock": {
    "type": "default"
  }
}
```

### 推荐字段

- `id`
- `name`
- `type`
- `rarity`
- `stats`
- `projectile`
- `price`
- `unlock`

### 注意

如果后面发现武器配置越来越复杂，就把：
- 发射行为
- 特效行为
- 命中附加效果

拆成独立行为 ID，别把一个 JSON 塞成垃圾场。

---

## 7. enemies/

敌人配置建议分“显示信息 + 数值 + 行为引用”。

示例：

```json
{
  "id": "enemy.street-drone",
  "name": "Street Drone",
  "kind": "normal",
  "stats": {
    "maxHp": 40,
    "moveSpeed": 100,
    "contactDamage": 10
  },
  "behavior": {
    "ai": "ai.walk-forward",
    "attack": "attack.contact"
  },
  "rewards": {
    "gold": 8
  }
}
```

### 推荐字段

- `id`
- `name`
- `kind`
- `stats`
- `behavior`
- `rewards`

不要把整套 AI 树直接硬编码进内容文件。引用行为模板就够了。

---

## 8. maps/

地图配置建议包含：
- 基础资源引用
- 关卡目标
- 刷怪波次
- 胜败条件

示例：

```json
{
  "id": "map.abandoned-station",
  "name": "Abandoned Station",
  "background": "/content/base/maps/abandoned-station/bg.png",
  "music": "audio.bgm.station",
  "playerSpawn": {
    "x": 120,
    "y": 300
  },
  "objective": {
    "type": "survive",
    "durationMs": 90000
  },
  "waves": [
    {
      "atMs": 0,
      "spawns": [
        { "enemyId": "enemy.street-drone", "count": 5 }
      ]
    }
  ]
}
```

### 推荐字段

- `id`
- `name`
- `background`
- `music`
- `playerSpawn`
- `objective`
- `waves`

如果以后地图越来越复杂，再考虑拆 tilemap、碰撞层和脚本触发器。现在别过度设计。

---

## 9. story/

剧情建议按“章节 / 段落”组织。

示例：`story/chapter-01.json`

```json
{
  "id": "story.chapter-01",
  "title": "Chapter 1",
  "nodes": [
    {
      "type": "background",
      "asset": "/content/base/story/bg/classroom.png"
    },
    {
      "type": "showPortrait",
      "slot": "left",
      "portraitId": "portrait.anon.default"
    },
    {
      "type": "say",
      "speaker": "character.anon",
      "text": "……这是哪？"
    },
    {
      "type": "choice",
      "id": "c1",
      "options": [
        {
          "text": "继续前进",
          "next": "node_after_choice"
        }
      ]
    }
  ]
}
```

### 推荐节点类型

- `background`
- `showPortrait`
- `hidePortrait`
- `say`
- `choice`
- `jump`
- `setFlag`
- `battle`

### `say` 节点建议字段

```json
{
  "type": "say",
  "speaker": "character.sakiko",
  "text": "台词内容",
  "portrait": "portrait.sakiko.default",
  "voice": null
}
```

### 关键原则

- 剧情写数据，不写代码
- 节点类型控制在少量可维护范围
- 分支要能靠 `flag` 表达

一上来搞几十种节点类型，后面维护的人只会想打你。

---

## 10. shop/

商店内容建议是“货品定义”，而不是逻辑脚本。

示例：

```json
{
  "id": "shop.weapon.rusty-pistol",
  "category": "weapon",
  "targetId": "weapon.rusty-pistol",
  "name": "Rusty Pistol",
  "price": 100,
  "currency": "gold",
  "requirements": [],
  "once": true
}
```

### 推荐字段

- `id`
- `category`
- `targetId`
- `name`
- `price`
- `currency`
- `requirements`
- `once`

### requirements 示例

```json
[
  {
    "type": "storyFlag",
    "flag": "chapter1.cleared"
  }
]
```

商店逻辑要在代码里做校验，内容层只描述“卖什么、卖多少钱、需要什么条件”。

---

## 11. audio/

音频资源也建议做成映射表。

示例：

```json
{
  "id": "audio.bgm.station",
  "kind": "bgm",
  "path": "/content/base/audio/bgm/station.ogg",
  "loop": true,
  "volume": 0.8
}
```

### 推荐字段

- `id`
- `kind`
- `path`
- `loop`
- `volume`

这样剧情、地图、UI 只要引用音频 ID，不直接写路径。

---

## 12. 校验规则建议

内容加载时至少做这些检查：

### 必查
- `id` 是否存在
- `id` 是否重复
- 必填字段是否缺失
- 引用的外部 ID 是否存在
- 数值字段类型是否正确

### 推荐补充
- 未使用资源提示
- 非法枚举值提示
- 路径不存在提示
- 剧情节点 next/jump 死链检查

内容不校验，后面 debug 会烂得一塌糊涂。

---

## 13. 命名规范

### 文件名
统一用：
- 小写
- kebab-case

例如：
- `rusty-pistol.json`
- `abandoned-station.json`
- `chapter-01.json`

### ID
统一小写，推荐点式命名：
- `weapon.rusty-pistol`
- `story.chapter-01`

### key
如果需要短键名，保持：
- 小写
- 简短
- 稳定

---

## 14. 向后兼容建议

如果内容格式未来会变，建议：

- 在内容对象保留 `version`
- 在加载器里做格式迁移
- 尽量新增字段，不随便删旧字段

否则一更新内容格式，旧包全炸，体验跟踩雷没区别。

---

## 15. 最小可行版本

第一阶段其实不需要把所有类型都做满。

最小可行内容格式只要先支持：
- `characters`
- `portraits`
- `weapons`
- `story`
- `shop`

然后再补：
- `enemies`
- `maps`
- `audio`

别想一步到位。一步到位通常等于一步摔死。

---

## 16. 一句话总结

这个项目的内容格式核心思想是：

> **稳定 ID、明确目录、统一 schema、代码只执行数据。**

做到这四点，后面无论加剧情、加武器、加地图还是做模组，都不会太痛苦。
