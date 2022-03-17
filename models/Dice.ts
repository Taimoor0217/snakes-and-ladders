class Dice {
  noOfSides: number;
  constructor(noOfSides: number) {
    this.noOfSides = noOfSides;
  }
  roll(): number {
    return Math.floor(Math.random() * this.noOfSides);
  }
}
export default Dice;
