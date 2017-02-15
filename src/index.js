
"use strict";

var config = require("../config");
let mongoose = require("./mongoose")(config);
let getFiles = require("./utils/filesInDir");

var mapData = require("./mapData")(config);

let dir = process.cwd() + "/src/mappings/";

let p = Promise.resolve();

getFiles.getFiles(dir).then(function (files) {
    files.forEach(function (file) {
        p = p.then(function () {
            return mapData(dir + file).then(function (result) {
                console.log(result);
            });
        });
    });
    p = p.then(function(){
        console.log("all done");
        process.exit();
    });
});