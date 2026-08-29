import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresUserDao {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  close() {
    this.db.end();
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId],
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash],
    );
  }
}

export class PasswordServiceOld {
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}

/*
 Hard to test due to the DB.
 Need to test the basic read, write and db connection. Positive and negative cases
 Need to refactor out old password check
 Go with the 'just use docker' approach
 Tests will need to be able to connect (beforeEach vs beforeAll)
 Dependency inject the database connection
*/

// REFACTORED CODE BELOW

export class PostgresUser {
  dbConn;

  constructor(db) {
    this.dbConn = db;
  }

  #rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.dbConn.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId],
    );
    return rows.map(this.#rowToUser)[0] || null;
  }

  async save(user) {
    await this.dbConn.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash],
    );
  }
}

export class PasswordService {
  dbUser;
  passwordVerifier;

  constructor(dbUser, passwordVerifier) {
    this.dbUser = dbUser;
    this.passwordVerifier = passwordVerifier;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.dbUser.getById(userId);

    const isVerified = await this.passwordVerifier.verify(user.passwordHash, oldPassword);
    if (isVerified) {
      user.passwordHash = argon2.hashSync(newPassword);
      await this.dbUser.save(user);
    }
  }
}

export class PasswordVerificationService {
  verify(realPasswordHash, passwordProvided) {
    if (!argon2.verifySync(realPasswordHash, passwordProvided)) {
      throw new Error("wrong old password");
    } else {
      return true;
    }
  }
}
