// ============ Player State ============
export interface PlayerState {
  characterId: string;
  hp: number;
  maxHp: number;
  moveSpeed: number;
  weaponId: string;
  ammo: number;
  maxAmmo: number;
  gold: number;
}

// ============ Enemy State ============
export interface EnemyState {
  id: string;
  enemyId: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
}

// ============ Run State ============
export interface RunState {
  mapId: string;
  currentWave: number;
  elapsedMs: number;
  enemies: EnemyState[];
  completed: boolean;
  failed: boolean;
}

// ============ Save Data ============
export interface SaveData {
  meta: {
    version: number;
    createdAt: number;
    updatedAt: number;
  };
  settings: {
    volume: number;
    sfxVolume: number;
    musicVolume: number;
  };
  progression: {
    gold: number;
    unlockedWeapons: string[];
    upgrades: Record<string, number>;
    clearedMaps: string[];
  };
  story: {
    readChapters: string[];
    flags: Record<string, boolean>;
    currentChapter: string | null;
  };
}
