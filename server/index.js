const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mysql = require('mysql');
const multer = require("multer");
const dbName = 'YChat';

const app = express();

const whiteList = [
  "http://localhost:3000"
]

const corsOption = {
	origin: function(origin, cb){
		if(whiteList.indexOf(origin) !== -1){
			cb(null, true);
		} else {
			cb(new Error("Not allowed by cors"));
		}
	},
};

app.use(cors(corsOption));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'QAZWSXEDC',
  database: dbName
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connection with database was established!');
});

module.exports.con = connection;

const loginRouter = require('./routes/login.js').loginRouter;
const registrateRouter = require('./routes/registrate.js').registrationRouter;
const messagesRouter = require('./routes/messages.js').messagesRouter;

app.use(logger('dev'));
app.use(loginRouter);
app.use(registrateRouter);
app.use(messagesRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )
    }
})

module.exports.storage = storage;

const port = process.env.PORT || 3001;

module.exports.app = app;

app.listen(port, () => {
    console.log(`Server started at port: ${ port }`);
})


