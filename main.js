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
server.use(restify.plugins.bodyParser({mapParams: false}));
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
server.get('/results', function (req, res) {
    connection.query('select * from result', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

server.get('/query/:typeId', function (req, res, next) {
    connection.query('SELECT *, ABS(NOW() - CurDate) AS diffTime ' +
        '   FROM result ' +
        ' where Type=?  ORDER BY diffTime ASC limit 1 ', [req.params.typeId], function (err, results) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return next(new errors.InvalidContentError(err));
        }
        res.end(JSON.stringify(results));
    });
});

//rest api to get a single result data
server.get('/results/:id', function (req, res) {
    connection.query('select * from result where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to create a new record into mysql database
server.post('/results', function (req, res, next) {

    var postData = req.body;
    var objArray = []
    postData.forEach(map => {
        objArray.push(Object.values(map))
    })
    const query = "INSERT INTO result (P_Value, T_Value, Dry_Value,Qm_Value,Qh_Value,Acc_Qm_Value,Acc_Qh_Value,Type) VALUES ?";
    connection.query(query, [objArray], (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return next(new errors.InvalidContentError(err));
        }
        console.log(result);
        res.send(201);
        next();
    });


});

//rest api to update record into mysql database
server.put('/results', function (req, res) {
    connection.query('UPDATE `result` SET `result_name`=?,`result_salary`=?,`result_age`=? where `id`=?', [req.body.result_name, req.body.result_salary, req.body.result_age, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
server.del('/results/:id', function (req, res) {
    connection.query('DELETE FROM `result` WHERE `id`=?', [req.params.id], function (error, results, fields) {
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
