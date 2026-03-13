import type {
  Manifest, Character, Portrait, Weapon, Enemy, Map, Story, ShopItem, Audio
} from '../types';
import {
  ManifestSchema, CharacterSchema, PortraitSchema, WeaponSchema,
  EnemySchema, MapSchema, StorySchema, ShopItemSchema, AudioSchema
} from '../types';

export class ContentRegistry {
  private characters = new Map<string, Character>();
  private portraits = new Map<string, Portrait>();
  private weapons = new Map<string, Weapon>();
  private enemies = new Map<string, Enemy>();
  private maps = new Map<string, Map>();
  private stories = new Map<string, Story>();
  private shopItems = new Map<string, ShopItem>();
  private audio = new Map<string, Audio>();

  register(type: string, id: string, data: any) {
    switch (type) {
      case 'character': this.characters.set(id, data); break;
      case 'portrait': this.portraits.set(id, data); break;
      case 'weapon': this.weapons.set(id, data); break;
      case 'enemy': this.enemies.set(id, data); break;
      case 'map': this.maps.set(id, data); break;
      case 'story': this.stories.set(id, data); break;
      case 'shop': this.shopItems.set(id, data); break;
      case 'audio': this.audio.set(id, data); break;
    }
  }

  getCharacter(id: string) { return this.characters.get(id); }
  getPortrait(id: string) { return this.portraits.get(id); }
  getWeapon(id: string) { return this.weapons.get(id); }
  getEnemy(id: string) { return this.enemies.get(id); }
  getMap(id: string) { return this.maps.get(id); }
  getStory(id: string) { return this.stories.get(id); }
  getShopItem(id: string) { return this.shopItems.get(id); }
  getAudio(id: string) { return this.audio.get(id); }

  getAllCharacters() { return Array.from(this.characters.values()); }
  getAllWeapons() { return Array.from(this.weapons.values()); }
  getAllShopItems() { return Array.from(this.shopItems.values()); }
}
