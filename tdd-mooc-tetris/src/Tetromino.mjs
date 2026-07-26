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
        let tetrominoString = rotatedShape.toString()
        // Make a special case for O
        if (this.isAtBottomOfBox(tetrominoString) && tetrominoString.includes('O')) {
            tetrominoString = this.pushToTopOfBox(tetrominoString)
        }

        return Tetromino.fromString(tetrominoString)
    }


    rotateLeft() {
        let shape = new RotatingShape(this.tetromino)
        let rotatedShape = shape.rotateLeft()
        let tetrominoString = rotatedShape.toString()

        
        if (this.isAtBottomOfBox(tetrominoString)) {
            tetrominoString = this.pushToTopOfBox(tetrominoString)
        }
        // make special case for O
        if (tetrominoString.includes('O')){
            tetrominoString = this.pushToRightOfBox(tetrominoString)
        }

        return Tetromino.fromString(tetrominoString)
    }

    pushToTopOfBox(tetrominoString) {
        tetrominoString = tetrominoString.split('\n').reverse().join('\n')
        tetrominoString = `${tetrominoString.slice(1)}\n`
        return tetrominoString
    }
    
    pushToRightOfBox(tetrominoString){
        return tetrominoString.split('\n').map(row => {return row.split('').reverse().join('')}).join('\n') 
    }

    isAtBottomOfBox(tetrominoString){
        return (tetrominoString.substring(0, 5) === '.....') || tetrominoString.substring(0, 3) === '...'
    }


    toString() {
        return this.tetromino
    }
}