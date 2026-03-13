import Phaser from 'phaser';
import type { Enemy as EnemyConfig } from '../types';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private config: EnemyConfig;
  private hp: number;

  constructor(scene: Phaser.Scene, x: number, y: number, config: EnemyConfig) {
    super(scene, x, y, '');
    this.config = config;
    this.hp = config.stats.maxHp;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(32, 32);
    this.createTexture();
    this.setVelocityX(-config.stats.moveSpeed);
  }

  takeDamage(amount: number) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.destroy();
      return true;
    }
    return false;
  }

  getRewards() {
    return this.config.rewards;
  }

  private createTexture() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture('enemy', 32, 32);
    graphics.destroy();
    this.setTexture('enemy');
  }
}
