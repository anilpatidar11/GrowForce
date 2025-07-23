import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const url = "http://localhost:5000";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 const res = await axios.post(`${url}/api/register`, form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "username", "email", "phone", "password"].map((field) => (
          <div className="mb-3" key={field}>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  </div>
);

};

export default Register;
