#!/usr/bin/env node

var param = "fixNull('empty')";


var param2 = "fixNull(0)";

var re = /\(([^)]+)\)/;


var re2 = /\[([^)]+)\]/;
var match5 = "field[0].value".match(re2);
console.log(match5);

var newMatch = re.exec(param);
// console.log(newMatch);

// console.log(param.match(re));
// console.log(param2.match(re));

var match = param.match(re);
var match2 = param2.match(re);
var match3 = "fixNull".match(re);

// console.log("the method it" + match3);

var method = param.slice(0, match.index);
// console.log(method);

// console.log(match[1]);

// console.log(method);

