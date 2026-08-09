import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { GameCoordinator } from "../src/GameCoordinator.mjs"



describe("Keeping score", () => {
    
    function fallToBottom(board) {
        for (let i = 0; i < 6; i++) {
            board.tick()
        }
    }

    function singleLineClear(board) {
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        fallToBottom(board)
    }


    test("the board publishes the number of rows cleared", () => {
        let gameCoordinator = {
            publish: vi.fn()
        }

        let board = new Board(12, 6, gameCoordinator)
        singleLineClear(board)

        expect(gameCoordinator.publish).toHaveBeenCalledWith("numRowsCleared", 1)

    })
})