const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: "chatdb",
    rowAsArray: true
});

module.exports = pool