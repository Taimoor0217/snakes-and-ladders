import GameBoard from "./models/GameBoard";
import Snake from "./models/Snake";
import Ladder from "./models/Ladder";
import Dice from "./models/Dice";
import Player from "./models/Player";
// GAME 1
const snakes: Array<Snake> = [];
const ladders: Array<Ladder> = [];
for(let i = 0 ; i < 6; i ++){
    let head1 = Math.floor(Math.random() * 80);
    let tail1 = Math.floor(Math.random() * 80)

    let head2 = Math.floor(Math.random() * 80);
    let tail2 = Math.floor(Math.random() * 80)
    snakes.push(new Snake(head1 , tail1));
    ladders.push(new Ladder(head2 , tail2));
}
const dices = [new Dice(6)];
const players = [new Player(0, "A"), new Player(0, "B")];
const gameBoard = new GameBoard(100, snakes, players, ladders, dices);
while(!gameBoard.getWinner()){
  const player: Player = gameBoard.getNextPlayer()
  gameBoard.rollDicesForPlayer(player);
}
const winner: Player | undefined = gameBoard.getWinner();
console.log(`Winner is ${winner?.piece}`);