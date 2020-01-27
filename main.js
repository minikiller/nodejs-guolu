/**
 * Module Dependencies
 */
// import * as corsMiddleware from "";
const corsMiddleware = require('restify-cors-middleware');
const errors = require('restify-errors');
const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: [],
    exposeHeaders: []
});
const config = require('./config'),
    restify = require('restify'),
    mysql = require('mysql')


/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    version: config.version,
    // url : config.hostname
});

var connection = config.db.get;
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.pre(cors.preflight);
server.use(cors.actual);

// server.use(restify.CORS())
/*server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});*/

server.pre((req, res, next) => {
    console.info(`${req.method} - ${req.url}`);
    return next();
});

//rest api to get all results
server.get('/employees', function (req, res) {
    connection.query('select * from employee', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

server.get('/query', function (req, res) {
    connection.query('SELECT *, ABS(NOW() - create_time) AS diffTime\n' +
        '   FROM employee\n' +
        '   ORDER BY diffTime ASC limit 1', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to get a single employee data
server.get('/employees/:id', function (req, res) {
    connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to create a new record into mysql database
server.post('/employees', function (req, res, next) {
    try {
        var postData = req.body;
        connection.query('INSERT INTO employee SET ?', postData);
        res.send(201);
        next();
    }catch (e) {
        return next(new errors.InvalidContentError(err));
    }


});

//rest api to update record into mysql database
server.put('/employees', function (req, res) {
    connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name, req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
server.del('/employees/:id', function (req, res) {
    connection.query('DELETE FROM `employee` WHERE `id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});

server.get('/', function (req, res) {
    console.log('Welcome Nodejs restify');
});


server.listen(3001, function () {
    console.log(server.toString());
    console.log('%s listening at %s', server.name, server.url);
});
