import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  let testCurrentDate;
  beforeEach(() => {
    testCurrentDate = new Date("2026-08-24T03:24:00:000");
  });

  test("it accepts a current date", () => {
    expect(daysUntilChristmas(currentDate)).to.be.a("number");
  });

  test("it uses the current year", () => {
    let spy = vi.spyOn(testCurrentDate, "getFullYear");
    daysUntilChristmas(testCurrentDate);
    expect(spy).toHaveBeenCalled();
  });

  test("it uses the current month", () => {
    let spy = vi.spyOn(testCurrentDate, "getMonth");
    daysUntilChristmas(testCurrentDate);
    expect(spy).toHaveBeenCalled();
  });

  test("it uses the current day", () => {
    let spy = vi.spyOn(testCurrentDate, "getDate");
    daysUntilChristmas(testCurrentDate);
    expect(spy).toHaveBeenCalled();
  });

  test("it returns the correct number of days until christmas", () => {
    expect(daysUntilChristmas(currentDate).toEqual(122))
  })
});
