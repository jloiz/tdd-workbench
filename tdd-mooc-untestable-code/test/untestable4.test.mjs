import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, PostgresUser } from "../src/untestable4.mjs";
import { execSync } from 'node:child_process'

describe("Untestable 4: enterprise application", () => {
  // let service;
  // beforeEach(() => {
  //   service = new PasswordService();

  // });

  // afterEach(() => {
  //   //PostgresUserDao.getInstance().close();
  // });

  beforeAll(() => {
    execSync("docker compose up -d")
  })

  afterAll(() => {
    execSync("docker compose down")
  })

  test("docker container for tests starts", () => {

  })

  test("it can be constructed with a database connection", async () => {
    const pgUser = new PostgresUser(db)
    expect(pgUser).to.exist
  });
});
