import React from 'react';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(8px)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
  
      <div style={backgroundStyle}></div>

     
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '500px', width: '100%', backdropFilter: 'blur(0px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <h2 className="mb-3 text-primary">Welcome to <span className="fw-bold">GrowForce</span></h2>
          <p className="text-muted">
            Your trusted Employee Management Portal. <br />
            Use the navigation bar to <strong>Add</strong>, <strong>View</strong>, or <strong>Manage Employees</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
