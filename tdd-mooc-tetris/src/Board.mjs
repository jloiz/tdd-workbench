export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
   console.log("here", this.width, this.height)
    return "...\n...\n...\n";
  }
}
