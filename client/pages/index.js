import React, {Component} from "react";

//Constants
const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 512
const TILE_WIDTH = 64
const TILE_HEIGHT = 64

//Utils

//Game Mechanics
const Player = {
  x: 0,
  y: 0,
  dirX: 0,
  dirY: 0,
  health: 100,
  coins: 0,
  bullets: 0,
  medkits: 0,
  update: () => {
  },
  draw: () => {
  }
}

const Game = {
  users: [],
  images: {},
  layers: [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
  ],
  load: async () => {

    let [tile1, tile2] = await Promise.all([
      this.loadImage('1', '../public/assets/layers/0.png'),
      this.loadImage('2', '../public/assets/layers/1.png')
    ])

    // @ts-ignore
    this.images = {
      1: tile1,
      2: tile2
    }
  },
  loadImage: (key, src) => {
    const img = new Image()
    const d = new Promise((_resolve, reject) => {
      img.onload = function () {
        // @ts-ignore
        this.images[key] = img
      }.bind(this)

      img.onerror = function () {
        reject(`Could not load image: ${src}`)
      }
    })

    img.src = src
    return d
  },
  init: () => {
  },
  update: () => {
  },
  draw: () => {
  },
}

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef()

    this.state = {
      CURRENT_STEP: 0
    }
  }

  canvasRef

  // @ts-ignore
  getCtx = () => this.canvasRef.current.getContext('2d')

  render() {
    return (
      <>
        <div>
          <h1 style={{textAlign: "center"}}>Battle Royale Multiplayer Game</h1>
          <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black"
          }}>
            <canvas
              ref={this.canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            ></canvas>
          </div>
        </div>
      </>
    );
  }
}

export default GamePage
