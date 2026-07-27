import { RotatingShape } from "./RotatingShape.mjs";

export class Board {
    #block;

    constructor(blockString) {
        this.#block = shapeString
        Object.freeze(this)
    }

    static fromString(blockString) {
        // const formattedShape = `${shapeString.replaceAll(' ', '')}\n`
        //return new RotatingShape(formattedShape)
        return new RotatingShape(blockString)
    }

    cleanShape(unformattedShape) {
        return unformattedShape.substring(0, this.#shape.length - 1)
    }

    toString() {
        return this.#shape
    }
}