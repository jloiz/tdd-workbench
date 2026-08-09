import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { GameCoordinator } from "../src/GameCoordinator.mjs"
import { ScoreBoard } from "../src/ScoreBoard.mjs"



describe("Keeping scoreboard and board communicate", () => {

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
            subscribe: vi.fn()
        }

        let scoreBoard = new ScoreBoard(gameCoordinator)
        // use any function as the purpose of this test is to just check the 
        // scoreboard is infact subscribing
        expect(gameCoordinator.subscribe).toHaveBeenCalledWith("numRowsCleared", expect.any(Function))
    })


    test("the scoreboard responds to a row clear", () => {
        let gameCoordinator = new GameCoordinator()
        let scoreBoard = new ScoreBoard(gameCoordinator)

        let updateFunc = vi.spyOn(scoreBoard, "updateScore")

        gameCoordinator.publish("numRowsCleared", 1)

        expect(updateFunc).toHaveBeenCalledWith(1)
    })
})

describe("The scoreboard keeps score", () => {

    let scoreBoard
    let gameCoordinator

    beforeEach(() => {
        gameCoordinator = new GameCoordinator
        scoreBoard = new ScoreBoard(gameCoordinator)
    })

    test("it gives a score of zero initially", () => {
        expect(scoreBoard.getScore()).to.equal(0)
    })

    
    test("it gives a score of 40 on a single line clear", () => {
        gameCoordinator.publish("numRowsCleared", 1)
        scoreBoard.getScore()
        expect(scoreBoard.getScore()).to.equal(40)
    })

    test("it gives a score of 100 on a double line clear", () => {
        gameCoordinator.publish("numRowsCleared", 2)
        scoreBoard.getScore()
        expect(scoreBoard.getScore()).to.equal(100)
    })

    test("it gives a score of 300 on a triple line clear", () => {
        gameCoordinator.publish("numRowsCleared", 3)
        scoreBoard.getScore()
        expect(scoreBoard.getScore()).to.equal(300)
    })

     test("it gives a score of 1200 on a tetris line clear", () => {
        gameCoordinator.publish("numRowsCleared", 4)
        scoreBoard.getScore()
        expect(scoreBoard.getScore()).to.equal(1200)
    })

    test("it tallies mulitple scores", () => {
        gameCoordinator.publish("numRowsCleared", 1)
        gameCoordinator.publish("numRowsCleared", 2)
        gameCoordinator.publish("numRowsCleared", 3)
        gameCoordinator.publish("numRowsCleared", 4)
        scoreBoard.getScore()
        expect(scoreBoard.getScore()).to.equal(1640)
    })

})