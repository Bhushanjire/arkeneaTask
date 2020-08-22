const mongoose = require('mongoose');

const DBURL = "mongodb://localhost/arkeneaAssign";

const connection = mongoose.connect(DBURL).then((result) => {
    console.log("Database Connected...");

}).catch((error) => {
    console.log('Error while connceting to database');

})

module.exports = connection