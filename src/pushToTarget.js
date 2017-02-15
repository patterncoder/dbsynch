"use strict";

var normalize = require("./normalizers").normalize;

let pushToTarget = function (config) {
    return function (data, mapping) {
        return new Promise(function (resolve, reject) {
            let Model = require("./models")[mapping.mongooseModel];
            var now = Date.now();
            var meta = { company: "58965a580bf269f834991d56", dateCreated: now, dateLastMod: now }
            var newDoc = Object.assign({ meta: meta }, mapping.target);
            mapping.columns.forEach(column => {
                getValue(data, column, newDoc);
            });
            createWithErrorCapture(Model, newDoc).then(function (result) {
                resolve("pushing to mongo");
            });
        });
    };
}

function getValue(data, column, newDoc) {
    if (column.target.includes(".")) {
        let parts = column.target.split(".");
        if (parts[0].includes("[")) {
            let key = parts[0].slice(0, parts[0].indexOf("["));
            var re2 = /\[([^)]+)\]/;
            var match = parts[0].match(re2);
            newDoc[key][match[1]][parts[1]] = normalize(data[column.source], column.normalizers);
        } else {
            newDoc[parts[0]][parts[1]] = normalize(data[column.source], column.normalizers);
        }
    } else {
        newDoc[column.target] = normalize(data[column.source], column.normalizers);
    }
}

var createWithErrorCapture = function (Model, docToInsert) {
    return new Promise(function (resolve, reject) {
        return Model.create(docToInsert, function (err, insertedDoc) {
            if (err) {
                console.log(err);
                docToInsert.validationErrors = [];
                for (key in err.errors) {
                    console.log(key);
                    var newErr = {
                        errorLocation: key,
                        value: err.errors[key].value
                    };
                    console.log(newErr);
                    docToInsert.validationErrors.push(newErr);
                };
                // docToInsert.phoneNumbers.pop();
                createWithErrorCapture(docToInsert);
            }
            resolve(insertedDoc);
        });
    });
};


module.exports = pushToTarget;