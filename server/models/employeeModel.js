const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  position: String,
  department: String,
  salary: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const EmployeeSchemaModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeSchemaModel;
