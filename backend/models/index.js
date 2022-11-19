var mysql = require('mysql2');

// mysql sync
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
      console.log("Database connection failed.", err);
    } else {
        console.log("Connected to MySQL DB");
        let createSummoners = `create table if not exists summoners(
                            puuid string primary key,
                            name varchar(255) not null,
                            profileIconId int,
                            summonerLevel int,
                        )`;

        db.query(createSummoners, (err, results, fields) => {
        if (err) {
                console.log(err.message);
            }
        });

        connection.end(err => {
            if (err) {
                return console.log(err.message);
            }
        });
    }
});

module.exports = db_con;
