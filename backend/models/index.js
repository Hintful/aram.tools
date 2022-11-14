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
        let createTodos = `create table if not exists todos(
                            id int primary key auto_increment,
                            title varchar(255)not null,
                            completed tinyint(1) not null default 0
                        )`;

        db.query(createTodos, (err, results, fields) => {
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
