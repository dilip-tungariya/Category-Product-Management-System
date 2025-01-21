const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE_NAME,
    server: process.env.MSSQL_SERVER,
    port: Number(process.env.MSSQL_PORT),
    dialect: "mssql",
    dialectOptions: {
        "instanceName": "SQLEXPRESS",
    },
    pool: {
        max: 30,
        min: 5,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new mssql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Database connected');
        return pool
    }).catch(err => {
        console.log(`Database Connection Failed : ${err.message}`);
    });

module.exports = { poolPromise };