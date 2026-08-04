import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {

    #tetromino;

    constructor(tetrominoString) {
        this.#tetromino = tetrominoString
        Object.freeze(this)
    }

    static T_SHAPE = Tetromino.fromString('.T.\nTTT\n...\n')
    static I_SHAPE = Tetromino.fromString('.....\n.....\nIIII.\n.....\n.....\n')
    static O_SHAPE = Tetromino.fromString('.OO\n.OO\n...\n')
    static J_SHAPE = Tetromino.fromString('J..\nJJJ\n...\n')
    static L_SHAPE = Tetromino.fromString('..L\nLLL\n...\n')
    static S_SHAPE = Tetromino.fromString('.SS\nSS.\...\n')
    static Z_SHAPE = Tetromino.fromString('ZZ.\n.ZZ\n...\n')

    static fromString(tetrominoString) {
        return new Tetromino(tetrominoString)
    }

    rotateRight() {
        let shape = new RotatingShape(this.#tetromino)
        let rotatedShape = shape.rotateRight()
        let tetrominoString = rotatedShape.toString()
        // Make a special case for O
        if (this.isAtBottomOfBox(tetrominoString) && tetrominoString.includes('O')) {
            tetrominoString = this.pushToTopOfBox(tetrominoString)
        }
        if (tetrominoString.includes('I')){
            tetrominoString = this.pushToRightOfBox(tetrominoString)
        }

        return Tetromino.fromString(tetrominoString)
    }


    rotateLeft() {
        let shape = new RotatingShape(this.#tetromino)
        let rotatedShape = shape.rotateLeft()
        let tetrominoString = rotatedShape.toString()

        if (this.isAtBottomOfBox(tetrominoString)) {
            tetrominoString = this.pushToTopOfBox(tetrominoString)
        }
        // make special case for O
        if (tetrominoString.includes('O')) {
            tetrominoString = this.pushToRightOfBox(tetrominoString)
        }

        return Tetromino.fromString(tetrominoString)
    }

    pushToTopOfBox(tetrominoString) {
        tetrominoString = tetrominoString.split('\n').reverse().join('\n')
        tetrominoString = `${tetrominoString.slice(1)}\n`
        return tetrominoString
    }

    pushToRightOfBox(tetrominoString) {
        return tetrominoString.split('\n').map(row => { return row.split('').reverse().join('') }).join('\n')
    }

    isAtBottomOfBox(tetrominoString) {
        return (tetrominoString.substring(0, 5) === '.....') || tetrominoString.substring(0, 3) === '...'
    }

    height() {
        let shapeHeight;
        let tetromino = structuredClone(this.#tetromino)
        let tetroParts = tetromino.split('\n').filter(part => { return part !== '...' })
        tetroParts = tetroParts.filter(part => { return part !== '' })
        return tetroParts.length
    }



    toString() {
        return this.#tetromino
    }
}