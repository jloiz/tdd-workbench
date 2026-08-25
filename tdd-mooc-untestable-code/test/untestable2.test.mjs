import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("it returns unmbers", () => {
    // TODO: write proper tests
    expect(diceHandValue()).to.be.a("number");
  });

  test("dice hand value is decoupled from rolls", () => {
    expect(diceHandValue(1,4)).to.be.a("number")
  })

  test("it returns the high die for mismatched dice", () => {
    expect(diceHandValue(1,4)).toEqual(4)
    expect(diceHandValue(2,6)).toEqual(6)
  })

  test("it returns the die value plus 100 matched dice", () => {
    expect(diceHandValue(4,4)).toEqual(104)
    expect(diceHandValue(6,6)).toEqual(106)
  })

  test("rolling the dice gives all possible values", () => {
    let rolls = []
    for(let i=0; i < 100; i++){
      rolls.push(diceRoll())
    }
    const uniqueRolls = Array.from(new Set(rolls))
    expect(uniqueRolls).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  })
});
