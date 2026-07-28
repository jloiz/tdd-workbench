import { Block } from "../src/Block.mjs"

export class Board {
  width;
  height;
  rows;
  board;
  currentShape;
  isFalling;
  midpoint;

  EMPTY_ROW;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentShape = "NO_SHAPE"
    this.rows = new Array(height).fill(`${".".repeat(width)}`)
    this.board = `${this.rows.join('\n')}\n`
    this.EMPTY_ROW = this.rows[0]
    this.midpointIdx = this.calculateMidpointIdx()

  }

  drop(shape) {

    if ((shape.length === 1) && (typeof shape === "string")) {
      shape = new Block(shape)
      this.rows[0] = `${this.EMPTY_ROW.slice(0, this.midpointIdx)}${shape.toString()}${this.EMPTY_ROW.slice(this.midpointIdx + 1)}`
    } else {


      // clean shape
      let newshape = shape.toString().substring(0, shape.toString().length - 1)

      let shapeRows = newshape.split('\n')
      let shapeObj = Object.assign({}, shapeRows)
      console.log(this.rows)
      console.log(shapeRows)
      console.log(shapeObj)
      let newRows = this.rows.map((row, index) => {
        console.log(index)
        console.log(shapeObj[index])
        if (shapeObj[index] === undefined){
          return this.rows[index]
        }else {
          return shapeObj[index]
        }

        //return row
      })
        console.log("newRows:\n", newRows)
    }

    if (this.currentShape === "NO_SHAPE") {
      this.setNewShape(shape)
    }

    if (shape !== this.currentShape) {
      throw new Error("already falling")
    }


    this.drawBoard()
  }

  tick() {
    if (!this.isRowEmpty(this.rows[0])) {

      this.fallFromTo(0, 1)
      // console.log(this.rows)
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
    let newRow = `${this.EMPTY_ROW.slice(0, this.midpointIdx)}${this.currentShape}${this.EMPTY_ROW.slice(this.midpointIdx + 1)}`
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

  calculateMidpointIdx() {
    let midpoint = Math.ceil(this.EMPTY_ROW.length / 2)
    let midpointIndex = midpoint - 1
    return midpointIndex
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
