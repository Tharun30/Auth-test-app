import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const [subrefValue, setSubrefValue] = useState("");
  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const callMFAApi = async () => {
    console.log(subrefValue);
    try {
      console.log("D");
      const token = await getAccessTokenSilently({
        subrefid: subrefValue,
        ignoreCache: true,
      });
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };
  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <div className="mcafee-page-container">
      <div className="mcafee-page-header">
        <h1 className="mcafee-page-title">
          <FontAwesomeIcon icon="cloud" className="mcafee-page-icon" />
          External API
        </h1>
        <p className="mcafee-page-subtitle">Test external API calls with your access token</p>
      </div>

      <div className="mcafee-api-section">
        {state.error === "consent_required" && (
          <div className="mcafee-alert mcafee-alert-warning">
            <FontAwesomeIcon icon="exclamation-triangle" />
            <span>
              You need to{" "}
              <button 
                className="mcafee-link-button"
                onClick={(e) => handle(e, handleConsent)}
              >
                consent to get access to users api
              </button>
            </span>
          </div>
        )}

        {state.error === "login_required" && (
          <div className="mcafee-alert mcafee-alert-warning">
            <FontAwesomeIcon icon="exclamation-triangle" />
            <span>
              You need to{" "}
              <button 
                className="mcafee-link-button"
                onClick={(e) => handle(e, handleLoginAgain)}
              >
                log in again
              </button>
            </span>
          </div>
        )}

        {!audience && (
          <div className="mcafee-alert mcafee-alert-info">
            <FontAwesomeIcon icon="info-circle" />
            <div>
              <p><strong>Audience Configuration Required</strong></p>
              <p>
                You need to configure the <code>audience</code> to call the API. Find
                out more information on{" "}
                <a href="https://auth0.com/docs/api" target="_blank" rel="noopener noreferrer">
                  setting up APIs
                </a>{" "}
                in the Auth0 Docs.
              </p>
              <p>
                The audience is the identifier of the API that you want to call.
              </p>
            </div>
          </div>
        )}

        <div className="mcafee-api-controls">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="terminal" />
            API Testing
          </h3>
          
          <div className="mcafee-input-group">
            <label className="mcafee-input-label">
              <FontAwesomeIcon icon="key" />
              Subref Value (Optional)
            </label>
            <input
              type="text"
              className="mcafee-input"
              placeholder="Enter subref value..."
              value={subrefValue}
              onChange={(e) => setSubrefValue(e.target.value)}
            />
          </div>

          <div className="mcafee-button-group">
            <button
              className="mcafee-button mcafee-button-primary"
              onClick={callApi}
              disabled={!audience}
            >
              <FontAwesomeIcon icon="play" />
              Call API
            </button>
            
            <button
              className="mcafee-button mcafee-button-secondary"
              onClick={callMFAApi}
              disabled={!audience}
            >
              <FontAwesomeIcon icon="shield-alt" />
              Call MFA API
            </button>
          </div>
        </div>

        {state.showResult && (
          <div className="mcafee-api-result">
            <h3 className="mcafee-section-title">
              <FontAwesomeIcon icon="check-circle" />
              API Response
            </h3>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}

        {state.error && state.error !== "consent_required" && state.error !== "login_required" && (
          <div className="mcafee-api-result mcafee-api-error">
            <h3 className="mcafee-section-title">
              <FontAwesomeIcon icon="exclamation-circle" />
              Error
            </h3>
            <div className="mcafee-error-message">
              {state.error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
