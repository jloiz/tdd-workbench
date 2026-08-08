import { describe, test, beforeEach } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs"


describe("Rotating falling tetrominoes", () => {
    let board;

    beforeEach(() => {
        board = new Board(10, 8)
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
       ..........
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
       ..........
       ..........
       ..........`
        )
    })

    test("it returns to original orientation after four rotations", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateLeft()
        board.rotateLeft()
        board.rotateLeft()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........
       ..........`
        )
    })


    test("it cannot rotate left through a shape when there is no space", () => {
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        // board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        // board.rotateLeft()
        board.moveRight()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.rotateLeft()
        board.tick()
        board.tick()

        expect(() => board.rotateLeft()).to.throw("Cannot rotate a shape through another shape or walls");

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TT.....
       ..OOTOO...
       ..OO.OO...`
        )
    })


    test("it cannot rotate right through a shape when there is no space", () => {
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        // board.rotateLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        // board.rotateLeft()
        board.moveRight()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.rotateLeft()
        board.tick()
        board.tick()

        expect(() => board.rotateRight()).to.throw("Cannot rotate a shape through another shape or walls");

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TT.....
       ..OOTOO...
       ..OO.OO...`
        )
    })


    test("it cannot rotate left through a wall when there is no space", () => {
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()

        expect(() => board.rotateLeft()).to.throw("Cannot rotate a shape through another shape or walls");

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       T.........
       TT........
       TOO.......
       .OO.......`
        )
    })

    test("it cannot rotate right through a wall when there is no space", () => {
        board.drop(Tetromino.O_SHAPE)
        board.tick()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.tick()
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        board.tick()

        expect(() => board.rotateRight()).to.throw("Cannot rotate a shape through another shape or walls");

        expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       T.........
       TT........
       TOO.......
       .OO.......`
        )
    })

    test("it can wall kick and rotate left off a wall if there is space", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.rotateLeft()

        // Double check position is right for a wall kick
        // First make the can rotate an and condition to only prohibit rotation for both
        expect(board.toString()).to.equalShape(
      `..........
       .T........
       TTT.......
       ..........
       ..........
       ..........
       ..........
       ..........`
        )
    })

    test("it can wall kick and rotate left off a wall if there is space", () => {
        board.drop(Tetromino.T_SHAPE)
        board.tick()
        board.rotateLeft()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateRight()

        // Double check position is right for a wall kick
        // First make the can rotate an and condition to only prohibit rotation for both
        expect(board.toString()).to.equalShape(
      `..........
       ........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........
       ..........`
        )
    })



})