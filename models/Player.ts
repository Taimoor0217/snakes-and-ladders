class Player{
  currentPosition: number;
  piece: string;
  id: string | number | undefined;
  constructor(currentPosition: number, piece: string, id?: string | number){
    this.currentPosition = currentPosition;
    this.piece = piece;
    this.id = id;
  }
}
export default Player;