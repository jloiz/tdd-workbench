export class RotatingShape {
    #shape;

    constructor(shapeString) {
        this.#shape = shapeString
        Object.freeze(this)
    }

    static fromString(shapeString) {
        const formattedShape = `${shapeString.replaceAll(' ', '')}\n`
        return new RotatingShape(formattedShape)
    }

    rotateRight() {
        const cleanShape = this.cleanShape(this.#shape)

        const rows = cleanShape.split('\n')

        const shapeMatrix = rows.map(row => row.split(''))
        const shapeMatrixHeight = shapeMatrix.length
        const shapeMatrixLength = shapeMatrix[0].length

        const newShapeMatrix = structuredClone(shapeMatrix)
        // Algorithm to rotate a matrix clockwise is to transpose and reverse rows

        // Transpose matrix
        for (let i = 0; i < shapeMatrixHeight; i++) {
            for (let j = 0; j < shapeMatrixLength; j++) {
                newShapeMatrix[i][j] = shapeMatrix[j][i]
            }
        }

        // Reverse rows
        const rotatedShapeMatrix = newShapeMatrix.map(row => { return row.reverse() })

        // Rejoin elements into row
        const rotatedShapeRows = rotatedShapeMatrix.map(row => { return row.join('') })

        let rotatedShape = rotatedShapeRows.join('\n')
        rotatedShape = `${rotatedShape}\n`

        return new RotatingShape(rotatedShape)
    }

    rotateLeft() {
        const cleanShape = this.cleanShape(this.#shape)
        const rows = cleanShape.split('\n')

        const shapeMatrix = rows.map(row => row.split(''))
        const shapeMatrixHeight = shapeMatrix.length
        const shapeMatrixLength = shapeMatrix[0].length

        const newShapeMatrix = structuredClone(shapeMatrix)
        // Algorithm to rotate a matrix clockwise is to transpose and reverse columns

        // Transpose matrix
        for (let i = 0; i < shapeMatrixHeight; i++) {
            for (let j = 0; j < shapeMatrixLength; j++) {
                newShapeMatrix[i][j] = shapeMatrix[j][i]
            }
        }
        
        // Reverse columns
        var newShapeRows = newShapeMatrix.map(row => {return row.join('')})
        var rotatedShapeMatrix = newShapeRows.reverse()


        var formattedShape = `${rotatedShapeMatrix.join('\n')}\n`
        return new RotatingShape(formattedShape)
    }

    cleanShape(unformattedShape) {
        return unformattedShape.substring(0, this.#shape.length - 1)
}

    toString() {
        return this.#shape
    }
}