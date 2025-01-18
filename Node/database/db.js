const mssql = require('mssql');

const config = {
    user: 'sa',
    password: 'sa@123',
    database: 'Category_Product_Management_System',
    server: 'localhost',
    port: 1433,
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