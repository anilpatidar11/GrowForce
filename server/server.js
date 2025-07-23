const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require("./routers/userRouter");
const EmployeeRouter = require("./routers/employeeRouter");

const app = express();

//  CORS setup using environment variable
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

//  Routes
app.use('/api', userRouter);
app.use('/api', EmployeeRouter);

//  MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

//  Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
