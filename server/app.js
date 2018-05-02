const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const cron = require('cron')
const CronJob = require('cron').CronJob
const redis = require('redis');
const client = redis.createClient()

const app = express();
require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Database
const mongoose = require('mongoose')
const dbURL = `mongodb://kevin:12345@ds231199.mlab.com:31199/onlinebidding`
mongoose.connect(dbURL, (err) => {
  if (!err) {
    console.log('Database connected')
  }
})

// Redis
client.on('connect', () => {
  console.log('redis connected!'); 
})

// Routes
const users = require('./routes/user');
const admin = require('./routes/admin')
const home = require('./routes/home')
const product = require('./routes/product')
const {removingExpiredBid, removingExpiredAsk} = require('./helpers/cron')

// Cron
removingExpiredBid.start();
removingExpiredAsk.start()



app.use('/', home)
app.use('/user', users);
app.use('/admin', admin)
app.use('/product', product)

module.exports = app;
