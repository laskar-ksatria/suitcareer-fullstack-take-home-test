const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mainRouter = require('./routes');
const PORT = 3100;

//Connect to mongoDb
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//connect to main Router
app.use(mainRouter);

//ErrorHandler
app.use(require("./middlewares/errorHandler"));

server.listen(PORT, () => console.log("Server listening on " + PORT));