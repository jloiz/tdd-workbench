import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

describe("Moving tetrominos", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6)
    });

    // ToDo add 'call a lot' helper


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

    test("shape cannot be moved beyond left board edge", () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        expect(() => board.moveLeft()).to.throw("Cannot move shape past board boundary");
        expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
        )
    })

    test("shape cannot be moved beyond right board edge", () => {
        board.drop(Tetromino.T_SHAPE)
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        expect(() => board.moveRight()).to.throw("Cannot move shape past board boundary");
        expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
        )
    })

    test("shape cannot be dropped beyond bottom of board", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
        )
    })

    test.skip("shape cannot move left through another shape", () => {
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        // Test not working as expected as newShape resets isFalling, need more
        // robust protection
        board.drop(Tetromino.O_SHAPE);
        board.tick()
        // broken test from here
        board.moveRight()
        board.moveRight()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        
        
        board.moveLeft()

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......OO..
       ....OOOO..
       ....OO....`
        )
    })

    


})