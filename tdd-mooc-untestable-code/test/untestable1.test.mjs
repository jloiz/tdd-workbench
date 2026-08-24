import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("value returned is a number", () => {
    expect(daysUntilChristmas()).to.be.a("number");
  });

  test("it accepts a current date", () => {
    let testCurrentDate = new Date(2026, 8, 24)

    expect(daysUntilChristmas(testCurrentDate)).to.be.a("number")
  });

});
