import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    
    tetromino;
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

    rotateLeft(){
        let shape = new RotatingShape(this.tetromino)
        let rotatedShape = shape.rotateLeft()
        let shapeString = rotatedShape.toString()

        let shapeIsAtBottomOfBox = shapeString.substring(0, 5) === '.....'
         if (shapeIsAtBottomOfBox) {
             shapeString = shapeString.split('').reverse().join('')
             shapeString = `${shapeString.slice(1)}\n`
         }
        
        console.log(shapeString)
        return Tetromino.fromString(shapeString)
    }

    toString() {
        return this.tetromino
    }
}