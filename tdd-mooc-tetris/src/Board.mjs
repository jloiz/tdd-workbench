export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  board = "...\n...\n...\n"

  drop(shape) {
    this.board = ".X.\n...\n...\n"
  }

  toString() {
   console.log("here", this.width, this.height)
    return this.board;
  }
}
