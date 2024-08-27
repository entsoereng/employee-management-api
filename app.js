const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employeeRoutes = require('./api/routes/v1/employee');
const reviewRoutes = require('./api/routes/v1/reviews');

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://mkntsoereng:' + process.env.MONGO_ATLAS_PW + '@cluster0.u2nj9.mongodb.net/userManagement?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

mongoose.Promise = global.Promise;
// Use Morgan for logging
app.use(morgan('dev'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Prevent CORS errors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// });
// if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
// }
// next();


// Routes that should handle requests
app.use('/employee', employeeRoutes);
app.use('/reviews', reviewRoutes);

// Handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Handle all other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
