import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    
    tetromino;
    // put rot shape here
    // make private

    constructor(tetrominoString){
        this.tetromino = tetrominoString
    }

    static T_SHAPE = Tetromino.fromString('.T.\nTTT\n...\n')
    static I_SHAPE = Tetromino.fromString('.....\n.....\nIIII.\n.....\n.....\n')

    static fromString(tetrominoString) {
        this.tetromino = tetrominoString;
        return new Tetromino(tetrominoString)
    } 

    rotateRight() {
        let shape = new RotatingShape(this.tetromino)
        let rotatedShape = shape.rotateRight()
        let shapeString = rotatedShape.toString()

        return Tetromino.fromString(shapeString)
    }

    toString() {
        return this.tetromino
    }
}