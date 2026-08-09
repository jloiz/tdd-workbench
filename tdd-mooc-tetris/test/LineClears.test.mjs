import { beforeEach, describe, test } from "vitest";
import { expect } from "chai"
import { Tetromino } from "../src/Tetromino.mjs";
import { Board } from "../src/Board.mjs"

describe("Line clears", () => {
    let board;
    beforeEach(() => {
        board = new Board(12, 6)
    });

    function fallToBottom() {
        for (let i = 0; i < 6; i++) {
            board.tick()
        }
    }

    test("it clears a single line", () => {
        console.log("HERE")
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom()
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        fallToBottom()
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        fallToBottom()
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        fallToBottom()

        expect(board.toString()).to.equalShape(
              `............
               ............
               ............
               ............
               ............
               .T..T..T..T.`
        )
    })
})