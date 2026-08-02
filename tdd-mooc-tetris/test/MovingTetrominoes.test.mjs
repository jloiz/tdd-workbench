import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

describe("Moving tetrominos", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    });


    test("move to the left", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveLeft()

        expect(board.toString()).to.equalShape(
        `..........
       ...T......
       ..TTT.....
       ..........
       ..........
       ..........`
        )
    })

})