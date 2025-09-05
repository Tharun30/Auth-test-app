import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();
  console.log("user--->", user);

  return (
    <div className="mcafee-page-container">
      <div className="mcafee-page-header">
        <h1 className="mcafee-page-title">
          <FontAwesomeIcon icon="user" className="mcafee-page-icon" />
          User Profile
        </h1>
        <p className="mcafee-page-subtitle">View your account information and user details</p>
      </div>

      <div className="mcafee-profile-section">
        <div className="mcafee-profile-card">
          <div className="mcafee-profile-header">
            <div className="mcafee-profile-avatar">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="mcafee-profile-image"
                />
              ) : (
                <div className="mcafee-profile-placeholder">
                  <FontAwesomeIcon icon="user" />
                </div>
              )}
            </div>
            <div className="mcafee-profile-info">
              <h2 className="mcafee-profile-name">{user.name || 'No Name'}</h2>
              <p className="mcafee-profile-email">{user.email}</p>
              <div className="mcafee-profile-status">
                <span className="mcafee-status-badge mcafee-status-verified">
                  <FontAwesomeIcon icon="check-circle" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mcafee-profile-details">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="info-circle" />
            User Details
          </h3>
          <div className="mcafee-detail-grid">
            <div className="mcafee-detail-item">
              <label>User ID:</label>
              <span>{user.sub}</span>
            </div>
            <div className="mcafee-detail-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="mcafee-detail-item">
              <label>Email Verified:</label>
              <span className={user.email_verified ? 'mcafee-status-success' : 'mcafee-status-warning'}>
                <FontAwesomeIcon icon={user.email_verified ? "check-circle" : "exclamation-triangle"} />
                {user.email_verified ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="mcafee-detail-item">
              <label>Last Updated:</label>
              <span>{user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Unknown'}</span>
            </div>
          </div>
        </div>

        <div className="mcafee-raw-data-section">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="code" />
            Raw User Data
          </h3>
          <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
