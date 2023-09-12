const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    mongoose.connect(process.env.DATABASE_CONNECTION_URI, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connection successfull...');
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.log(error);
    });
}

module.exports = dbConnect;