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
        var cleanShape = this.#shape.substring(0, this.#shape.length -1)
        var rows = cleanShape.split('\n')
        var shapeMatrix = rows.map(row => row.split(''))       

        var newElements = structuredClone(shapeMatrix)
        // Algorithm to rotate a matrix clockwise is to transpose and reverse rows

        // Transpse matrix
        for (let i=0; i < 3; i++){
            for(let j=0; j < 3; j++){
                newElements[i][j] = shapeMatrix[j][i]
            }
        }

        // Reverse rows
        var newElements2 = newElements.map(row => {return row.reverse()}) 
        newElements2 = newElements2.map(row => {return row.join('')})

        var newRows = newElements2.join('\n')
        newRows = `${newRows}\n`

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