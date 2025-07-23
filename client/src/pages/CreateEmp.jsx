
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateEmp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get('id'); //  get employee ID

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });

  const isEditMode = !!editId;



    const url = "http://localhost:5000/api";
  
  //  Auto-fill fields when editing
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${url}/getemp/${editId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData(res.data.data); //  fill inputs
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    if (isEditMode) {
      fetchEmployee();
    }
  }, [editId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (isEditMode) {
        await axios.put(`${url}/edit/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Employee updated successfully');
      } else {
        await axios.post(`${url}/add`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Employee added successfully');
      }
      navigate('/allemps');
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
      <h3 className="text-center mb-4">
        {isEditMode ? 'Update Employee' : 'Add Employee'}
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="form-control mb-3"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="form-control mb-3"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          className="form-control mb-3"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <input
          className="form-control mb-3"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          className="form-control mb-4"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        <button type="submit" className="btn btn-primary w-100">
          {isEditMode ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  </div>
);

};

export default CreateEmp;
