const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//local imports
const connectDB = require('./db.js')
const employeeRoutes = require('./controllers/employee.controller.js')

const app = express()

//middleware
app.use(bodyParser.json())
app.use(cors(origin='http://localhost:4200'))
app.use('/api/employees',employeeRoutes)



//printing on cmd prompt
app.listen(8080,()=>console.log('Application is running on port 8080'))
connectDB();



// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

// const app = express();
// app.use(express.json());

// // connect MongoDB
// mongoose.connect("mongodb://localhost:27017/employee_db")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // simple route test
// app.get("/api/employees", (req, res) => {
//   res.send("Employees API working!");
// });

// const PORT = 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
