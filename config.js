'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'rest-api',
    hostname : 'http://localhost',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        get : mysql.createConnection({
			host     : '192.119.116.101',
			user     : 'root',
			password : 'kalix@163.com',
			database : 'kalix'
		})
    }
}
