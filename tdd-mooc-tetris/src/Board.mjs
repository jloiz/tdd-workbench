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
  occupiedCells
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
    this.occupiedCells = []
    this.rightBoundaryHit = false
    this.leftBoundaryHit = false

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
    } else if (this.hasHitBottom) {
      this.setIsFalling(false)
      this.occupiedCells = this.calculatePopulatedCells()
      this.clearCurrentShape()
      this.setHasHitBottom(false)
    } else if (!(this.currentShape === "NO_SHAPE")) {
      this.fall()
    }

    this.drawBoard()
  }


  fall() {
    let oldRows = structuredClone(this.rows)
    let flatBoardOld = oldRows.join('')
    let flatBoardOldArr = flatBoardOld.split('')
    let flatBoardNew;
    let flatBoardNewArr = Array(flatBoardOldArr.length + this.width).fill('.');

    for (let i = 0; i < flatBoardOldArr.length; i++) {
      if (this.occupiedCells.includes(i)) {
        flatBoardNewArr[i] = flatBoardOldArr[i]
      } else {
        flatBoardNewArr[i + this.width] = flatBoardOldArr[i]
      }
    }

    flatBoardNew = flatBoardNewArr.join('').slice(0, flatBoardOld.length)
    let newRows = []

    for (let i = 0; i < this.height; i++) {
      let start = this.width * i
      let chunk = flatBoardNew.substring(start, start + this.width)
      newRows.push(chunk)
    }

    // console.log("old rows: ", oldRows)
    // console.log("new rows:", newRows)

    this.rows = newRows

    this.handleBottomBoundary(oldRows, newRows)
    this.handleTouchingOtherShapes(oldRows, newRows)
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
    let flatBoard = newRows.join('')
    let populatedCells = this.calculatePopulatedCells()
    let populatedCellsWithoutNonMovingCells = populatedCells.filter(item => !this.occupiedCells.includes(item))
    for (let i = 0; i < populatedCellsWithoutNonMovingCells.length; i++) {
      if (this.occupiedCells.includes(populatedCellsWithoutNonMovingCells[i] + this.width)) {
        this.setHasHitShape(true)
      }
    }
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

    let settledShapeRow = this.height - this.currentShapeHeight

    let isNeighbouringOccupiedCell = this.checkIfNeighbouringStationaryBlocks("left")

    if (!this.leftBoundaryHit && !isNeighbouringOccupiedCell) {
      for (let i = 0; i < this.height; i++) {
        if (this.isFalling && (i < settledShapeRow) && this.rows[i] !== this.EMPTY_ROW) {
          this.rows[i] = `${this.rows[i].substring(1)}.`
        }
      }
      // this.rightBoundaryHit? this.rightBoundaryHit = !this.rightBoundaryHit : this.rightBoundaryHit
    } else if (this.leftBoundaryHit) {
      throw new Error("Cannot move shape past board boundary")
    } else if (isNeighbouringOccupiedCell) {
      throw new Error("Cannot move shape through another shape")
    }

    this.checkBoundaries("left")
    this.drawBoard()

    if (!this.isFalling) {
      throw new Error("Cannot move shape that is not falling")
    }
  }

  moveRight() {
    let isNeighbouringOccupiedCell = this.checkIfNeighbouringStationaryBlocks("right")

    let settledShapeRow = this.height - this.currentShapeHeight

    if (!this.rightBoundaryHit && !isNeighbouringOccupiedCell) {
      for (let i = 0; i < this.height; i++) {
        if (this.isFalling && (i < settledShapeRow) && this.rows[i] !== this.EMPTY_ROW) {
          this.rows[i] = `.${this.rows[i].substring(0, this.width - 1)}`
        }
      }
      // this.leftBoundaryHit ? this.leftBoundaryHit = !this.leftBoundaryHit : this.leftBoundaryHit
    } else if (this.rightBoundaryHit) {
      throw new Error("Cannot move shape past board boundary")
    } else if (isNeighbouringOccupiedCell) {
      throw new Error("Cannot move shape through another shape")
    }

    this.checkBoundaries("right")
    this.drawBoard()

    if (!this.isFalling) {
      throw new Error("Cannot move shape that is not falling")
    }
  }

  rotate() {
    let canRotate = this.checkIfCanRotate()
    let pennedIn = this.pennedIn()
    let offset = 0;
    if (this.rightBoundaryHit) {
      offset = 1
    }
    if (canRotate && !pennedIn) {
      let shape = this.currentShape.toString().substring(0, this.currentShape.toString().length - 1)
      let shapeRows = shape.toString().split('\n')
      let shapeObj = Object.assign({}, shapeRows)

      let topOfMovingShapeRow = this.calculateTopOfMovingShapeRow()

      // check if we need a wall kick and if so do the algorithm for it
      let neighbouringLeft = this.checkIfNeighbouringStationaryBlocks("left")
      let verticalOffset = 0;
      if (neighbouringLeft){
        console.log("DO A KICK")
        this.moveRight()
        verticalOffset = 1
      }

      const shapeObjShifted = Object.fromEntries(
        Object.entries(shapeObj).map(([key, value]) => [Number(key) + topOfMovingShapeRow + verticalOffset, value])
      );

  
      let currentMidpoint = this.calculatePopulatedCells()[0] % this.width

      // ToDo (later): Dont use empty row on stationary shape rows
      let newRows = this.rows.map((row, index) => {
        if (shapeObjShifted[index] === undefined) {
          return this.rows[index]
        } else {
          // insert shape row to board row
          let newRow = `${this.rows[index].substring(0, currentMidpoint - 1 - offset)}${shapeObjShifted[index]}${this.EMPTY_ROW.substring(currentMidpoint, this.width)}`
          // truncate row at board width
          newRow = newRow.substring(0, this.EMPTY_ROW.length)
          return newRow
        }
      })

      if (neighbouringLeft){
        newRows[topOfMovingShapeRow] = this.EMPTY_ROW
      }

      this.rows = newRows
      this.drawBoard()
    } else {
      this.drawBoard()
      throw new Error("Cannot rotate a shape through another shape or walls")
    }
  }

  rotateLeft() {
    this.setNewShape(this.currentShape.rotateLeft())
    this.rotate()
  }

  rotateRight() {
    //rename this method
    this.setNewShape(this.currentShape.rotateRight())
    this.rotate()
  }

  checkIfCanRotate() {
    this.checkBoundaries("left")
    this.checkBoundaries("right")
    let boundaryHit = this.leftBoundaryHit || this.rightBoundaryHit
    let hasNeighbours = this.checkIfNeighbouringStationaryBlocks()

    let canRotate = !(hasNeighbours && boundaryHit)
    return canRotate
  }

  pennedIn() {
    let populatedCells = this.calculatePopulatedCells()
    let populatedCellsWithoutNonMovingCells = populatedCells.filter(item => !this.occupiedCells.includes(item))
    let pennedIn;

    const firstSet = new Set(populatedCellsWithoutNonMovingCells);

    for (let i = 0; i < this.occupiedCells.length - 1; i++) {
      const a = this.occupiedCells[i];
      const b = this.occupiedCells[i + 1];

      // Exactly one integer between the two values
      if (Math.abs(a - b) === 2) {
        const between = Math.min(a, b) + 1;

        if (firstSet.has(between)) {
          return true;
        }
      }
    }

    return false;

  }

  calculateTopOfMovingShapeRow() {
    let rowNum = 0
    for (let i = 0; i < this.rows.length; i++){
      if(this.rows[i] !== this.EMPTY_ROW){
        rowNum = i
        break
      }
    }
    return rowNum
  }

  checkIfNeighbouringStationaryBlocks(direction) {
  const allPopulatedCells = this.calculatePopulatedCells();

  const populatedCellsWithoutNonMovingCells =
    allPopulatedCells.filter(item => !this.occupiedCells.includes(item));

  const offset = direction === "left" ? -1 : 1;

  for (let i = 0; i < populatedCellsWithoutNonMovingCells.length; i++) {
    const cell = populatedCellsWithoutNonMovingCells[i];

    if (this.occupiedCells.includes(cell + offset)) {
      return true;
    }
  }

  return false;
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

  calculatePopulatedCells() {
    let flatBoard = this.rows.join('').split('')
    let populatedCells = []
    flatBoard.forEach((char, index) => {
      if (char !== '.') {
        populatedCells.push(index)
      }
    })
    return populatedCells
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
    console.log(this.rows)
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
