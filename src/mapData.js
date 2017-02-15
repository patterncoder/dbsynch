
"use strict";

let mapData = function (config) {
    let getSourceData = require("./getSourceData")(config);
    let pushToTarget = require("./pushToTarget")(config);
    let p = Promise.resolve();
    return function (path) {
        return new Promise(function (resolve, reject) {
            let mapping = require(path);
            p = p.then(function () {
                return getSourceData(mapping).then(function (recordset) {
                    console.log(recordset.length);
                    recordset.forEach(function (record) {
                        p = p.then(function () {
                            return pushToTarget(record, mapping).then(function (resultOfPush) {
                                console.log(resultOfPush);
                            }, function(err){
                                console.log(err);
                            });
                        });
                    });
                    p = p.then(function(result){
                        resolve("all done pushing to mongo for this mapping")
                    });
                });
            });
        });
    };
}


module.exports = mapData;