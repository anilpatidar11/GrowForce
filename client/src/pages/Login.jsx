import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const url = "https://growforce.onrender.com";


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/login`, form); 
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  </div>
);

};

export default Login;
