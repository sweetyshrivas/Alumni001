import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // Ensure this path matches your project structure

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: ''
  });
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your API endpoint
        setUser(response.data);
        setEditUserData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          profilePicture: response.data.profilePicture || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditUserData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      profilePicture: user?.profilePicture || ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/user', editUserData); // Replace with your API endpoint
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Replace with your API endpoint
      // Redirect or handle logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      await axios.put('/api/user/password', passwordData); // Replace with your API endpoint
      alert('Password updated successfully.');
      setPasswordChangeVisible(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setEditUserData({ ...editUserData, profilePicture: file });
  };

  const uploadProfilePicture = async () => {
    if (!editUserData.profilePicture) return;

    const formData = new FormData();
    formData.append('profilePicture', editUserData.profilePicture);

    try {
      const response = await axios.post('/api/user/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser({ ...user, profilePicture: response.data.profilePicture });
      alert('Profile picture updated successfully.');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile Page</h1>
        {user ? (
          <div className="profile-info">
            <img
              src={user.profilePicture || '/default-profile.png'}
              alt="Profile"
              className="profile-picture"
            />
            {isEditing ? (
              <div className="edit-form">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editUserData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editUserData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={editUserData.phone}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={editUserData.address}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Profile Picture:
                  <input type="file" onChange={handleProfilePictureChange} />
                </label>
                <button onClick={uploadProfilePicture} className="upload-button">
                  Upload Picture
                </button>
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
              </div>
            )}

            {isPasswordChangeVisible ? (
              <div className="password-change">
                <h3>Change Password</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
                <button onClick={handlePasswordChange} className="save-button">Save Password</button>
                <button onClick={() => setPasswordChangeVisible(false)} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setPasswordChangeVisible(true)} className="change-password-button">
                Change Password
              </button>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Additional Sections */}
      <div className="additional-settings">
        <h2>Account Settings</h2>
        {/* Example sections for user preferences and two-factor authentication */}
        <div className="user-preferences">
          <h3>User Preferences</h3>
          <p>Coming soon...</p>
          {/* Here you can add options for changing preferences like theme, notification settings, etc. */}
        </div>
        <div className="two-factor-authentication">
          <h3>Two-Factor Authentication</h3>
          <p>Coming soon...</p>
          {/* Placeholder for future implementation of 2FA settings */}
        </div>
        <div className="activity-logs">
          <h3>Recent Activity</h3>
          <ul>
            <li>Logged in from a new device</li>
            <li>Changed profile picture</li>
            <li>Password updated</li>
            {/* You can populate this list dynamically based on user activity data */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;