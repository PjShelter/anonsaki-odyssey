import type { Manifest } from '../types';
import { ManifestSchema, CharacterSchema, PortraitSchema, WeaponSchema, EnemySchema, MapSchema, StorySchema, ShopItemSchema, AudioSchema } from '../types';
import { ContentRegistry } from './ContentRegistry';

const SCHEMAS = {
  character: CharacterSchema,
  portrait: PortraitSchema,
  weapon: WeaponSchema,
  enemy: EnemySchema,
  map: MapSchema,
  story: StorySchema,
  shop: ShopItemSchema,
  audio: AudioSchema,
};

export class ContentLoader {
  private registry = new ContentRegistry();
  private basePath = '/content/base';

  async load() {
    const manifest = await this.loadManifest();
    await this.loadCategory('characters', 'character', manifest.entry.characters);
    await this.loadCategory('portraits', 'portrait', manifest.entry.portraits);
    await this.loadCategory('weapons', 'weapon', manifest.entry.weapons);
    await this.loadCategory('enemies', 'enemy', manifest.entry.enemies);
    await this.loadCategory('maps', 'map', manifest.entry.maps);
    await this.loadCategory('story', 'story', manifest.entry.story);
    await this.loadCategory('shop', 'shop', manifest.entry.shop);
    await this.loadCategory('audio', 'audio', manifest.entry.audio);
    return this.registry;
  }

  private async loadManifest(): Promise<Manifest> {
    const res = await fetch(`${this.basePath}/manifest.json`);
    const data = await res.json();
    return ManifestSchema.parse(data);
  }

  private async loadCategory(dir: string, type: string, entry: string) {
    try {
      const indexRes = await fetch(`${this.basePath}/${entry}/index.json`);
      const files: string[] = await indexRes.json();

      for (const file of files) {
        await this.loadFile(dir, type, `${entry}/${file}`);
      }
    } catch (e) {
      console.warn(`Failed to load category ${dir}:`, e);
    }
  }

  private async loadFile(dir: string, type: string, path: string) {
    const res = await fetch(`${this.basePath}/${path}`);
    const data = await res.json();
    const schema = SCHEMAS[type as keyof typeof SCHEMAS];
    const validated = schema.parse(data);
    this.registry.register(type, validated.id, validated);
  }

  getRegistry() {
    return this.registry;
  }
}
