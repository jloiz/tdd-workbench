import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("todo", async () => {
    // TODO: write proper tests
    try {
      expect(await parsePeopleCsv("people.csv")).to.deep.equal([]);
    } catch (e) {}
  });

  test("it reads a file", async () => {
     const data = await readCsv("test/data/people.csv")
     expect(data).to.exist
  })

  //test("it returns valid records", async ()
});
