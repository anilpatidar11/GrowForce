const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

 const userRouter = require("./routers/userRouter");
 const EmployeeRouter = require("./routers/employeeRouter")

const app = express();
app.use(cors());
app.use(express.json());


 app.use('/api', userRouter);
 app.use('/api', EmployeeRouter);



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

