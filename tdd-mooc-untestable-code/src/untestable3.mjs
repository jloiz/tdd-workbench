import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

/*
 Hard to test due to the file system access
 Multiple responsibilities to be broken out (read, parse, business logic)

 need to test read and parser
 need to test missing age
 need to test parsing a person

*/

// REFACTORED CODE BELOW

export function parsePeople(records) {
  const parsedRecords = records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });

  return parsedRecords;
}

export async function readCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf-8" });
  const records = parse(csvData, {
    skipEmptyLines: true,
    trim: true,
  });
  return records;
}
