import Snake from "./Snake";
import Ladder from "./Ladder";
import Player from "./Player";
import Dice from "./Dice";
class GameBoard {
  size: Number;
  snakes: Array<Snake>;
  players: Array<Player>;
  ladders: Array<Ladder>;
  dices: Array<Dice>;
  currentPlayerIndex: number | undefined = undefined;
  totalPlayers: number;
  snakeMap: { [key: number]: Snake } = {};
  ladderMap: { [key: number]: Ladder } = {};
  winner: Player | undefined = undefined;
  constructor(
    size: Number,
    snakes: Array<Snake>,
    players: Array<Player>,
    ladders: Array<Ladder>,
    dices: Array<Dice>
  ) {
    this.size = size;
    this.snakes = snakes;
    this.players = players;
    this.ladders = ladders;
    this.totalPlayers = players.length;
    this.dices = dices;
    this.snakes.forEach((snake: Snake) => {
      this.snakeMap[snake.head] = snake;
    });
    this.ladders.forEach((ladder: Ladder) => {
      this.ladderMap[ladder.tail] = ladder;
    });
  }
  private rollDices(): number {
    let rollSum = 0;
    for (let i = 0; i < this.dices.length; i++) {
      rollSum += this.dices[i].roll();
    }
    return rollSum;
  }
  private updatePositionAfterSnakeBite(
    intendedPosition: number,
    player: Player
  ) {
    const snake = this.snakeMap[intendedPosition];
    player.currentPosition = snake.tail;
    console.log(
      `${player.piece} biten by snake at ${snake.head} and moves to ${player.currentPosition}`
    );
  }
  private updatePositionAfterClimbingLadder(
    intendedPosition: number,
    player: Player
  ) {
    const ladder = this.ladderMap[intendedPosition];
    player.currentPosition = ladder.head;
    console.log(
      `${player.piece} climbs ladder at ${ladder.tail} and moves to ${player.currentPosition}`
    );
  }
  private updatePlayerPostion(player: Player, rollSum: number) {
    console.log(`${player.piece} rolled ${rollSum}`);
    const intendedPosition = player.currentPosition + rollSum;
    if (intendedPosition in this.snakeMap) {
      this.updatePositionAfterSnakeBite(intendedPosition, player);
    } else if (intendedPosition in this.ladderMap) {
      this.updatePositionAfterClimbingLadder(intendedPosition, player);
    } else {
      player.currentPosition = intendedPosition;
      console.log(`${player.piece} moves to ${player.currentPosition}`);
    }
    if (player.currentPosition >= this.size) {
      // Player has won the game
      this.winner = player;
    }
  }
  public rollDicesForPlayer(player: Player): void {
    if (this.winner) {
      return;
    }
    const playerRollSum = this.rollDices();
    this.updatePlayerPostion(player, playerRollSum);
  }
  public getNextPlayer() {
    if (this.currentPlayerIndex === undefined) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
      this.currentPlayerIndex %= this.totalPlayers;
    }
    return this.players[this.currentPlayerIndex];
  }
  public getWinner(): Player | undefined {
    return this.winner;
  }
}
export default GameBoard;
