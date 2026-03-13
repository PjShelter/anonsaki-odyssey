import { z } from 'zod';

// ============ Manifest ============
export const ManifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  entry: z.object({
    characters: z.string(),
    portraits: z.string(),
    weapons: z.string(),
    enemies: z.string(),
    maps: z.string(),
    story: z.string(),
    shop: z.string(),
    audio: z.string(),
  }),
});

export type Manifest = z.infer<typeof ManifestSchema>;

// ============ Character ============
export const CharacterSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  playable: z.boolean(),
  defaultPortrait: z.string(),
  portraits: z.array(z.string()),
  baseStats: z.object({
    maxHp: z.number(),
    moveSpeed: z.number(),
    critRate: z.number(),
  }),
  starterWeapon: z.string(),
});

export type Character = z.infer<typeof CharacterSchema>;

// ============ Portrait ============
export const PortraitSchema = z.object({
  id: z.string(),
  characterId: z.string(),
  expression: z.string(),
  slot: z.array(z.enum(['left', 'center', 'right'])),
  asset: z.object({
    type: z.literal('image'),
    path: z.string(),
  }),
});

export type Portrait = z.infer<typeof PortraitSchema>;

// ============ Weapon ============
export const WeaponSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  stats: z.object({
    damage: z.number(),
    fireIntervalMs: z.number(),
    projectileSpeed: z.number(),
    magazineSize: z.number(),
    reloadMs: z.number(),
  }),
  projectile: z.object({
    kind: z.string(),
    pierce: z.number(),
    spread: z.number(),
  }),
  price: z.number(),
  unlock: z.object({
    type: z.string(),
  }),
});

export type Weapon = z.infer<typeof WeaponSchema>;

// ============ Enemy ============
export const EnemySchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.string(),
  stats: z.object({
    maxHp: z.number(),
    moveSpeed: z.number(),
    contactDamage: z.number(),
  }),
  behavior: z.object({
    ai: z.string(),
    attack: z.string(),
  }),
  rewards: z.object({
    gold: z.number(),
  }),
});

export type Enemy = z.infer<typeof EnemySchema>;

// ============ Map ============
export const MapSchema = z.object({
  id: z.string(),
  name: z.string(),
  background: z.string(),
  music: z.string(),
  playerSpawn: z.object({
    x: z.number(),
    y: z.number(),
  }),
  objective: z.object({
    type: z.string(),
    durationMs: z.number().optional(),
  }),
  waves: z.array(z.object({
    atMs: z.number(),
    spawns: z.array(z.object({
      enemyId: z.string(),
      count: z.number(),
    })),
  })),
});

export type Map = z.infer<typeof MapSchema>;

// ============ Story ============
export const StoryNodeSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('background'), asset: z.string() }),
  z.object({ type: z.literal('showPortrait'), slot: z.enum(['left', 'center', 'right']), portraitId: z.string() }),
  z.object({ type: z.literal('hidePortrait'), slot: z.enum(['left', 'center', 'right']) }),
  z.object({ type: z.literal('say'), speaker: z.string(), text: z.string(), portrait: z.string().optional(), voice: z.string().nullable().optional() }),
  z.object({ type: z.literal('choice'), id: z.string(), options: z.array(z.object({ text: z.string(), next: z.string() })) }),
  z.object({ type: z.literal('jump'), target: z.string() }),
  z.object({ type: z.literal('setFlag'), flag: z.string(), value: z.boolean() }),
  z.object({ type: z.literal('battle'), mapId: z.string() }),
]);

export const StorySchema = z.object({
  id: z.string(),
  title: z.string(),
  nodes: z.array(StoryNodeSchema),
});

export type StoryNode = z.infer<typeof StoryNodeSchema>;
export type Story = z.infer<typeof StorySchema>;

// ============ Shop ============
export const ShopItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  targetId: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  requirements: z.array(z.object({
    type: z.string(),
    flag: z.string().optional(),
  })),
  once: z.boolean(),
});

export type ShopItem = z.infer<typeof ShopItemSchema>;

// ============ Audio ============
export const AudioSchema = z.object({
  id: z.string(),
  kind: z.enum(['bgm', 'sfx', 'voice']),
  path: z.string(),
  loop: z.boolean(),
  volume: z.number(),
});

export type Audio = z.infer<typeof AudioSchema>;
