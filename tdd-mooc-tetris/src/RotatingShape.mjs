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

        const [shapeMatrix, shapeMatrixLength, shapeMatrixHeight] = this.matrixFromShape(cleanShape)

        const transposedShapeMatrix = this.transpose(shapeMatrix)

        // Reverse rows
        const rotatedShapeMatrix = transposedShapeMatrix.map(row => { return row.reverse() })
        // Rejoin elements into row
        const rotatedShapeRows = rotatedShapeMatrix.map(row => { return row.join('') })

        let rotatedShape = rotatedShapeRows.join('\n')
        rotatedShape = `${rotatedShape}\n`

        return new RotatingShape(rotatedShape)
    }

    rotateLeft() {
        const cleanShape = this.cleanShape(this.#shape)

        const [shapeMatrix, shapeMatrixLength, shapeMatrixHeight] = this.matrixFromShape(cleanShape)
        // Algorithm to rotate a matrix clockwise is to transpose and reverse columns

        var transposedShapeMatrix = this.transpose(shapeMatrix)

        // Reverse columns
        var newShapeRows = transposedShapeMatrix.map(row => { return row.join('') })
        var rotatedShape = newShapeRows.reverse()

        var formattedShape = `${rotatedShape.join('\n')}\n`
        return new RotatingShape(formattedShape)
    }

    cleanShape(unformattedShape) {
        return unformattedShape.substring(0, this.#shape.length - 1)
    }

    matrixFromShape(shape) {
        const rows = shape.split('\n')
        const matrix = rows.map(row => row.split(''))
        const height = matrix.length
        const length = matrix[0].length
        return [matrix, length, height]
    }

    // ToDo Create matrix object with the properties
    transpose(matrix) {
        const length = matrix[0].length
        const height = matrix.length
        const transposedMatrix = structuredClone(matrix)

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < length; j++) {
                transposedMatrix[i][j] = matrix[j][i]
            }
        }
        return transposedMatrix
    }

    toString() {
        return this.#shape
    }
}