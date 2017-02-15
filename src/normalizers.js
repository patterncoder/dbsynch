"use strict";

let mutators = {
    trim: function(value) {
        return value.trim();
    },
    castNum: function(value){
        return parseInt(value);
    },
    capatalizeFirstLetter: function(value) {
        function toTitleCase (str){
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
        return value[0] === value[0].toUpperCase() ? value : toTitleCase(value);
    },
    fixNull: function(value, replacement) {
        if(!value || /^$|\s+/.test(value) ){
            return replacement;
        } else {
            return value;
        }
    }
};


exports.normalize = function normalize(value, normalizers) {
    let re = /\(([^)]+)\)/;
    normalizers.forEach(function (method) {
        let match;
        if (match = re.exec(method)) {
            let passedMethod = method.slice(0, match.index);
            let param = match[1].startsWith("'") ? match[1].slice(1, match[1].length -1) : match[1];
            value = mutators[passedMethod](value, param);
        } else {
            value = mutators[method](value);
        }
    });
    return value;
}