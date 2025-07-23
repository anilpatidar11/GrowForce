import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllEmps = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
   const url = "http://localhost:5000/api"


  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${url}/allemp`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data && res.data.data) {
        setEmployees(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    try {
      await axios.delete(`${url}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Employee deleted successfully");
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

const handleEdit = (id) => {
  navigate(`/addemp?id=${id}`);
};


return (
  <div className="container mt-5">
    <div className="card shadow-lg p-4">
      <h3 className="text-center mb-4">All Employees</h3>
      {employees.length === 0 ? (
        <p className="text-muted text-center">No employees found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center table-bordered">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>₹{emp.salary}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(emp._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

};

export default AllEmps;
