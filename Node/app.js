const express = require('express');
const app = express();
const { poolPromise } = require('./database/db')
const writequery = require('./database/writeQuery');
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: '*' }));

app.post('/index', async (req, res) => {
    try {
        let query = `EXEC ${req.body.spName} ${writequery(req.body.params)}`;
        const pool = await poolPromise
        pool.request()
            .query(query)
            .then(result => {
                if (result.recordset.length > 0) {
                    if (result.recordset[0].hasOwnProperty('TotalRecords')) {
                        let data = {
                            totalRecords: result.recordsets[0][0].TotalRecords,
                            records: result.recordsets[1]
                        };
                        res.status(200).send({
                            statusCode: res.statusCode,
                            message: result.recordsets[1].length > 0 ? 'Data found' : 'No data found',
                            data: data
                        });
                    } else {
                        res.status(200).send({
                            statusCode: res.statusCode,
                            message: result.recordset[0].message
                        });
                    }
                }
            }).catch(err => {
                res.status(400).send({
                    statusCode: res.statusCode,
                    message: err.message,
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            message: err.message,
        });
    }
});

module.exports = app;