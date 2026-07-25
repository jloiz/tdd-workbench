import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    
    tetromino

    static T_SHAPE = Tetromino.fromString('.T.\nTTT\n...\n')
    static I_SHAPE = Tetromino.fromString('.....\n.....\nIIII.\n.....\n.....\n')

    static fromString(tetrominoString) {
        this.tetromino = tetrominoString;
        return new RotatingShape(tetrominoString)
    } 

    toString() {
        return this.tetromino
    }
}