import Phaser from 'phaser';
import type { SaveData } from '../types';

export class MapSelectScene extends Phaser.Scene {
  private saveData!: SaveData;

  constructor() {
    super({ key: 'MapSelectScene' });
  }

  create() {
    this.saveData = this.registry.get('saveData');
    this.cameras.main.setBackgroundColor(0x1a1a2e);

    this.add.text(640, 50, '关卡选择', { fontSize: '48px', color: '#ffffff' }).setOrigin(0.5);

    this.createStageNode(300, 300, 'stage-01', '第一关', 'map.abandoned-station');
    this.createStageNode(640, 300, 'stage-02', '第二关', 'map.city-street');
    this.createStageNode(980, 300, 'stage-03', '第三关', 'map.boss-fight');

    this.createFunctionButton(200, 600, '商店', 'ShopScene', 'shop');
    this.createFunctionButton(640, 600, '设置', null, null);
  }

  private createStageNode(x: number, y: number, stageId: string, label: string, mapId: string) {
    const unlocked = this.saveData.progression.unlockedStages.includes(stageId);
    const cleared = this.saveData.progression.clearedMaps.includes(stageId);
    const color = cleared ? 0xffd700 : (unlocked ? 0x4a90e2 : 0x666666);

    const node = this.add.circle(x, y, 50, color)
      .setStrokeStyle(4, cleared ? 0xffaa00 : 0xffffff)
      .setInteractive({ useHandCursor: unlocked })
      .on('pointerdown', () => {
        if (unlocked) this.scene.start('BattleScene', { mapId });
      })
      .on('pointerover', () => { if (unlocked) node.setScale(1.1); })
      .on('pointerout', () => node.setScale(1));

    this.add.text(x, y + 80, label, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);

    if (!unlocked) {
      this.add.text(x, y, '🔒', { fontSize: '32px' }).setOrigin(0.5);
    }
  }

  private createFunctionButton(x: number, y: number, label: string, targetScene: string | null, unlockFlag: string | null) {
    const unlocked = !unlockFlag || this.saveData.story.flags[unlockFlag];
    const color = unlocked ? 0x4a4a4a : 0x333333;

    const btn = this.add.rectangle(x, y, 200, 50, color)
      .setInteractive({ useHandCursor: unlocked })
      .on('pointerdown', () => {
        if (unlocked && targetScene) this.scene.start(targetScene);
      })
      .on('pointerover', () => { if (unlocked) btn.setFillStyle(0x6a6a6a); })
      .on('pointerout', () => btn.setFillStyle(color));

    this.add.text(x, y, unlocked ? label : `${label}(未解锁)`, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
  }
}


