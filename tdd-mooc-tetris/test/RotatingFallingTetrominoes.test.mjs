import { describe, test, beforeEach } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs"


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

    test("it rotates to the left", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
        )
    })

})