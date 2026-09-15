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

  test("Aged Brie", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", -2, 51));
  });


  test("Aged Brie, positive sellin", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 4, 51));
  });


  test("Sulfuras, Hand of Ragnaros, positive sellin", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 5, 51));
  });

  test("Sulfuras, Hand of RagnarosAged Brie, positive sellin, low quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", -1, 10));
  });
  
  
});
