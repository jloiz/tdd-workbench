import { afterAll, afterEach, beforeAll, beforeEach, describe, test, vi } from "vitest";
import { PostgresUser } from "../src/untestable4.mjs";
import { execSync } from "node:child_process";
import pg from "pg";
import { expect } from "chai";
import { readFileSync } from "fs";

  let db;
  let pgUser;

  async function connectToDb() {
    const connInfo = {
      host: "127.0.0.1",
      port: "5433",
      user: "untestable",
      password: "secret",
      database: "postgres",
    };
    db = new pg.Pool(connInfo);
    await verifyConnection(db);
  }

  async function verifyConnection(db) {
    let retries = 200;
    while (retries > 0) {
      try {
        await db.query("SELECT 1");
        console.log("Postgres ready");
        return;
      } catch (error) {
        console.log("Failed to connect to database: ", error);
        await new Promise((r) => setTimeout(r, 250));
        retries--;
      }
    }
  }

  async function createTables() {
    await db.query(readFileSync("./src/create-tables.sql", { encoding: "utf8", flag: "r" }))
  }

  async function dropTables() {
    await db.query(readFileSync("./src/drop-tables.sql", { encoding: "utf8", flag: "r" }))
  }

  async function popluateTables() {
    for (let i = 0; i < 5; i++) {
      await db.query(`insert into users (user_id, password_hash)
        values ($1, $2);`, [i.toString(), `pass_${i}`])
    }
  }

describe("Can interface with the database provided a connection", () => {

  beforeAll(async () => {
    execSync("docker compose up -d");
    await connectToDb();
    // clear before run for clean workspace and to enable peeking
    await dropTables();
    await createTables();
    await popluateTables()
  });

  afterAll(async () => {
    await db.end()
    execSync('docker compose down')
  })

  beforeEach(() => {
    pgUser = new PostgresUser(db)
  })

  test("it can be constructed with a database connection", async () => {
    expect(pgUser).to.exist;
  });

  test('it can get a user by id', async () => {
    const spy = vi.spyOn(db, 'query')
    
    await pgUser.getById(1)
    expect(spy).toHaveBeenCalled()
  })

  test('it gets the correct user by id', async () => {
    const expectedResult = {userId: 2, passwordHash: 'pass_2'}
    
    const result = await pgUser.getById(2)
    expect(result).toEqual(expectedResult);
  })

  test('it can write a new user', async () => {
    const newUser = {userId: 6, passwordHash: 'pass_6'}
    const spy = vi.spyOn(db, 'query')
    await pgUser.save(newUser)
    expect(spy).toHaveBeenCalled()
    const result = await pgUser.getById(6)
    expect(result).toEqual(newUser)
  })

  test('it does a update on a duplicate write', async () => {
    const existingUser = {userId: 5, passwordHash: 'i_forgot_my_password'}
    const spy = vi.spyOn(db, 'query')
    await pgUser.save(existingUser)
    expect(spy).toHaveBeenCalled()
    const result = await pgUser.getById(5)
    expect(result).toEqual(existingUser)
  })
});
