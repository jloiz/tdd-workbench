import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    
    tetromino;

    constructor(tetrominoShape){
        this.tetromino = tetrominoShape
    }

    static T_SHAPE = Tetromino.fromString('.T.\nTTT\n...\n')
    static I_SHAPE = Tetromino.fromString('.....\n.....\nIIII.\n.....\n.....\n')

    static fromString(tetrominoString) {
        this.tetromino = tetrominoString;
        return new Tetromino(tetrominoString)
    } 

    rotateRight() {
        return Tetromino.fromString('.T.\n.TT\n.T.\n')
    }

    toString() {
        return this.tetromino
    }
}