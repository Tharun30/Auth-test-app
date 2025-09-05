import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from "axios";

export const CustomClaimsComponent = (props) => {
  const config = getConfig();
  
  // Get stored token data
  const obj = localStorage.getItem(
    `@@auth0spajs@@::${config.clientId}::https://api.mcafee.com::openid profile email offline_access`
  );
  
  const { Subscription = [] } = props;
  const [selectedValue] = useState(Object.keys(Subscription)[0]);
  const jObj = obj ? JSON.parse(obj) : null;
  const ref_token = jObj?.body?.refresh_token;
  
  // State management
  const [subrefValue, setSubrefValue] = useState("");
  const [idTokenClaims, setIdTokenClaims] = useState(null);
  const [accessTokenClaims, setAccessTokenClaims] = useState(null);
  const [error, setError] = useState(null);
  
  // Auth0 hooks
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  // Get ID token claims on component mount
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const claims = await getIdTokenClaims();
        setIdTokenClaims(claims);
        
        const accessToken = await getAccessTokenSilently();
        // Decode access token (basic decode for display)
        try {
          const tokenParts = accessToken.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          setAccessTokenClaims(payload);
        } catch (decodeError) {
          console.log('Could not decode access token:', decodeError);
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
        setError(error.message);
      }
    };

    fetchClaims();
  }, [getIdTokenClaims, getAccessTokenSilently, setError]);

  // const handleConsent = async () => {
  //   try {
  //     await getAccessTokenWithPopup();
  //     setState({
  //       ...state,
  //       error: null,
  //     });
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: error.error,
  //     });
  //   }

  //   await callApi();
  // };

  // const handleLoginAgain = async () => {
  //   try {
  //     await loginWithPopup();
  //     setState({
  //       ...state,
  //       error: null,
  //     });
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: error.error,
  //     });
  //   }

  //   await callApi();
  // };

  const getToken = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: config.clientId,
      grant_type: "refresh_token",
      refresh_token: ref_token,
      subrefid: Subscription[selectedValue],
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post(
        `https://${config.domain}/oauth/token`,
        data,
        {
          headers: optionsLogin,
        }
      );
      console.log(token.data.access_token);
      //   setFinalTextBox(token.data.access_token);
      //   setAnchor(`https://jwt.io/#access_token=${token.data.access_token}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mcafee-page-container">
      <div className="mcafee-page-header">
        <h1 className="mcafee-page-title">
          <FontAwesomeIcon icon="cogs" className="mcafee-page-icon" />
          Custom Claims
        </h1>
        <p className="mcafee-page-subtitle">View token claims and manage custom authentication data</p>
      </div>

      <div className="mcafee-claims-section">
        {/* ID Token Claims */}
        {idTokenClaims && (
          <div className="mcafee-claims-card">
            <h3 className="mcafee-section-title">
              <FontAwesomeIcon icon="id-card" />
              ID Token Claims
            </h3>
            <Highlight>
              <span>{JSON.stringify(idTokenClaims, null, 2)}</span>
            </Highlight>
          </div>
        )}

        {/* Access Token Claims */}
        {accessTokenClaims && (
          <div className="mcafee-claims-card">
            <h3 className="mcafee-section-title">
              <FontAwesomeIcon icon="key" />
              Access Token Claims
            </h3>
            <Highlight>
              <span>{JSON.stringify(accessTokenClaims, null, 2)}</span>
            </Highlight>
          </div>
        )}

        {/* Token Refresh Section */}
        <div className="mcafee-claims-card">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="refresh" />
            Token Refresh
          </h3>
          
          <div className="mcafee-input-group">
            <label className="mcafee-input-label">
              <FontAwesomeIcon icon="key" />
              subrefid value
            </label>
            <input
              type="text"
              className="mcafee-input"
              placeholder="Enter subrefid value..."
              value={subrefValue}
              onChange={(e) => setSubrefValue(e.target.value)}
            />
          </div>

          <div className="mcafee-button-group">
            <button
              className="mcafee-button mcafee-button-primary"
              onClick={(e) => getToken(e)}
            >
              <FontAwesomeIcon icon="sync-alt" />
              Refresh Token
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mcafee-claims-card">
            <h3 className="mcafee-section-title">
              <FontAwesomeIcon icon="exclamation-circle" />
              Error
            </h3>
            <div className="mcafee-error-message">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuthenticationRequired(CustomClaimsComponent, {
  onRedirecting: () => <Loading />,
});
