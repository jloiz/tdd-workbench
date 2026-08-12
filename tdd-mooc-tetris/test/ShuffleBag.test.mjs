import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffling the bag", () => {
    let testItems;
    let bag;
    beforeEach(() => {
        testItems = [1, 2, {}, [], "egg"]
        bag = new ShuffleBag()
    })

    test("it can create a bag", () => {
        expect(bag).to.exist
    })

    test("it can have items added to it", () => {
        bag.fill(testItems)
        expect(bag.contents).to.equal(testItems)
    })

    test("it gives an individual item, that is part of the contents", () => {
        bag.fill(testItems)
        expect(bag.pull()).to.be.oneOf(testItems)
    })

    test("it pulls all items from the bag", () => {
        let pulledItems = []
        bag.fill(testItems)
        for (let i = 0; i < testItems.length; i++) {
            pulledItems.push(bag.pull())
        }
        expect(pulledItems).toEqual(expect.arrayContaining(testItems))
    })

    test("it keeps pulling items after a full set is pulled", () => {
        let pulledItems = []
        bag.fill(testItems)
        for (let i = 0; i < testItems.length; i++) {
            pulledItems.push(bag.pull())
        }
        expect(bag.pull()).to.be.oneOf(testItems)
    })

    test("it pulls full sets in different orders", () => {
        let pulledItems1 = []
        let pulledItems2 = []
        bag.fill(testItems)
        for (let i = 0; i < testItems.length; i++) {
            pulledItems1.push(bag.pull())
        }
        for (let i = 0; i < testItems.length; i++) {
            pulledItems2.push(bag.pull())
        }
        // check not the same array but have the same items and size
        expect(pulledItems2).not.toEqual(pulledItems1)
        expect(pulledItems2).toHaveLength(pulledItems1.length)
        expect(pulledItems2).toEqual(expect.arrayContaining(pulledItems1))
    })
})