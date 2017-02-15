"use strict";

var mapping = {
    query: `select top 5 CFirstName, CLastName from oldtowndining.oldtowndining.tblCustomers;`,
    mongooseModel: 'Customer',
    target: {
        firstName: null,
        lastName: null
        // addresses: [
        //     {
        //         address1: null,
        //         address2: null,
        //         city: null,
        //         state: null,
        //         zip: null,
        //     }
        // ]
    },
    columns: [
        { source: "CFirstName", target: "firstName", normalizers: ["fixNull('FirstName')", 'trim'] },
        { source: "CLastName", target: "lastName", normalizers: ["fixNull('LastName')", 'trim'] }
        // { source: "CAddress", target: "addresses[0].address1", normalizers: ['fixNull', 'trim'] },
        // { source: "CAddress2", target: "addresses[0].address2", normalizers: ['fixNull', 'trim'] },
        // { source: "CCity", target: "addresses[0].city", normalizers: ['fixNull', 'trim'] },
        // { source: "CState", target: "addresses[0].state", normalizers: ['fixNull', 'trim'] },
        // { source: "CZip", target: "addresses[0].zip", normalizers: ['fixNull', 'trim'] }
    ]
}





module.exports = mapping;


