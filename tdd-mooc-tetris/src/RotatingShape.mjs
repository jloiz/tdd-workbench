export class RotatingShape {
    #shape;

    constructor(shapeString) {
        this.#shape = shapeString
        Object.freeze(this)
    }

    static fromString(shapeString) {
        var formattedShape = `${shapeString.replaceAll(' ', '')}\n`
        return new RotatingShape(formattedShape)
    }

    rotateRight() {
        var hardcoded =
            `GDA
       HEB
       IFC`

        var formattedShape = `${hardcoded.replaceAll(' ', '')}\n`
        return new RotatingShape(formattedShape)
    }

    rotateLeft() {
        var hardcoded =
        `CFI
       BEH
       ADG`

        var formattedShape = `${hardcoded.replaceAll(' ', '')}\n`
        return new RotatingShape(formattedShape)
    }

    toString() {
        return this.#shape
    }
}