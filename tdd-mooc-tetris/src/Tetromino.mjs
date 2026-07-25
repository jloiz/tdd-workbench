import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    constructor(){}

    static T_SHAPE = new Tetromino.fromString('.T.\nTTT\n...\n')

    fromString(shapeString) {
        return RotatingShape(shapeString)
    } 
}