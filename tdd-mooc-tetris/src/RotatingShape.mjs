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
        const shapeMatrix = this.matrixFromShape(cleanShape)

        // Algorithm to rotate matrix right is to transpose and reverse rows
        const transposedShapeMatrix = this.transpose(shapeMatrix)

        // Reverse rows
        const rotatedShapeMatrix = transposedShapeMatrix.map(row => { return row.reverse() })
        // Rejoin elements into row
        const rotatedShape = rotatedShapeMatrix.map(row => { return row.join('') })

        var formattedShape = this.formatShape(rotatedShape)
        return new RotatingShape(formattedShape)
    }

    rotateLeft() {
        const cleanShape = this.cleanShape(this.#shape)
        const shapeMatrix = this.matrixFromShape(cleanShape)

        // Algorithm to rotate a matrix anticlockwise is to transpose and reverse columnns
        var transposedShapeMatrix = this.transpose(shapeMatrix)

        // Join elements in row
        var newShapeRows = transposedShapeMatrix.map(row => { return row.join('') })
        // Reverse columns
        var rotatedShape = newShapeRows.reverse()

        var formattedShape = this.formatShape(rotatedShape)
        return new RotatingShape(formattedShape)
    }

    cleanShape(unformattedShape) {
        return unformattedShape.substring(0, this.#shape.length - 1)
    }

    matrixFromShape(shape) {
        const rows = shape.split('\n')
        const matrix = rows.map(row => row.split(''))
        return matrix
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

    formatShape(shapeStr) {
        return `${shapeStr.join('\n')}\n`
    }

    toString() {
        return this.#shape
    }
}