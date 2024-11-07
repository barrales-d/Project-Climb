import { useEffect, useRef } from "react";

import "./App.css";

import Phaser from "phaser";

class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    // TODO: load assets like images and sounds
  }

  create() {
    this.add.text(400, 300, "Project Climb", {
      fontSize: "64px",
    }).setOrigin(0.5, 0.5);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#000000",
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: true,
    },
  }
};

function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current && !gameRef.current.children.length) {
      new Phaser.Game(config);
    }

    return () => {
      // Clean up
    };
  }, []);

  return (
    <main>
      <div ref={gameRef} id="game-container">
      </div>
      {/* <div className="react-ui">
        hello world
      </div> */}
    </main>
  );
}

export default App;
