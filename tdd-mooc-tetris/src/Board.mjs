import { Block } from "../src/Block.mjs"
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  rows;
  board;
  currentShape;
  isFalling;
  hasHitBottom;
  hasHitShape;
  currentShapeHeight;
  shapeAtBottom;
  lastShapeRowFromBottom
  leftBoundaryHit
  rightBoundaryHit
  populatedCells
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
    this.currentShapeHeight = 0
    this.shapeAtBottom = false
    this.lastShapeRowFromBottom = this.height - 1

  }


  drop(shape) {
    // check if block dropped
    if ((shape.length === 1) && (typeof shape === "string")) {
      shape = new Block(shape)
      this.rows[0] = `${this.EMPTY_ROW.slice(0, this.midpointIdx)}${shape.toString()}${this.EMPTY_ROW.slice(this.midpointIdx + 1)}`
      this.currentShapeHeight = 1
    } else {
      // clean shape
      let newshape = shape.toString().substring(0, shape.toString().length - 1)

      this.currentShapeHeight = shape.height()

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
      this.clearCurrentShape()
      this.setHasHitShape(false)
      console.log("call 2")
    } else if (this.hasHitBottom) {
      this.setIsFalling(false)
      this.setPopulatedCells()
      this.clearCurrentShape()
      this.setHasHitBottom(false)
      console.log("call one")
    } else if (!(this.currentShape === "NO_SHAPE")) {
      this.fall()
    } else (
      console.log("NO OP")
    )

    this.drawBoard()

  }



  fall() {
    let firstShapeRowFromBottom = this.getFirstShapeRowFromBottom()

    let oldRows = structuredClone(this.rows)
    let newRows = this.rows
    // Add an offset for the top of a shape below the currently falling shape
    let topOfShapeOffset = this.height - this.lastShapeRowFromBottom - 1
    for (let i = newRows.length - 2 - firstShapeRowFromBottom - topOfShapeOffset; i > 0; i--) {
      newRows[i] = newRows[i - 1]
    }
    newRows[0] = this.EMPTY_ROW
    if ((oldRows === newRows) && (this.isFalling)){
      console.log("SHOULD TICK")
    }

    console.log("old rows: ", oldRows)
    console.log("new rows:", newRows)

    this.handleBottomBoundary(oldRows, newRows)
    this.handleTouchingOtherShapes(oldRows, newRows)
    this.rows = newRows
  }

  getFirstShapeRowFromBottom() {
    // Offset this value by -1
    let firstShapeRow;
    let rows = structuredClone(this.rows)
    rows = rows.reverse()
    if (rows[0] === this.EMPTY_ROW) {
      firstShapeRow = -1
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

  setNewShape(newShape) {
    this.currentShape = newShape
    this.setIsFalling(true)
  }

  handleBottomBoundary(oldRows, newRows) {
    if (oldRows[this.height - 1] !== newRows[this.height - 1]) {
      this.setHasHitBottom(true)

      this.lastShapeRowFromBottom = this.caclulateLastShapeRowFromBottom(newRows)
    }
  }

  handleTouchingOtherShapes(oldBoard, newRows) {
    if ((newRows[this.height - 1] !== this.EMPTY_ROW) && (newRows[this.lastShapeRowFromBottom - 1] !== this.EMPTY_ROW)) {
      this.setHasHitShape(true)
    }
    let flatBoard = newRows.join('')
    console.log(flatBoard)
  }

  caclulateLastShapeRowFromBottom(newRows) {
    let lastShapeRowFromBottom;
    for (let i = 0; i < newRows.length; i++) {
      if (newRows[i] !== this.EMPTY_ROW) {
        lastShapeRowFromBottom = i
        break;
      }
    }

    return lastShapeRowFromBottom
  }

  moveLeft() {

    if (!this.leftBoundaryHit) {
      for (let i = 0; i < this.height; i++) {
        if (this.isFalling && this.rows[i] !== this.EMPTY_ROW) {
          this.rows[i] = `${this.rows[i].substring(1)}.`
        }
      }
      // this.rightBoundaryHit? this.rightBoundaryHit = !this.rightBoundaryHit : this.rightBoundaryHit
    } else {
      throw new Error("Cannot move shape past board boundary")
    }

    this.checkBoundaries("left")
    this.drawBoard()

    if (!this.isFalling) {
      throw new Error("Cannot move shape that is not falling")
    }
  }

  moveRight() {

    console.log("debug")
    console.log(this.currentShapeHeight)
    console.log(this.height - this.currentShapeHeight)
    let settledShapeRow = this.height - this.currentShapeHeight

    if (!this.rightBoundaryHit) {
      for (let i = 0; i < this.height; i++) {
        if (this.isFalling && (i < settledShapeRow) && this.rows[i] !== this.EMPTY_ROW) {
          this.rows[i] = `.${this.rows[i].substring(0, this.width - 1)}`
        }
      }
      // this.leftBoundaryHit ? this.leftBoundaryHit = !this.leftBoundaryHit : this.leftBoundaryHit
    } else {
      throw new Error("Cannot move shape past board boundary")
    }

    this.checkBoundaries("right")
    this.drawBoard()

    if (!this.isFalling) {
      throw new Error("Cannot move shape that is not falling")
    }
  }

  checkBoundaries(boundary) {
    let edgeValues = []
    let offset = 0;
    let flatBoard = this.rows.join('')
    if (boundary === "right") {
      offset = 9
    }
    let x = 0 + offset;
    while (x < flatBoard.length) {
      edgeValues.push(flatBoard[x])
      x += this.width
    }

    const boundaryColEmpty = edgeValues.every(point => point === '.')
    if (!boundaryColEmpty) {
      boundary === "right" ? this.rightBoundaryHit = true : this.leftBoundaryHit = true
    }
  }

  setPopulatedCells() {
    let flatBoard = this.rows.join('').split('')
    let populatedCells = []
    flatBoard.forEach((char, index) => {
      if (char !== '.') {
        populatedCells.push(index)
      }
    })
    console.log(populatedCells)
    this.populatedCells = populatedCells
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
