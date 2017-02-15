#!/usr/bin/env node

var mutators = require("./src/normalizers");
var personMapping = require("./src/mappings/020-person");


var people = [{
    CFirstName: " chris ",
    CLastName: "  baily ",
    CAge: " 47 "
}, {
    CFirstName: " kim ",
    CLastName: "  baily ",
    CAge: " 48.8 "
}];




function normalize(value, normalizers) {
    normalizers.forEach(function (normalizer) {
        value = mutators[normalizer](value);
    });
    return value;
}


var result = [];

people.forEach(function (person) {
    var newPerson = Object.assign({}, personMapping.target);
    personMapping.columns.forEach(function(column){
        newPerson[column.target] = normalize(person[column.source], column.normalizers);
    });
    result.push(newPerson);
});

console.log(result);



