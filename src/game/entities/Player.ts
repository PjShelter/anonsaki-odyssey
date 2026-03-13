import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { w: Phaser.Input.Keyboard.Key; a: Phaser.Input.Keyboard.Key; s: Phaser.Input.Keyboard.Key; d: Phaser.Input.Keyboard.Key };
  private speed = 180;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(32, 48);
    this.setFillStyle(0x00ff00);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.wasd = {
      w: scene.input.keyboard!.addKey('W'),
      a: scene.input.keyboard!.addKey('A'),
      s: scene.input.keyboard!.addKey('S'),
      d: scene.input.keyboard!.addKey('D'),
    };
  }

  update() {
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.a.isDown) vx = -this.speed;
    if (this.cursors.right.isDown || this.wasd.d.isDown) vx = this.speed;
    if (this.cursors.up.isDown || this.wasd.w.isDown) vy = -this.speed;
    if (this.cursors.down.isDown || this.wasd.s.isDown) vy = this.speed;

    this.setVelocity(vx, vy);
  }

  setFillStyle(color: number) {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 32, 48);
    graphics.generateTexture('player', 32, 48);
    graphics.destroy();
    this.setTexture('player');
    return this;
  }
}
