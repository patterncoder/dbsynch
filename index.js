#!/usr/bin/env node

var config = require("./config");
var sql = require("mssql");
var mongo = require("mongodb").MongoClient;

var mongoose = require("mongoose");
mongoose.connect(config.target.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('ninjaAPI db opened');
});



var models = require("./NinjaSchemas");
var Customer = mongoose.model('Customer', models.customer.Customer);


var mapping = require("./mappings/01_company");

var createWithErrorCapture = function (docToInsert) {
    Customer.create(docToInsert, function (err, insertedDoc) {
        if (err) {
            console.log(err);
            docToInsert.validationErrors = [];
            for(key in err.errors){
                console.log(key);
                var newErr = { 
                    errorLocation: key,
                    value: err.errors[key].value
                };
                console.log(newErr);
                docToInsert.validationErrors.push(newErr);
            };
            docToInsert.phoneNumbers.pop();
            createWithErrorCapture(docToInsert);
        }
    });
};

sql.connect(config.source).then(function () {

    new sql.Request().query("SELECT TOP 10 * FROM oldtowndining.oldtowndining.tblCustomers;").then(function (recordset) {
        console.log(recordset.length);
        recordset.forEach(function (customer) {
            console.log("gonna add...");
            var now = Date.now();
            var newCust = {
                meta: { company: "58965a580bf269f834991d56", dateCreated: now, dateLastMod: now },
                firstName: customer.CFirstName || " ",
                lastName: customer.CLastName || " ",
                addresses: [{
                    addressType: "work",
                    primary: true,   
                    address1: customer.CAddress || " ",   
                    address2: customer.CAddress2 || " ",   
                    city: customer.CCity || " ",
                    state: customer.CState || " ",
                    zip: customer.CZip || " "}],
                emails: [
                    {
                    emailType: "work",
                    primary: true,
                    email: customer.CEmail || "no@email.com"}
                    ],
                phoneNumbers: [
                    {contactType: "work",
                    primary: true,
                    number: customer.CPhoneH || "888-555-1212"}
                    ],
                notes: "this is a note"
            }
            createWithErrorCapture(newCust);
            // Customer.create(newCust, function (err, cust) {
            //     if (err) { 
            //         console.log(err);
            //         return "had an error" 
            //     }
            // });
        });


    }).catch(function (err) {
        console.log(err);
    });
});
