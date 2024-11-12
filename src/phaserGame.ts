import Phaser from "phaser";
import { SCREENSIZE } from "./constants";

class SignInScene extends Phaser.Scene {
  // Will render a black box while user is signing in using react ui?
  constructor() {
    super("SignInScene");
  }

  preload() {
  }

  create() {
    this.add.text(400, 300, "Hello World from Phaser", {
      fontSize: "32px"
    }).setOrigin(0.5);
  }
}

class MainScene extends Phaser.Scene {
  // Renders the main game
  constructor() {
    super("MainScene");
  }

  preload() {
    // this.load.image("sky", "assets/sky.png");
  }

  create() {
    // this.add.image(400, 300, "sky");
  }
}

const CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: SCREENSIZE.width,
  height: SCREENSIZE.height,
  scene: [SignInScene, MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: true
    },
  },
};

function createGame() {
  new Phaser.Game(CONFIG);
}
export { createGame };