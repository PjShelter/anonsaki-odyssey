import Phaser from 'phaser';
import type { Map as MapConfig } from '../types';
import { ContentRegistry } from '../content';
import { Enemy } from '../entities/Enemy';

export class WaveController {
  private scene: Phaser.Scene;
  private map: MapConfig;
  private registry: ContentRegistry;
  private startTime: number;
  private enemies: Phaser.Physics.Arcade.Group;
  private currentWave = 0;

  constructor(scene: Phaser.Scene, map: MapConfig, registry: ContentRegistry) {
    this.scene = scene;
    this.map = map;
    this.registry = registry;
    this.startTime = scene.time.now;
    this.enemies = scene.physics.add.group();
  }

  update() {
    const elapsed = this.scene.time.now - this.startTime;

    for (let i = this.currentWave; i < this.map.waves.length; i++) {
      const wave = this.map.waves[i];
      if (elapsed >= wave.atMs) {
        this.spawnWave(wave);
        this.currentWave++;
      }
    }
  }

  private spawnWave(wave: any) {
    wave.spawns.forEach((spawn: any) => {
      const enemyConfig = this.registry.getEnemy(spawn.enemyId);
      if (!enemyConfig) return;

      for (let i = 0; i < spawn.count; i++) {
        const enemy = new Enemy(this.scene, 1200, 200 + i * 50, enemyConfig);
        this.enemies.add(enemy);
      }
    });
  }

  getEnemies() {
    return this.enemies;
  }

  isComplete() {
    return this.currentWave >= this.map.waves.length && this.enemies.countActive() === 0;
  }
}
