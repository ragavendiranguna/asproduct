const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const productRouter = require("./src/product.route");

const app = express()

const APP = require('./src/config/app')
const DB = require('./src/config/database')
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }});
    
    app.use( cors() )
// app.use( helmet() )
// app.disable('x-powered-by')
// app.use( compression() )
app.use( bodyParser.json() )

app.use(productRouter);

// app.use( require('./src/middlewares/errorHandler') )
// app.use( require('./src/middlewares/notFoundHandler') )

app.listen(APP.PORT, (err)=>{
    if(err){
        console.log(`[ERROR] Could not start the application...`) 
        console.log(`[ERROR] ${err.message}`)
    }
    else {
        console.log(`Server is running on port ${APP.PORT}...`)
        return 'server working'
    }
})

mongoose.connect(DB.ADDRESS, DB.OPTIONS, (err)=>{
    if(err){
        console.log(`[ERROR] Could not connect to database: ${DB.ADDRESS}`) 
        console.log(`[ERROR] ${err.message}`)
    }
    else console.log(`Server connected to database: ${DB.ADDRESS}`)
})