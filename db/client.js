// const { Client } = require("pg");

// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://ncxpmpea:uCegD0FKbCjwI0OGGwbPkydqQTgIixSp@bubble.db.elephantsql.com/ncxpmpea";

// const client = new Client({
//   connectionString,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined,
// });

// module.exports = client;

const { Client } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
