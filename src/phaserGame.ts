import Phaser from "phaser";
import { SCREENSIZE } from "./constants";
import { playerName, store } from "./store";

class SignInScene extends Phaser.Scene {
  private player: string = "";
  // Will render a black box while user is signing in using react ui?
  constructor() {
    super("SignInScene");
  }

  preload() {
    this.player = store.get(playerName);
  }

  create() {
    this.add.text(400, 75, "Project Climb", {
      fontSize: "32px"
    }).setOrigin(0.5);
    // store.sub(playerName, () => {
    //   this.player = store.get(playerName);
    //   if (this.player !== "") {
    //     this.add.text(400, 200, `Welcome, ${this.player}`, { fontSize: '32px' }).setOrigin(0.5);
    //   }
    // })
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