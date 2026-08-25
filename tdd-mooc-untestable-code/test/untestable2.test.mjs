import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("it returns unmbers", () => {
    // TODO: write proper tests
    expect(diceHandValue()).to.be.a("number");
  });

  test("dice hand value is decoupled from rolls", () => {
    expect(diceHandValue(1,4)).to.be.a("number")
  })

  // test("it returns the high die for mismatched dice", () => {
  //   expect(diceHandValue())
  // })
});
