import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, PostgresUser } from "../src/untestable4.mjs";
import { execSync } from "node:child_process";
import pg from "pg";
import { verify } from "@node-rs/argon2";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  // let service;
  // beforeEach(() => {
  //   service = new PasswordService();

  // });

  // afterEach(() => {
  //   //PostgresUserDao.getInstance().close();
  // });

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

  beforeAll(async () => {
    execSync("docker compose up -d");
    await connectToDb();
  });

  afterAll(() => {
    db.end()
  })

  beforeEach(() => {
    pgUser = new PostgresUser(db)
  })

  test("it can be constructed with a database connection", async () => {
    expect(pgUser).to.exist;
  });
});
