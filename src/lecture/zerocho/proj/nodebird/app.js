const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/config.js');

const app = express();
app.use(helmet());
app.use(morgan(config.morgan.level));

app.get('/', (req, res, next) => {
    res.json({'message': 'good day to study'});
});

app.listen(8001, () => console.log('8001 에서 기다릴게'));
