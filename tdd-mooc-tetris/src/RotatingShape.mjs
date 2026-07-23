export class RotatingShape {
    shape;

    static fromString(shapeString){
        this.shape = `${shapeString.replaceAll(' ','')}\n`
        return this.shape
    }

}