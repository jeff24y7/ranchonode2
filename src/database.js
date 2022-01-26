const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'ranchopr.mysql.database.azure.com',
    user: 'ranchopr',
    password: 'Computadoras2022',
    database: 'dbranchoperalta2022',
    port:3306,
    ssl:true
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;