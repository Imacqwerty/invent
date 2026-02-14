import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// STEP 1: Component loads
function Delete() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // STEP 2: Handle account deletion with password confirmation
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    
    // STEP 3: Final confirmation before deleting
    const confirmDelete = window.confirm(
      'Are you absolutely sure? This will permanently delete your account and all data!'
    );

    if (!confirmDelete) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // STEP 4: Get token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      // STEP 5: Send DELETE request with password for extra security
      const response = await fetch('http://localhost:8000/api/profile/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password }) // Require password to delete
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete account');
      }

      // STEP 6: Clear token and redirect
      localStorage.removeItem('token');
      alert('Account deleted successfully!');
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 7: Render delete confirmation page
  return (
    <div>
      <h1>Delete Account</h1>
      <p style={{color: 'red'}}>⚠️ Warning: This action is permanent and cannot be undone!</p>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleDeleteAccount}>
        <div>
          <label>Confirm your password to delete account:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          {loading ? 'Deleting...' : 'Delete My Account'}
        </button>

        <div>
          <Link to="/profile">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Delete;