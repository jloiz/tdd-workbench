import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffling the bag", () => {
    let testItems;
    beforeEach(() => {
        testItems = [1, 2, {}, [], "egg"]
    })

    test("it can create a bag", () => {
        let bag;
        bag = new ShuffleBag()
        expect(bag).to.exist
    })

    test("it can have items added to it", () => {
        let bag;
        bag = new ShuffleBag()
        bag.fill(testItems)
        expect(bag.contents).to.equal(testItems)
    })

    test("it gives an individual item, that is part of the contents", () => {
        let bag;
        bag = new ShuffleBag()
        bag.fill(testItems)
        expect(bag.pull()).to.be.oneOf(testItems)
    })
})