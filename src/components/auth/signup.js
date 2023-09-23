import React, { useState } from 'react';
import request from 'superagent';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './signup.scss';


function Signup() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request
        .post('https://todo-api-l31x.onrender.com/signup')
        .send(formData);

      console.log('Signup successful', response.body);

      navigate('/'); 

    } catch (error) {
      console.error('Signup error', error.response ? error.response.body : error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="signup-button">
              Signup
            </button>
          </div>
        </form>
        <button onClick={() => navigate('/')} className="back-to-login">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
