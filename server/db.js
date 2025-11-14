const mongoose = require('mongoose');

const dburl = 'mongodb://localhost:27017/employee_db';


module.exports = () =>{
    mongoose.connect(dburl)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });
}
