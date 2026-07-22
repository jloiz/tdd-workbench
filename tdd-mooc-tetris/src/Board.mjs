export class Board {
  width;
  height;

  row1 = "..."
  row2 = "..."
  row3 = "..."

  currentShape = "NO_SHAPE"
  board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  isFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
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
    if (!this.isRowEmpty(this.row1)) {
      this.fallFromTo("row1", "row2")
      this.drawBoard()
    } else if (!this.isRowEmpty(this.row2) && this.isRowEmpty(this.row3)) {
      this.fallFromTo("row2", "row3")
      this.drawBoard()
    } else if (!this.isRowEmpty(this.row3)) {
      this.setIsFalling(false)
      this.clearCurrentShape()
      this.drawBoard()
    } else if (!this.isRowEmpty(this.row2) && !this.isRowEmpty(this.row3)) {
      this.setIsFalling(false)
      this.clearCurrentShape()
      this.drawBoard()
    }
  }

  setNewShape(newShape) {
    this.currentShape = newShape
    this.setIsFalling(true)
  }

  fallFromTo(startRow, endRow) {
    this[startRow] = "..."
    this[endRow] = `.${this.currentShape}.`
  }

  setIsFalling(isFalling) {
    this.isFalling = isFalling
  }

  clearCurrentShape() {
    this.currentShape = "NO_SHAPE"
  }

  drawBoard() {
    this.board = `${this.row1}\n${this.row2}\n${this.row3}\n`
  }
 
  isRowEmpty(row) {
    return row === "..." 
  }

  hasFalling() {
    return this.isFalling
  }

  toString() {
    return this.board;
  }
}
