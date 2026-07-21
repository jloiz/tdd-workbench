export class Board {
  width;
  height;

  row1 = "..."
  row2 = "..."
  row3 = "..."

  currentShape = "NO_SHAPE"
  tickCount = 0
  board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  isFalling = true

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawBoard() {
    this.board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  }

  setNewShape(firstShape) {
    this.currentShape = firstShape
  }


  drop(shape) {
    if (this.currentShape === "NO_SHAPE") {
      this.setNewShape(shape)
    }

    if (shape !== this.currentShape) {
      throw new Error("already falling")
    }

    this.currentShape = shape
    this.row1 = `.${this.currentShape}.`
    this.drawBoard()
  }

  tick() {
    this.tickCount++
    console.log("here", this.tickCount)
    // ToDo: Maybe loop on new shape
    if (this.tickCount === 1) {
      this.row1 = "..."
      this.row2 = `.${this.currentShape}.`
      this.drawBoard()
    } else if (this.tickCount === 2){
      this.row2 = "..."
      this.row3 = `.${this.currentShape}.`
      this.currentShape = "NO_SHAPE" // reset current shape
      this.drawBoard()
    } else if (this.tickCount === 3) {
      this.isFalling = false
    }
  }

  hasFalling() {
    return this.isFalling
  }

  toString() {
    return this.board;
  }
}
