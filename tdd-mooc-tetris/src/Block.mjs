import { RotatingShape } from "./RotatingShape.mjs";

export class Block {
    #block;

    constructor(blockString) {
        this.#block = blockString
        Object.freeze(this)
    }

    static fromString(blockString) {
        // const formattedShape = `${shapeString.replaceAll(' ', '')}\n`
        //return new RotatingShape(formattedShape)
        return new RotatingShape(blockString)
    }

    cleanShape(unformattedShape) {
        return unformattedShape.substring(0, this.#block.length - 1)
    }

    toString() {
        return this.#block
    }
}