import { openDB, type IDBPDatabase } from 'idb';
import type { SaveData } from '../types';

const DB_NAME = 'anonsaki-odyssey';
const DB_VERSION = 1;
const STORE_NAME = 'saves';
const SAVE_KEY = 'main';

export class SaveManager {
  private db: IDBPDatabase | null = null;

  async init() {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  async load(): Promise<SaveData> {
    if (!this.db) await this.init();
    const data = await this.db!.get(STORE_NAME, SAVE_KEY);
    return data || this.createDefault();
  }

  async save(data: SaveData) {
    if (!this.db) await this.init();
    data.meta.updatedAt = Date.now();
    await this.db!.put(STORE_NAME, data, SAVE_KEY);
  }

  private createDefault(): SaveData {
    return {
      meta: {
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      settings: {
        volume: 0.8,
        sfxVolume: 0.8,
        musicVolume: 0.6,
      },
      progression: {
        gold: 0,
        unlockedWeapons: [],
        upgrades: {},
        clearedMaps: [],
      },
      story: {
        readChapters: [],
        flags: {},
        currentChapter: null,
      },
    };
  }

  getSettings() {
    const volume = localStorage.getItem('volume');
    const sfxVolume = localStorage.getItem('sfxVolume');
    const musicVolume = localStorage.getItem('musicVolume');
    return {
      volume: volume ? parseFloat(volume) : 0.8,
      sfxVolume: sfxVolume ? parseFloat(sfxVolume) : 0.8,
      musicVolume: musicVolume ? parseFloat(musicVolume) : 0.6,
    };
  }

  saveSettings(settings: { volume: number; sfxVolume: number; musicVolume: number }) {
    localStorage.setItem('volume', settings.volume.toString());
    localStorage.setItem('sfxVolume', settings.sfxVolume.toString());
    localStorage.setItem('musicVolume', settings.musicVolume.toString());
  }
}
