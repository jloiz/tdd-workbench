import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {

    tetromino;
    // make private

    constructor(tetrominoString) {
        this.tetromino = tetrominoString
    }

    static T_SHAPE = Tetromino.fromString('.T.\nTTT\n...\n')
    static I_SHAPE = Tetromino.fromString('.....\n.....\nIIII.\n.....\n.....\n')
    static O_SHAPE = Tetromino.fromString('.OO\n.OO\n...\n')

    static fromString(tetrominoString) {
        this.tetromino = tetrominoString;
        return new Tetromino(tetrominoString)
    }

    rotateRight() {
        let shape = new RotatingShape(this.tetromino)
        let rotatedShape = shape.rotateRight()
        let shapeString = rotatedShape.toString()

        let shapeIsAtBottomOfBox = shapeString.substring(0, 3) === '...'
        if (shapeIsAtBottomOfBox && shapeString.includes('O')) {
            console.log(shapeString.split('\n').reverse())
            shapeString = shapeString.split('\n').reverse().join('\n')
            shapeString = `${shapeString.slice(1)}\n`
        }

        return Tetromino.fromString(shapeString)
    }


    rotateLeft() {
        let shape = new RotatingShape(this.tetromino)
        let rotatedShape = shape.rotateLeft()
        let tetrominoString = rotatedShape.toString()

        let tetrominoIsAtBottomOfBox = tetrominoString.substring(0, 5) === '.....'
        if (tetrominoIsAtBottomOfBox) {
            tetrominoString = this.pushToTopOfBox(tetrominoString)
        }

        return Tetromino.fromString(tetrominoString)
    }

    pushToTopOfBox(tetrominoString) {
        tetrominoString = tetrominoString.split('\n').reverse().join('\n')
        tetrominoString = `${tetrominoString.slice(1)}\n`
        return tetrominoString
    }


    toString() {
        return this.tetromino
    }
}