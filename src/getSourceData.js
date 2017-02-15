"use strict";
const sql = require("mssql");
let getSourceData = function (config) {
    return function (mapping) {
        return new Promise(function (resolve, reject) {
            sql.connect(config.source).then(function () {
                new sql.Request().query(mapping.query).then(function (recordset) {
                    resolve(recordset);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
            });
        });
    };
};

module.exports = getSourceData;
