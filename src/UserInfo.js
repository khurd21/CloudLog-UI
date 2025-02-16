import React, { useState } from 'react';

import './UserInfo.css';

const UserInfo = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.FirstName || 'Kyle',
    lastName: user?.LastName || 'Hurd',
    uspaMembershipNumber: user?.USPAMembershipNumber || '123456789',
    uspaLicenseNumber: user?.USPALicenseNumber || 'C-48149',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="user-info">
      {isEditing ? (
        <form>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>USPA Membership Number:</label>
            <input
              type="number"
              name="uspaMembershipNumber"
              value={formData.uspaMembershipNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>USPA License Number:</label>
            <input
              type="text"
              name="uspaLicenseNumber"
              value={formData.uspaLicenseNumber}
              onChange={handleChange}
              pattern="^[A-D]-\d+$"
              title="Must be in the format A-123456, B-123456, C-123456, or D-123456"
            />
          </div>
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>USPA Membership Number:</strong> {formData.uspaMembershipNumber}</p>
          <p><strong>USPA License Number:</strong> {formData.uspaLicenseNumber}</p>
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;