import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { parsePeople, parsePeopleCsv, readCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Can read a csv file and return records", () => {

  test("it reads a file", async () => {
     const data = await readCsv("test/data/people.csv")
     expect(data).to.exist
  });

  test("it returns valid records", async () =>{
    const data = await readCsv("test/data/people.csv")
    expect(data).toEqual([["Loid", "Forger", "", "Male"]])
  });


});

describe("Can mutate records into a unitform form", () => {
  let testRecords;
  beforeEach(() => {
    testRecords = [["Loid", "Forger", "", "Male"], ["Anya", "Forger", "6", "Female"]]
  });

  test("it returns an aray of objects", () => {
    const parsedRecords = parsePeople(testRecords)
    expect(parsedRecords).to.be.a("array")
    expect(parsedRecords.every(person => typeof person === "object")).to.be.true;
  })
})
