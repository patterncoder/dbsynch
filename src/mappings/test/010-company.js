var mapping = {
    table: "oldtowndining.tblCustomers",
    collection: "customers",
    columns: [
        {source: "CFirstName", target: "firstName", targetType: "value"},
        {source: "CLastName", target: "lastName"},
        {source: "CAddress", target: "addresses[0].address1"},
        {source: "CAddress2", target: "addresses[0].address2"},
        {source: "CLastName", target: "lastName"},
        {source: "CLastName", target: "lastName"},
        {source: "CLastName", target: "lastName"}

    ]
};

var sourceSql = function () {
    var columns = mapping.columns.map(function(column){
        return column.source + " as " + column.target;
    });
    return "SELECT " + columns.join(", ") + " from " + mapping.table;
}

module.exports = {
    mapping: mapping,
    sourceSql: sourceSql
};