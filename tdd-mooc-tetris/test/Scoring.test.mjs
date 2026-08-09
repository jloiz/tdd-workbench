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
            subscribe : vi.fn()
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

describe("The scoreboard keeps score", () =>{
    let scoreBoard
    beforeEach(() => {
        let gameCoordinator = new GameCoordinator
        scoreBoard = new ScoreBoard(gameCoordinator)
    })

    test("it gives a score of zero initially", () => {
    scoreBoard.getScore()
    expect(scoreBoard.getScore()).to.equal(0)
    })
   
})