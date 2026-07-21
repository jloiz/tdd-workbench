export class Board {
  width;
  height;

  row1 = "..."
  row2 = "..."
  row3 = "..."

  currentShape = "NO_SHAPE"
  tickCount = 0
  board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  isFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawBoard() {
    this.board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  }

  clearShape() {
    this.currentShape = "NO_SHAPE"
  }

  setNewShape(newShape) {
    this.currentShape = newShape
    this.isFalling = true
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
    // TODO: REFACTOR THIS DEPSERATELY
    this.tickCount++
    console.log("tickCount:", this.tickCount, "tickCount%3", this.tickCount % 3)
    // ToDo: Maybe loop on new shape
    if (this.tickCount === 1) {
      this.row1 = "..."
      this.row2 = `.${this.currentShape}.`
      this.drawBoard()
    } 
    if (this.tickCount === 4) {
      this.row1 = "..."
      this.row2 = `.${this.currentShape}.`
      this.drawBoard()
    }
    if (this.tickCount === 2) {
      this.row2 = "..."
      this.row3 = `.${this.currentShape}.`
      this.clearShape()
      this.drawBoard()
    } if (this.tickCount === 3) {
      this.isFalling = false
      this.drawBoard()
    }  if (this.tickCount === 5) {
      this.isFalling = false
      this.drawBoard()
    }
  }

  hasFalling() {
    return this.isFalling
  }

  toString() {
    return this.board;
  }
}
