import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao, PostgresUser } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    //PostgresUserDao.getInstance().close();
  });

  test("it can be constructed with a database connection", async () => {
    const pgUser = new PostgresUser(db)
    expect(pgUser).to.exist
  });
});
