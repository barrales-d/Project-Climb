import Phaser from "phaser";
import { PLAYER_JUMP_HEIGHT, PLAYER_SPEED, SCREENSIZE } from "./constants";
import { currentViewAtom, isMenuVisable, playerScoreAtom, store } from "./store";

class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private lastPlatformY: number = 0;

  private startPosition: Phaser.Math.Vector2 = Phaser.Math.Vector2.ZERO;
  private scoreText!: Phaser.GameObjects.Text;
  private score: number = 0;

  // World Barrier
  private leftBarrier!: Phaser.GameObjects.Rectangle;
  private rightBarrier!: Phaser.GameObjects.Rectangle;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("background", "assets/background.png");
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0);
    // Create Platforms
    this.platforms = this.physics.add.staticGroup();
    this.createInitialPlatforms();

    // Create Player
    this.player = this.physics.add.sprite(SCREENSIZE.width / 2, 450, 'player').setScale(0.05);
    this.startPosition = new Phaser.Math.Vector2(SCREENSIZE.width / 2, 570);
    this.player.setBounce(0.2);

    this.physics.add.collider(this.player, this.platforms);

    const barrierPosX = 160;
    this.leftBarrier = this.add.rectangle(barrierPosX, 400, 10, 800, 0x000000, 0);
    this.rightBarrier = this.add.rectangle(SCREENSIZE.width - barrierPosX, 400, 10, 800, 0x000000, 0);

    this.physics.add.existing(this.leftBarrier, true);
    this.physics.add.existing(this.rightBarrier, true);

    this.physics.add.collider(this.player, this.leftBarrier);
    this.physics.add.collider(this.player, this.rightBarrier);

    // Adds camera that follows player
    this.cameras.main.startFollow(this.player, true, 0, 1);
    this.cameras.main.setDeadzone(0, 200);

    // Create Score
    this.scoreText = this.add.text(16, 16, `${this.score.toFixed(2)}m`, { fontSize: '32px', color: '#000' });
    this.scoreText.setScrollFactor(0);

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
    // No Keyboard found?
    if (!this.input.keyboard)
      return;


    const cursors = this.input.keyboard.createCursorKeys();
    // Ground Movement
    if (cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_SPEED);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_SPEED);
    } else {
      this.player.setVelocityX(0);
    }

    // Jump Movement
    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_JUMP_HEIGHT);
    }

    // Generate new plateforms as player moves up
    if (this.player.y < this.lastPlatformY + SCREENSIZE.height / 2) {
      this.createPlatform();
    }

    // Remove platforms that have gone off screen
    this.platforms.getChildren().forEach((platform) => {
      const platformSprite = platform as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

      if (platformSprite.y > this.cameras.main.scrollY + SCREENSIZE.height) {
        platformSprite.destroy();
      }

    });

    // Update barrier positions to follow camera
    const cameraY = this.cameras.main.scrollY;
    this.leftBarrier.setY(cameraY + 400);
    this.rightBarrier.setY(cameraY + 400);

    (this.leftBarrier.body as Phaser.Physics.Arcade.Body).updateFromGameObject();
    (this.rightBarrier.body as Phaser.Physics.Arcade.Body).updateFromGameObject();

    // Calculate Score
    const currentPosition = this.player.getCenter();
    const distance = Phaser.Math.Distance.BetweenPoints(this.startPosition, currentPosition);
    this.score = distance / 100;
    if (parseFloat(this.scoreText.text) < this.score)
      this.scoreText.text = `${this.score.toFixed(2)}m`;

    const firstPlatformY = this.getLowestPlatform();
    if (this.player.y > firstPlatformY + SCREENSIZE.height / 2) {
      this.gameOver();
    }

  }

  pauseGame() {
    this.scene.pause();
  }

  resumeGame() {
    this.scene.resume();
  }
  gameOver() {
    // TODO: create Probably pass score through jotai store as well
    store.set(playerScoreAtom, this.score);

    store.set(currentViewAtom, 'gameover');
    store.set(isMenuVisable, true);

    this.scene.restart();
    this.score = 0.00;

  }

  createPlatform() {
    const minDistance = 100; // Minimum vertical distance between platforms
    const maxDistance = 200; // Maximum vertical distance between platforms

    // Calculate new platform position
    const platformY = this.lastPlatformY - Phaser.Math.Between(minDistance, maxDistance);
    const platformX = Phaser.Math.Between(200, SCREENSIZE.width - 200);

    // Create the platform
    this.platforms.create(platformX, platformY, 'platform')
      .setScale(0.2, 0.05)
      .refreshBody();
    this.lastPlatformY = platformY;
  }

  createInitialPlatforms() {
    // Create starting platform
    const startPlatform = this.platforms.create(400, 600, 'platform');
    startPlatform.setScale(0.25, 0.05).refreshBody();
    this.lastPlatformY = 600;

    // Create some initial platforms
    for (let i = 0; i < 5; i++) {
      this.createPlatform();
    }
  }

  getLowestPlatform() {
    let lowestPlatformY = this.lastPlatformY;
    this.platforms.getChildren().forEach((platform) => {
      const platformSprite = platform as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      // checking > because the Y axis is flipped
      if (platformSprite.y > lowestPlatformY) {
        lowestPlatformY = platformSprite.y;
      }

    });

    return lowestPlatformY;
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