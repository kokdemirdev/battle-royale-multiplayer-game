import React, {Component} from "react";

//Constants
const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 512
const TILE_WIDTH = 64
const TILE_HEIGHT = 64

//Utils

//Game Mechanics
class Player {
  x = 0
  y = 0
  dirX = 0
  dirY = 0
  health = 100
  coins = 0
  bullets = 0
  medkits = 0
  update = () => {
  }
  draw = () => {
  }
}

class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.init()
  }

  users = []
  images = {}
  layers = [
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
  ]
  init = async () => {
    console.log('init')
    const tile0 = await this.loadImage('0', './assets/layers/0.png')
    const tile1 = await this.loadImage('0', './assets/layers/1.png')

    this.images = {
      0: tile0,
      1: tile1
    }
    console.log(this.images)
  }
  loadImage = (key, src) => {
    const img = new Image()
    const d = new Promise((_resolve, reject) => {
      img.onload = function () {
        _resolve(img)
      }

      img.onerror = function () {
        reject(`Could not load image: ${src}`)
      }
    })

    img.src = src
    return d
  }
  update = () => {
    console.log('update')
  }
  draw = () => {
    console.log('draw')
    console.log(this.images)
    //clear canvas
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    //draw tiles
    this.ctx.drawImage(this.images[0], 0, 0, TILE_WIDTH, TILE_HEIGHT, 100, 100)
  }
}

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef()
    this.lastLoop = null

    this.state = {
      CURRENT_STEP: 0,
      isGameRunning: false
    }
  }

  start = async () => {
    if (!this.state.isGameRunning) {
      this.game = new Game(this.getCtx())
      await this.game.init()
      this.loop()
    }
    this.setState(state => ({isGameRunning: !state.isGameRunning}))
  }

  loop = () => {
    requestAnimationFrame(() => {
      const now = Date.now()
      if (now - this.lastLoop > (1000 / 30)) {
        this.game.update()
        this.lastLoop = Date.now()
      }
      this.game.draw()
      if (this.state.isGameRunning) {
        this.loop()
      }
    })
  }

  getCtx = () => this.canvasRef.current.getContext('2d')

  render() {
    return (
      <>
        <div>
          <h1 style={{textAlign: "center"}}>Battle Royale Multiplayer Game</h1>
          <button onClick={this.start}>Start</button>
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


