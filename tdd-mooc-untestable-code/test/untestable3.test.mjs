import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { parsePeople, parsePeopleCsv, readCsv } from "../src/untestable3.mjs";
import { parse } from "csv-parse";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Can read a csv file and return records", () => {
  test("it reads a file", async () => {
    const data = await readCsv("test/data/people.csv");
    expect(data).to.exist;
  });

  test("it returns valid records", async () => {
    const data = await readCsv("test/data/people.csv");
    expect(data).toEqual([["Loid", "Forger", "", "Male"]]);
  });
});

describe("Can mutate records into a uniform form", () => {
  let testRecords;
  beforeEach(() => {
    testRecords = [
      ["Loid", "Forger", "", "Male"],
      ["Anya", "Forger", "6", "Female"],
    ];
  });

  test("it returns an array of objects", () => {
    const parsedRecords = parsePeople(testRecords);
    expect(parsedRecords).to.be.a("array");
    expect(parsedRecords.every((person) => typeof person === "object")).to.be.true;
  });

  test("it converts gender words to a lowercase letter", () => {
    const parsedRecords = parsePeople(testRecords);
    console.log(parsedRecords);
    expect(parsedRecords.every((person) => ["m", "f"].includes(person.gender))).to.be.true;
  });

  test("it removes age if it is undefined", () => {
    const missingAgeRecords = [["Loid", "Forger", "", "Male"]];
    const parsedRecords = parsePeople(missingAgeRecords);
    expect(parsedRecords[0].age).to.be.undefined;
  });

  test("it leaves first name unchanged", () => {
    const parsedRecords = parsePeople(testRecords);
    expect(parsedRecords[0].firstName).toEqual("Loid");
    expect(parsedRecords[1].firstName).toEqual("Anya");
  });

  test("it leaves last name unchanged", () => {
    const parsedRecords = parsePeople(testRecords);
    expect(parsedRecords[0].lastName).toEqual("Forger");
    expect(parsedRecords[1].lastName).toEqual("Forger");
  });
});
