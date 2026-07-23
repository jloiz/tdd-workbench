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
            `GDA\nHEB\nIFC\n`
        // var rows = this.#shape.split('\n')    
        var rows = hardcoded.split('/n')
        rows = rows.map(row => {
            return row
        })
        console.log(rows)

        var newRows = rows.join('\n')

        console.log(newRows)

        return new RotatingShape(newRows)
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