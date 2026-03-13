import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class BattleScene extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super({ key: 'BattleScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x222222);

    this.player = new Player(this, 640, 360);

    this.add.text(20, 20, 'Battle Scene - WASD/Arrows to move', {
      fontSize: '20px',
      color: '#ffffff',
    });
  }

  update() {
    this.player.update();
  }
}
