"use strict";

var mapping = {
    sourceSql: `select * from oldtowndining.oldtowndining.tblCustomers;`,
    target: {
        firstName: null,
        lastName: null,
        age: null
    },
    columns: [
        { source: "CFirstName", target: "firstName", normalizers: ['trim', 'capatalizeFirstLetter'] },
        { source: "CLastName", target: "lastName", normalizers: ['trim', 'capatalizeFirstLetter'] },
        { source: "CAge", target: "age", normalizers: ['castNum'] }
    ]
}

module.exports = mapping;


