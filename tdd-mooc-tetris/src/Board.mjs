export class Board {
  width;
  height;
  rows;
  board;
  currentShape;
  isFalling;

  EMPTY_ROW;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentShape = "NO_SHAPE"
    this.rows = new Array(height).fill(`${".".repeat(width)}\n`)
    this.board = `${this.rows.join('')}`
    this.EMPTY_ROW = this.rows[0]
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
    } else if (!this.isRowEmpty(this.rows[1]) && this.isRowEmpty(this.rows[2])) {
      this.fallFromTo(1, 2)
      this.drawBoard()
    } else if (!this.isRowEmpty(this.rows[2])) {
      this.setIsFalling(false)
      this.clearCurrentShape()
      this.drawBoard()
    } else if (!this.isRowEmpty(this.rows[1]) && !this.isRowEmpty(this.rows[2])) {
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
    this.rows[startRow] = this.EMPTY_ROW
    //TODO: Make not width dependent
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
    return row === this.EMPTY_ROW
  }

  hasFalling() {
    return this.isFalling
  }

  toString() {
    return this.board;
  }
}
