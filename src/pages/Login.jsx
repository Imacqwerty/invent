import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    /*STEP 2 useState creates email and setEmail function with empty string and then setEmail() UPDATES THE value of the email container */
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // use to navigate to other jsx files via directories
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    {/*STEP 3 Sends the DATA of email and password to the API [LARAVEL]*/}
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Success - save token or user data
      localStorage.setItem('token', data.token);
      console.log('Login successful!');
      // Redirect or update app state

      // ✅ NEW: Redirect to profile page
      navigate('/profile');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  {/*STEP 1 USER ACTIVITY OBTAIN USER INPUT*/}
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Updates email state as user types
            disabled={loading}
            required
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
            
          {loading ? 'Logging in...' : 'Login'} {/*Is loggin in loading? If yes display Logging in if not display Login? */}
        </button>
        <Link to="/">Go to home page</Link>
        <Link to="/signup">Go to signup page</Link>
      <Link to="/profile">Go to profile page</Link>
      </form>
    </div>
  );
}

export default Login;