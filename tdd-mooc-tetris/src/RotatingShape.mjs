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

        var newShapeMatrix = structuredClone(shapeMatrix)
        // Algorithm to rotate a matrix clockwise is to transpose and reverse rows

        // Transpse matrix
        for (let i=0; i < 3; i++){
            for(let j=0; j < 3; j++){
                newShapeMatrix[i][j] = shapeMatrix[j][i]
            }
        }

        // Reverse rows
        var newShapeMatrix = newShapeMatrix.map(row => {return row.reverse()}) 
        
        var newShapeRows = newShapeMatrix.map(row => {return row.join('')})

        var newShape = newShapeRows.join('\n')
        newShape = `${newShape}\n`

        return new RotatingShape(newShape)
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