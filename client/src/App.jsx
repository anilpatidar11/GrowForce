import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllEmps from "./pages/AllEmps";
import CreateEmp from "./pages/CreateEmp"; // Reused for both create & edit
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Contact from "./pages/Contact";

import "./App.css";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEmp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/allemps"
            element={
              <ProtectedRoute>
                <AllEmps />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addemp"
            element={
              <ProtectedRoute>
                <CreateEmp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
