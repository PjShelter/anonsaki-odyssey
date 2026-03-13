import Phaser from 'phaser';
import { ContentLoader } from '../content';
import { SaveManager } from '../save';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  async create() {
    const loader = new ContentLoader();
    const saveManager = new SaveManager();

    try {
      const registry = await loader.load();
      const saveData = await saveManager.load();

      this.registry.set('contentRegistry', registry);
      this.registry.set('saveManager', saveManager);
      this.registry.set('saveData', saveData);

      this.scene.start('MapSelectScene');
    } catch (e) {
      console.error('Boot failed:', e);
    }
  }
}
