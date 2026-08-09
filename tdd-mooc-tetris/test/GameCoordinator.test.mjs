import { beforeEach, describe, test, vi } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board.mjs"
import { Tetromino } from "../src/Tetromino.mjs"
import { GameCoordinator } from "../src/GameCoordinator.mjs"


describe("Game coordinator", () => {

    test("it calls a subscriber when a score is published from the board", () => {
        let gameCoordinator = new GameCoordinator()
        let subscriber = vi.fn()

        gameCoordinator.subscribe("numRowsCleared", subscriber)

        gameCoordinator.publish("numRowsCleared", 1)

        expect(subscriber).toHaveBeenCalledWith(1)
    })

})

