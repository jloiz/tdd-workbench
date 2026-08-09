import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { GameCoordinator } from "../src/GameCoordinator.mjs"
import { ScoreBoard } from "../src/ScoreBoard.mjs"



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

    test("the score board listens for the number of rows cleared via the game controller", () => {
        let gameCoordinator = {
            subscribe : vi.fn()
        }

        let scoreBoard = new ScoreBoard(gameCoordinator)
        // use any function as the purpose of this test is to just check the 
        // scoreboard is infact subscribing
        expect(gameCoordinator.subscribe).toHaveBeenCalledWith("numRowsCleared", expect.any(Function))
    })
})