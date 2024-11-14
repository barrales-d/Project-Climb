import Phaser from "phaser";
import { SCREENSIZE } from "./constants";
import { isMenuVisable, store } from "./store";

class MainScene extends Phaser.Scene {
  private pauseOverlay!: Phaser.GameObjects.Rectangle;
  private titleText!: Phaser.GameObjects.Text;

  private player!: Phaser.GameObjects.Rectangle;
  // Renders the main game
  constructor() {
    super("MainScene");
  }

  preload() {
    // this.load.image("sky", "assets/sky.png");
  }

  create() {
    // Create game objects once
    this.player = this.add.rectangle(400, 300, 100, 100, 0xff0000).setOrigin(0.5);

    // Create pause and title objects but make them invisible
    this.pauseOverlay = this.add.rectangle(0, 0, SCREENSIZE.width, SCREENSIZE.height, 0x000000, 0.8)
      .setOrigin(0, 0)
      .setVisible(false);
    this.titleText = this.add.text(400, 75, "Project Climb", { fontSize: "32px" })
      .setOrigin(0.5)
      .setVisible(false);

    // Subscribe to menu state changes
    store.sub(isMenuVisable, () => {
      const isPaused: boolean = store.get(isMenuVisable);
      if (isPaused) {
        this.pauseGame();
      } else {
        this.resumeGame();
      }
    })
  }

  update() {
    if (this.scene.isPaused())
      return;

  }

  pauseGame() {
    this.pauseOverlay.setVisible(true);
    this.titleText.setVisible(true);
    this.scene.pause();
  }

  resumeGame() {
    this.pauseOverlay.setVisible(false);
    this.titleText.setVisible(false);
    this.scene.resume();
  }

}

const CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: SCREENSIZE.width,
  height: SCREENSIZE.height,
  scene: [MainScene],
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