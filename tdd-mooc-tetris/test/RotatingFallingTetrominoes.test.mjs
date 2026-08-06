import { Board } from "../src/Board.mjs";

describe("Rotating falling tetrominoes", () => {
    let board;

    beforeEach(() => {
        board = new Board(10, 6)
    })


    test("it rotates to the right", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateRight()

        expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ....TT....
       ....T.....
       ..........
       ..........`
        )
    })

})