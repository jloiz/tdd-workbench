import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { Tetromino } from "../src/Tetromino.mjs"

describe("Shuffling the bag", () => {
    let tetrominos
    beforeEach(() => {
        tetrominos = [
            Tetromino.T_SHAPE,
            Tetromino.I_SHAPE,
            Tetromino.J_SHAPE,
            Tetromino.S_SHAPE,
            Tetromino.Z_SHAPE,
            Tetromino.L_SHAPE,
            Tetromino.O_SHAPE
        ]
    })

    test("it can create a bag", () => {
        let bag;
        bag = new ShuffleBag()
        expect(bag).to.exist
    })

    test("it can have items added to it", () => {
        let bag;
        bag = new ShuffleBag()
        bag.fill(tetrominos)
        expect(bag.contents).to.equal(tetrominos)
    })

    test("it gives an individual item, that is part of the contents", () => {
        let bag;
        bag = new ShuffleBag()
        bag.fill(tetrominos)
        expect(bag.pull()).to.be.oneOf(tetrominos)
    })
})