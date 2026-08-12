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

    test("it pulls all items from the bag", ()=> {
        let pulledItems = []
        bag.fill(testItems)
        for (let i=0; i< pulledItems.length; i++){
            pulledItems.push(bag.pull)
        }
        expect(pulledItems).toEqual(expect.arrayContaining(testItems))
    })
})