import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); //!! (double NOT operator) ka use isliye kiya gaya hai value ko strictly boolean banane

//Ye effect tab chalega har baar jab location change hoti hai, yaani:
//Jab tum page navigate karte ho: /, /contact, /login, etc.
//Browser me back/forward press karte ho.
//Kisi Link ya navigate() function se route change hota hai.


  // Update login status on route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    
    //Ye har route change ke baad check karta hai:
    // //Kya localStorage me token abhi bhi hai?
//Agar hai → isLoggedIn = true
//Nahi hai → isLoggedIn = false


  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  px-3">
      {isLoggedIn && (
        <Link className="navbar-brand" to="/">GrowForce</Link>
      )}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Add Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allemps">Show Employees</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
