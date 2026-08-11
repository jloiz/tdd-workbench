import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffling the bag", () => {

    test("it can create a bag", () => {
        let bag;
        bag = new ShuffleBag()
        expect(bag).to.exist
    })
})