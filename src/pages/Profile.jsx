import { useState, useEffect } from 'react';

    // STEP 1 It loads all components
function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // STEP 2 useEffect runs and calls the fetchUserProfile() 
  // Fetch user data when component loads
  useEffect(() => {
    fetchUserProfile();
  }, []); // Empty array means run once when component mounts

  // STEP 4 IT checks for tokens from the localStorage specifically it checks for tokens if there is no token then login is required
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found. Please login.');
      }
      // STEP 5 SENDS GET Request to the API [LARAVEL]
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send token for authentication, Send token to prove identity
        }
      });

//        // HANDLE ACCOUNT DELETION
//   const handleDeleteAccount = async () => {
//     // STEP 1: Confirm with user before deleting (important safety step!)
//     const confirmDelete = window.confirm(
//       'Are you sure you want to delete your account? This action cannot be undone!'
//     );

//     if (!confirmDelete) {
//       return; // User clicked "Cancel", stop here
//     }

//     setDeleting(true);
//     setError('');

//     try {
//       // STEP 2: Get token from localStorage
//       const token = localStorage.getItem('token');

//       if (!token) {
//         throw new Error('No token found. Please login.');
//       }

//       // STEP 3: Send DELETE request to API
//       const response = await fetch('http://localhost:8000/api/profile/delete', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Prove identity
//         }
//       });

        // STEP 6 After API LARAVEL validated if the user exist and if the token is valid. It will set the data obtained from the database to the storage setUser(data.user). If not valid it will throw an error
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setUser(data.user); // Store user data

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // STEP 3 After fetching the User Profile it will output this Loading profile text
  // Show loading state
  if (loading) {
    return <div>Loading profile...</div>;
  }

  // Show error state
  if (error) {
    return <div style={{color: 'red'}}>Error: {error}</div>;
  }

  // Show profile
  return (
    <div>
      <h1>Profile</h1>
      {/* STEP 7 here it shows the information obtained from database thru api */}
      {user && (
        <div>
          {/* Display profile image */}
          {user.image && (
            <img 
              src={`http://localhost:8000/storage/${user.image}`} 
              alt={user.name}
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          )}
          
          {/* Display name */}
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>

          {/* ✅ Add Edit button */}
          <Link to="/update">
            <button>Edit Profile</button>
          </Link>

          {/* Delete Account button */}
            <button 
              onClick={handleDeleteAccount}
              disabled={deleting}
              style={{ 
                backgroundColor: 'red', 
                color: 'white', 
                marginLeft: '10px' 
              }}
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
        </div>
      )}
    </div>
  );
}

export default Profile;