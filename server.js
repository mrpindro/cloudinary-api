require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/errorHandler');
const { logger, logEvents } = require('./middleware/logger');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConn');
const run = require('./uploadVid');
const PORT = process.env.PORT || 5500;

app.use(logger);

connectDB();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// app.use(fileupload({ useTempFiles: true }));

// run();

app.use('/', require('./routes/root'));

app.use('/film', require('./routes/film'));

app.use('/*', (req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'message': 'Sorry, Page Not Found'});
    } else if (req.accepts('txt')) {
        res.send('Sorry, Page Not Found');
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});

mongoose.connection.on('error', err => {
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})