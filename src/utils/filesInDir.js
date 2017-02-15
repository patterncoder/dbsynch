"use strict";

let fs = require("fs");

exports.getFiles = function (folder) {
    return new Promise(function (resolve, reject) {
        let dirFiles;
        fs.readdir(folder, (err, files) => {
            if(err) reject(err);
            dirFiles = files.filter(file => {
                return !fs.lstatSync(folder + "/" + file).isDirectory();
            });
            resolve(dirFiles);
        })
    });
};