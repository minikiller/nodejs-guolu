var clients = require('restify-clients');

// Creates a JSON client
var client = clients.createJsonClient({
    url: 'http://localhost:3001/'
});

client.post('/employees', {
    "employee_name": "test123456",
    "employee_salary": 170750,
    "employee_age": 30
}, function(err, req, res, obj) {
    // assert.ifError(err);
    console.log('%d -> %j', res.statusCode, res.headers);
    console.log('%j', obj);
});
