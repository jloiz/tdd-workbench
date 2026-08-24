import { describe, test, vi } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("value returned is a number", () => {
    expect(daysUntilChristmas()).to.be.a("number");
  });

  test("it accepts a current date", () => {
    let currentDate = new Date("2026-08-24T03:24:00")
    expect(daysUntilChristmas(currentDate)).to.be.a("number")
  });

  test("it uses the current year", () => {
    let currentDate = new Date("2026-08-24T03:24:00")
    let spy = vi.spyOn(currentDate, "getFullYear")

    expect(spy).toHaveBeenCalled()
  })

});
