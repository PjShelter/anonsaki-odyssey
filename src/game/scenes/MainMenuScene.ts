import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    this.add.text(640, 150, 'Anonsaki\'s Odyssey', {
      fontSize: '64px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.createButton(640, 320, '开始游戏', () => this.scene.start('DialogueScene'));
    this.createButton(640, 420, '设置', () => console.log('Settings'));
    this.createButton(640, 520, '退出', () => console.log('Quit'));
  }

  private createButton(x: number, y: number, text: string, callback: () => void) {
    const btn = this.add.rectangle(x, y, 300, 60, 0x4a4a4a)
      .setInteractive()
      .on('pointerdown', callback)
      .on('pointerover', () => btn.setFillStyle(0x6a6a6a))
      .on('pointerout', () => btn.setFillStyle(0x4a4a4a));

    this.add.text(x, y, text, { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
  }
}
