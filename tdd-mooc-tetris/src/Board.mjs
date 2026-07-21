export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  board = "...\n...\n...\n"
  currentShape;

  setFirstShape(firstShape){
    this.currentShape = firstShape
  }


  drop(shape) {
    if (this.currentShape === undefined) {
      this.setFirstShape(shape)
    }

    if (shape !== this.currentShape) {
      throw new Error("already falling")
    }
    this.currentShape = shape
    this.board = `.${this.currentShape}.\n...\n...\n`
  }

  tick() {
    this.board = "...\n.X.\n...\n"
  }

  toString() {
    console.log("here", this.width, this.height)
    return this.board;
  }
}
