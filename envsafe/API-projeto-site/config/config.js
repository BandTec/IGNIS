module.exports = {
  // Insira aqui seus dados do banco NA NUVEM AZURE
  production: {
    // altere APENAS username, password, database e host.
    username: process.env.PROD_USER,
    password: process.env.PROD_PASS,
    database: process.env.PROD_NAME,
    host: process.env.PROD_HOST,
    dialect: 'mssql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },

  // Insira aqui seus dados do banco LOCAL - MySQL Workbench
  dev: {
    // altere APENAS username, password e database.
    username: process.env.DEV_USER,
    password: process.env.DEV_PASS,
    database: process.env.DEV_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },
};