import { Block } from "../src/Block.mjs"

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
    this.rows = new Array(height).fill(`${".".repeat(width)}`)
    this.board = `${this.rows.join('\n')}\n`
    this.EMPTY_ROW = this.rows[0]
  }

  drop(shape) {

    if ((shape.length === 1) && (typeof shape === "string")) {
      console.log(JSON.stringify("IS a block"))
      let newshape = new Block(shape)
    } else{
      
    }
    if (this.currentShape === "NO_SHAPE") {
      this.setNewShape(shape)
    }



    console.log(JSON.stringify(shape.toString()))

    if (shape !== this.currentShape) {
      throw new Error("already falling")
    }
    let midpoint = Math.ceil(this.EMPTY_ROW.length/2)
    let midpointIndex = midpoint - 1

    this.rows[0] =  `${this.EMPTY_ROW.slice(0, midpointIndex)}${this.currentShape}${this.EMPTY_ROW.slice(midpointIndex + 1)}`
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
    //Find midpoint of row
    let midpoint = Math.ceil(this.EMPTY_ROW.length/2)
    let midpointIndex = midpoint - 1
    let newRow = `${this.EMPTY_ROW.slice(0, midpointIndex)}${this.currentShape}${this.EMPTY_ROW.slice(midpointIndex + 1)}`
    this.rows[endRow] = newRow
  }

  setIsFalling(isFalling) {
    this.isFalling = isFalling
  }

  clearCurrentShape() {
    this.currentShape = "NO_SHAPE"
  }

  drawBoard() {
    this.board = `${this.rows.join('\n')}\n`
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
