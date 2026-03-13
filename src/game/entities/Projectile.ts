import Phaser from 'phaser';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  private damage: number;
  private speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, damage: number, speed: number) {
    super(scene, x, y, '');
    this.damage = damage;
    this.speed = speed;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(8, 8);
    this.createTexture();
  }

  fire(vx: number, vy: number) {
    this.setVelocity(vx * this.speed, vy * this.speed);
  }

  getDamage() {
    return this.damage;
  }

  private createTexture() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xffff00);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('projectile', 8, 8);
    graphics.destroy();
    this.setTexture('projectile');
  }
}
