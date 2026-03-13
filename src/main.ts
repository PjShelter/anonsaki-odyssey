import Phaser from 'phaser';
import { BootScene } from './game/scenes/BootScene';
import { MapSelectScene } from './game/scenes/MapSelectScene';
import { MainMenuScene } from './game/scenes/MainMenuScene';
import { DialogueScene } from './game/scenes/DialogueScene';
import { BattleScene } from './game/scenes/BattleScene';
import { ShopScene } from './game/scenes/ShopScene';
import { GameOverScene } from './game/scenes/GameOverScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  scene: [BootScene, MapSelectScene, MainMenuScene, DialogueScene, BattleScene, ShopScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
