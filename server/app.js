const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const assetRouter = require('./routes/assetRoutes');

// Start express app
const app = express();

app.enable('trust proxy');


// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());


// 3) ROUTES
app.use('/api/v1/assets', assetRouter);

app.use(express.static(path.join(__dirname, '../front-end/build')));

app.get('/', (req, res) =>{  
  res.sendFile(path.resolve(__dirname, "../front-end", "build", "index.html"))
})

app.get('/*', (req, res) =>{  
  res.sendFile(path.resolve(__dirname, "../front-end", "build", "index.html"))
})


//app.use(globalErrorHandler);

module.exports = app;
