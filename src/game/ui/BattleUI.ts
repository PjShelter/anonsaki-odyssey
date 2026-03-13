import Phaser from 'phaser';

export class BattleUI {
  private scene: Phaser.Scene;
  private hpBar!: Phaser.GameObjects.Rectangle;
  private hpBarBg!: Phaser.GameObjects.Rectangle;
  private hpText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create() {
    this.hpBarBg = this.scene.add.rectangle(20, 20, 200, 20, 0x333333).setOrigin(0, 0);
    this.hpBar = this.scene.add.rectangle(20, 20, 200, 20, 0x00ff00).setOrigin(0, 0);
    this.hpText = this.scene.add.text(230, 20, 'HP: 100/100', { fontSize: '16px', color: '#ffffff' });
    this.waveText = this.scene.add.text(20, 50, 'Wave: 0', { fontSize: '16px', color: '#ffffff' });
  }

  updateHP(current: number, max: number) {
    const percent = current / max;
    this.hpBar.width = 200 * percent;
    this.hpText.setText(`HP: ${current}/${max}`);
  }

  updateWave(wave: number) {
    this.waveText.setText(`Wave: ${wave}`);
  }

  showDamage(x: number, y: number, damage: number) {
    const text = this.scene.add.text(x, y, `-${damage}`, { fontSize: '20px', color: '#ff0000' });
    this.scene.tweens.add({
      targets: text,
      y: y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => text.destroy(),
    });
  }
}
