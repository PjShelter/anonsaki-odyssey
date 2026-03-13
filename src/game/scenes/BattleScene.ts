import Phaser from 'phaser';
import { Player } from '../entities/Player';
import type { SaveData } from '../types';

export class BattleScene extends Phaser.Scene {
  private player!: Player;
  private currentMapId!: string;
  private saveData!: SaveData;

  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data: { mapId: string }) {
    this.currentMapId = data.mapId || 'map.abandoned-station';
    this.saveData = this.registry.get('saveData');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x222222);

    this.player = new Player(this, 640, 360);

    this.add.text(20, 20, 'Battle Scene - WASD/Arrows to move, ESC to win', {
      fontSize: '20px',
      color: '#ffffff',
    });

    this.input.keyboard!.on('keydown-ESC', () => this.onStageCleared());
  }

  update() {
    this.player.update();
  }

  private onStageCleared() {
    const stageId = this.getStageIdFromMap(this.currentMapId);

    if (!this.saveData.progression.clearedMaps.includes(stageId)) {
      this.saveData.progression.clearedMaps.push(stageId);
    }

    if (stageId === 'stage-01' && !this.saveData.progression.unlockedStages.includes('stage-02')) {
      this.saveData.progression.unlockedStages.push('stage-02');
    }
    if (stageId === 'stage-02' && !this.saveData.progression.unlockedStages.includes('stage-03')) {
      this.saveData.progression.unlockedStages.push('stage-03');
    }

    const saveManager = this.registry.get('saveManager');
    saveManager.save(this.saveData);

    this.scene.start('MapSelectScene');
  }

  private getStageIdFromMap(mapId: string): string {
    if (mapId === 'map.abandoned-station') return 'stage-01';
    if (mapId === 'map.city-street') return 'stage-02';
    if (mapId === 'map.boss-fight') return 'stage-03';
    return 'stage-01';
  }
}
