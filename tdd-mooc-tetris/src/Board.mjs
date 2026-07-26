export class Board {
  width;
  height;
  rows;
  board;
  currentShape;
  isFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentShape = "NO_SHAPE"
    this.row1 = "..."
    this.rows = new Array(height).fill(`${".".repeat(width)}\n`)
    this.row2 = "..."
    this.row3 = "..."
    this.board = `${this.rows.join('')}`
  }

  drop(shape) {
    if (this.currentShape === "NO_SHAPE") {
      this.setNewShape(shape)
    }

    if (shape !== this.currentShape) {
      throw new Error("already falling")
    }

    this.rows[0] = `.${this.currentShape}.\n`
    this.drawBoard()
  }

  tick() {
    if (!this.isRowEmpty(this.rows[0])) {

      this.fallFromTo(0, 1)
      console.log(this.rows)
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
    this.rows[startRow] = "...\n"
    this.rows[endRow] = `.${this.currentShape}.\n`
  }

  setIsFalling(isFalling) {
    this.isFalling = isFalling
  }

  clearCurrentShape() {
    this.currentShape = "NO_SHAPE"
  }

  drawBoard() {
    this.board = `${this.rows.join('')}`
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
