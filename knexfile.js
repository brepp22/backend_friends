const path = require('path');
require('dotenv').config(); // Load env vars

// Shared config for migrations/seeds
const sharedConfig = {
  migrations: {
    directory: path.join(__dirname, './data/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './data/seeds'),
  },
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './data/dev.sqlite3'),
    },
    ...sharedConfig,
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',  // <-- changed from 'pg' to 'sqlite3'
    connection: {
      filename: process.env.DB_FILEPATH || path.resolve(__dirname, './data/prod.sqlite3'), // Use env var or default path
    },
    ...sharedConfig,
    useNullAsDefault: true,
  },
};




