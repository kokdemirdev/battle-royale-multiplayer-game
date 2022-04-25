import type {NextPage} from 'next'
import React, {Component} from "react";

const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 320

type Player = {
  //position values
  x: number,
  y: number,
  dirX: number,
  dirY: number,

  //in-game mechanics
  health: number,
  coins: number,
  bullets: number,
  medkits: number,

  //update and draw to screen
  update: Function,
  draw: Function
}

type Game = {
  players: Player[],
  load: Function,
  init: Function,
  update: Function,
  draw: Function
}

const Player: Player = {
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

const Game: Game = {
  // @ts-ignore
  users: [],
  load: async () => {
  },
  init: async () => {
  },
  update: async () => {
  },
  draw: async () => {
  },
}

type GamePageProps = {}

type GamePageState = {
  CURRENT_STEP: number
}

class GamePage extends Component<GamePageProps, GamePageState> {
  constructor(props: GamePageProps) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>()

    this.state = {
      CURRENT_STEP: 0
    }
  }

  private readonly canvasRef

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
