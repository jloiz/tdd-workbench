import { Block } from "../src/Block.mjs"
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  rows;
  board;
  currentShape;
  isFalling;
  midpoint;
  hasHitBottom;
  hasHitShape;

  EMPTY_ROW;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentShape = "NO_SHAPE"
    this.rows = new Array(height).fill(`${".".repeat(width)}`)
    this.board = `${this.rows.join('\n')}\n`
    this.EMPTY_ROW = this.rows[0]
    this.midpointIdx = this.calculateMidpointIdx()
    this.hasHitBottom = false
    this.hasHitShape = false

  }


  drop(shape) {

    // check if block dropped
    if ((shape.length === 1) && (typeof shape === "string")) {
      shape = new Block(shape)
      this.rows[0] = `${this.EMPTY_ROW.slice(0, this.midpointIdx)}${shape.toString()}${this.EMPTY_ROW.slice(this.midpointIdx + 1)}`
    } else {

      // clean shape
      let newshape = shape.toString().substring(0, shape.toString().length - 1)

      let shapeRows = newshape.split('\n')
      let shapeObj = Object.assign({}, shapeRows)
      let newRows = this.rows.map((row, index) => {
        if (shapeObj[index] === undefined) {
          return this.rows[index]
        } else {
          // insert shape row to board row
          let newRow = `${this.rows[index].substring(0, this.midpointIdx - 1)}${shapeObj[index]}${this.rows[index].substring(this.midpointIdx, this.width)}`
          // truncate row at board width
          newRow = newRow.substring(0, this.EMPTY_ROW.length)
          return newRow
        }
      })
      this.rows = newRows
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

    if (this.hasHitShape) {
      this.setIsFalling(false)
      this.setHasHitShape(false)
    } else

      if (this.hasHitBottom) {
        this.setIsFalling(false)
        this.clearCurrentShape()
        this.setHasHitBottom(false)

      } else {

        this.fall()
      }


    this.drawBoard()

  }


  setNewShape(newShape) {
    this.currentShape = newShape
    this.setIsFalling(true)
  }

  fall() {
    let rows = structuredClone(this.rows)
    rows = rows.reverse()

    // NEW METHOD
    let firstShapeRowFromBottom = this.getFirstShapeRowFromBottom()


    console.log(firstShapeRowFromBottom)

    // NEW METHOD
    // Shift all rows down, except the ones that are non empty from the bottom
    let oldRows = structuredClone(this.rows)
    let newRows = this.rows
    for (let i = newRows.length - 2 - firstShapeRowFromBottom; i > 0; i--) {
      newRows[i] = newRows[i - 1]
    }
    newRows[0] = this.EMPTY_ROW

    console.log("old rows: ", oldRows)
    console.log("new rows:", newRows)

    // NEW METHOD in conditional or whole thing (checkBoardBottom)
    if (oldRows[this.height - 1] !== newRows[this.height - 1]) {
      console.log("Has hit bottom")
      this.setHasHitBottom(true)

    }

    // NEW METHOD (check hasHitShape)
    let reversedNewRows = structuredClone(newRows)
    reversedNewRows.reverse()
    if (!this.hasHitBottom && (reversedNewRows[firstShapeRowFromBottom + 1] !== this.EMPTY_ROW)) {
      this.setHasHitShape(true)
    }

    this.rows = newRows

  }

  getFirstShapeRowFromBottom() {
    // Offset this value by -1
    let firstShapeRow;
    let rows = structuredClone(this.rows)
    rows = rows.reverse()
    if (rows[0] === this.EMPTY_ROW) {
      firstShapeRow = - 1
    } else {
      for (let rowNum = 0; rowNum < rows.length; rowNum++) {
        if (rows[rowNum] !== this.EMPTY_ROW) {
          firstShapeRow = rowNum
          break;
        }
      }
    }
    return firstShapeRow
  }

  setIsFalling(isFalling) {
    this.isFalling = isFalling
  }

  setHasHitShape(hasHitShape) {
    this.hasHitShape = hasHitShape
  }

  setHasHitBottom(hasHitBottom) {
    this.hasHitBottom = hasHitBottom
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
