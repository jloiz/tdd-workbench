import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  let currentDate;
  beforeEach(() => {
    currentDate = new Date("2026-08-24T03:24:00:000")
  })

  test("it accepts a current date", () => {
    expect(daysUntilChristmas(currentDate)).to.be.a("number")
  });

  test("it uses the current year", () => {
    let spy = vi.spyOn(currentDate, "getFullYear")
    daysUntilChristmas(currentDate)
    expect(spy).toHaveBeenCalled()
  })

  test("it uses the current month", () => {
    let spy = vi.spyOn(currentDate, "getMonth")
    daysUntilChristmas(currentDate)
    expect(spy).toHaveBeenCalled()
  })

});
