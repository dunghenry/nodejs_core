const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const colors = require('colors');
const os = require('os');
process.env.UV_THREADPOOL_SIZE = os.cpus.length;
const viewEngine = require('./configs/viewEngine');
const { sequelize } = require('./configs/connect.mysql');
const connectDB = require('./configs/connect.mongodb');
const routes = require('./routes');
const port = process.env.PORT || 4000;
const app = express();
viewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//log request
app.use(morgan('dev'));
// middleware security
app.use(helmet());

//config routes
routes(app);
//Connect MySQL use sequelize
sequelize.sync();
//connect MongoDB
connectDB();
//connect redis
app.listen(port, () =>
    console.log(colors.green(`Server listening on http://localhost:${port}`)),
);
