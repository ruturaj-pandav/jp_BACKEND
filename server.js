const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")


const employeeRoutes = require("./router/employeeRoutes");
const generalRoutes = require("./router/generalRoutes");
const employerRoutes = require("./router/employerRoutes");


const app = express()
mongoose.connect('mongodb://localhost/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));
app.use(express.json())
app.use(cors())

dotenv.config();
app.use("/employers", employerRoutes);
app.use("/employees", employeeRoutes);
app.use("/general", generalRoutes);


app.listen(8000 , function(req, res) {
    console.log("listening on 8000")
})