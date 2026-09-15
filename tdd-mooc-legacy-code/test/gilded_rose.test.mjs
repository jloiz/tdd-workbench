import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("foo", -1, 0));
  });

  test("Backstage passes", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0));
  });

  test("Something else", () => {
    const gildedRose = new Shop([new Item("foo", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("foo", -2, 0));
  });

  test("Quality above 50", () => {
    const gildedRose = new Shop([new Item("foo", -1, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("foo", -2, 49));
  });
  
  
});
