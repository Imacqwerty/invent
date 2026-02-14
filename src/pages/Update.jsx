import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// STEP 1: Component loads with all state variables initialized
function Update() {
  const navigate = useNavigate();
  
  // State for form inputs (pre-filled with current data)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  
  // State for new image upload
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // STEP 2: useEffect runs once when component mounts and calls fetchCurrentProfile()
  useEffect(() => {
    fetchCurrentProfile();
  }, []); // Empty array = run only once when page loads

  // STEP 3: Fetch current user data from database to pre-fill the form
  const fetchCurrentProfile = async () => {
    try {
      // STEP 4: Get token from localStorage (user must be logged in)
      const token = localStorage.getItem('token');

      if (!token) {
        // No token? Redirect to login
        navigate('/login');
        return;
      }

      // STEP 5: Send GET request to API with token to fetch current user data
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Prove user identity
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      // STEP 6: Pre-fill form inputs with current data from database
      setName(data.user.name);
      setEmail(data.user.email);
      setCurrentImage(data.user.image);

    } catch (err) {
      setError(err.message);
    }
  };

  // STEP 7: Handle when user selects a new image file
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    
    if (file) {
      setNewImage(file); // Store file for upload
      
      // STEP 8: Create preview URL to show image before uploading
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // STEP 9: Handle form submission when user clicks "Update Profile"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      // STEP 10: Create FormData to send both text (name, email) and file (image) together
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      
      // Only add image if user selected a new one
      if (newImage) {
        formData.append('image', newImage);
      }

      // STEP 11: Send POST request to API with updated data
      const response = await fetch('http://localhost:8000/api/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // DON'T set Content-Type - browser sets it automatically for FormData
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      // STEP 12: Show success message after API confirms update
      setSuccess('Profile updated successfully!');
      
      // STEP 13: Redirect to profile page after 2 seconds to see updated info
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 14: Render the update form
  return (
    <div>
      <h1>Update Profile</h1>
      <div className={style.linkstyle}><Link to="/profile">Profile</Link></div>

      {/* Show error or success messages */}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}

      <form onSubmit={handleSubmit}>
        
        {/* STEP 15: Display current profile image */}
        <div>
          <label>Current Profile Image:</label>
          {currentImage && (
            <img 
              src={`http://localhost:8000/storage/${currentImage}`}
              alt="Current profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'block' }}
            />
          )}
        </div>

        {/* STEP 16: File input to upload new image */}
        <div>
          <label>Upload New Image:</label>
          <input
            type="file"
            accept="image/*" // Only allow image files
            onChange={handleImageChange} // Triggers when user selects file
            disabled={loading}
          />
          
          {/* STEP 17: Show preview of new image before uploading */}
          {imagePreview && (
            <div>
              <p>Preview:</p>
              <img 
                src={imagePreview}
                alt="New profile preview"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            </div>
          )}
        </div>

        {/* STEP 18: Text input for name (pre-filled with current name) */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name} // Shows current name from database
            onChange={(e) => setName(e.target.value)} // Updates when user types
            disabled={loading}
            required
          />
        </div>

        {/* STEP 19: Text input for email (pre-filled with current email) */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email} // Shows current email from database
            onChange={(e) => setEmail(e.target.value)} // Updates when user types
            disabled={loading}
            required
          />
        </div>

        {/* STEP 20: Submit button to update profile */}
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>

        <div>
          <Link to="/profile">Back to Profile</Link>
        </div>
      </form>
    </div>
  );
}

export default Update;