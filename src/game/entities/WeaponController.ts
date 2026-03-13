import Phaser from 'phaser';
import type { Weapon } from '../types';
import { Projectile } from './Projectile';

export class WeaponController {
  private scene: Phaser.Scene;
  private weapon: Weapon;
  private lastFireTime = 0;
  private projectiles: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, weapon: Weapon) {
    this.scene = scene;
    this.weapon = weapon;
    this.projectiles = scene.physics.add.group();
  }

  canFire(): boolean {
    return this.scene.time.now - this.lastFireTime >= this.weapon.stats.fireIntervalMs;
  }

  fire(x: number, y: number, dirX: number, dirY: number) {
    if (!this.canFire()) return null;

    const projectile = new Projectile(
      this.scene,
      x,
      y,
      this.weapon.stats.damage,
      this.weapon.stats.projectileSpeed
    );
    projectile.fire(dirX, dirY);
    this.projectiles.add(projectile);
    this.lastFireTime = this.scene.time.now;
    return projectile;
  }

  getProjectiles() {
    return this.projectiles;
  }
}
