import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

describe("Moving tetrominos", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    });


    test("moves to the left", () => {
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

    test("moves to the right", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.moveRight()

        expect(board.toString()).to.equalShape(
      `..........
       .....T....
       ....TTT...
       ..........
       ..........
       ..........`
        )
    })


    test("moves down", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()

        expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
        )
    })

    
    test("a non falling shape cannot be moved right", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        expect(() => board.moveRight()).to.throw("Cannot move shape that is not falling");

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
        )
    })

        test("a non falling shape cannot be moved left", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        expect(() => board.moveLeft()).to.throw("Cannot move shape that is not falling");
        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
        )
    })
})