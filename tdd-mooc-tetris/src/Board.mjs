export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  board = "...\n...\n...\n"
  currentShape;
  tickCount = 0

  setFirstShape(firstShape) {
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
    this.tickCount++
    console.log("here", this.tickCount)
    if (this.tickCount === 1) {
      this.board = `...\n.${this.currentShape}.\n...\n`
    } else {
      this.board = `...\n...\n.${this.currentShape}.\n`
    }
  }

  hasFalling() {
    if (this.tickCount <= 2) {
      return true
    } else {
      return false
    }
  }

  toString() {
    console.log("here", this.width, this.height)
    return this.board;
  }
}
