import Phaser from 'phaser';

export class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShopScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1a1a1a);

    this.add.text(640, 50, '商店', {
      fontSize: '48px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(640, 120, '金币: 0', {
      fontSize: '24px',
      color: '#ffcc00',
    }).setOrigin(0.5);

    this.add.text(640, 360, '暂无商品', {
      fontSize: '20px',
      color: '#888888',
    }).setOrigin(0.5);

    const backBtn = this.add.rectangle(640, 650, 200, 50, 0x4a4a4a)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('MainMenuScene'))
      .on('pointerover', () => backBtn.setFillStyle(0x6a6a6a))
      .on('pointerout', () => backBtn.setFillStyle(0x4a4a4a));

    this.add.text(640, 650, '返回', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
  }
}
