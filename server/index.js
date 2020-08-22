const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
global.rootDir = path.resolve(__dirname);


const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }))

app.use(express.static('public'))

const DBConnection  = require('./database/connection');
const userRoute = require('./route/userRoute');
app.use(userRoute)

app.listen(4500,()=>{
    console.log('Server runs on post 4500');
})