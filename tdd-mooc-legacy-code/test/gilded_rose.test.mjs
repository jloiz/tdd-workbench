import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("foo", -1, 0));
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

  test("Aged Brie, qualit under 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", -2, 50));
  });

  test("Aged Brie, positive sellin, quality under 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 4, 50));
  });

  test("Aged Brie, quality 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", -2, 50));
  });

  test("Aged Brie, positive sellin, quality 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 4, 50));
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

  test("Sulfuras, Hand of RagnarosAged Brie, positive sellin, low quality above 10", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", -1, 10));
  });

  test("Backstage passes", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0));
  });

  test("Backstage passes, negative sellin, quality above 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0));
  });

  test("Backstage passes, negative sellin, quality 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0));
  });

  test("Backstage passes, negative sellin, quality below 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0));
  });

  test("Backstage passes, positive sellin, quality below 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50));
  });

  test("Backstage passes, positive sellin, quality 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50));
  });

  test("Backstage passes, positive sellin, quality above 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50));
  });

  test("Backstage passes, positive sellin 12, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1));
  });

  test("Backstage passes, positive sellin 11, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1));
  });

  test("Backstage passes, positive sellin 10, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2));
  });

  test("Backstage passes, positive sellin 7, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 6, 2));
  });

  test("Backstage passes, positive sellin 6, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2));
  });

  test("Backstage passes, positive sellin 5, quality 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 3));
  });

});
