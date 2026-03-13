import Phaser from 'phaser';

export class DialogueScene extends Phaser.Scene {
  private leftPortrait!: Phaser.GameObjects.Rectangle;
  private centerPortrait!: Phaser.GameObjects.Rectangle;
  private rightPortrait!: Phaser.GameObjects.Rectangle;
  private dialogueBox!: Phaser.GameObjects.Rectangle;
  private speakerText!: Phaser.GameObjects.Text;
  private contentText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'DialogueScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x333333);

    this.leftPortrait = this.add.rectangle(200, 300, 150, 300, 0x555555, 0.5);
    this.centerPortrait = this.add.rectangle(640, 300, 150, 300, 0x555555, 0.5);
    this.rightPortrait = this.add.rectangle(1080, 300, 150, 300, 0x555555, 0.5);

    this.dialogueBox = this.add.rectangle(640, 600, 1200, 180, 0x000000, 0.8);
    this.speakerText = this.add.text(80, 530, '', { fontSize: '24px', color: '#ffcc00' });
    this.contentText = this.add.text(80, 570, '', { fontSize: '20px', color: '#ffffff', wordWrap: { width: 1120 } });

    this.input.on('pointerdown', () => this.nextLine());

    this.showDialogue('测试角色', '这是一段测试对话。点击继续。');
  }

  private showDialogue(speaker: string, text: string) {
    this.speakerText.setText(speaker);
    this.contentText.setText(text);
  }

  private highlightPortrait(slot: 'left' | 'center' | 'right') {
    this.leftPortrait.setAlpha(0.3);
    this.centerPortrait.setAlpha(0.3);
    this.rightPortrait.setAlpha(0.3);

    if (slot === 'left') this.leftPortrait.setAlpha(1);
    if (slot === 'center') this.centerPortrait.setAlpha(1);
    if (slot === 'right') this.rightPortrait.setAlpha(1);
  }

  private nextLine() {
    this.scene.start('MainMenuScene');
  }
}
