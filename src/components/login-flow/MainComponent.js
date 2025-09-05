import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../../config";

const config = getConfig();

function MainComponent(props) {
  // const { setSubscription } = props;
  const [displayDelete] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  // const history = useHistory();
  // const getParse = (e) => {
  //   if (e.target.id === "AccessTokenParse") {
  //     history.push("/parseLoginAccessToken");
  //   } else if (e.target.id === "IdTokenParse") {
  //     history.push("/parseLoginIdToken");
  //   } else if (e.target.id === "refresh") {
  //     history.push("/parseRefreshToken");
  //   }
  // };

  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  console.log(user);
  let result;
  console.log(isEnrolled, "mfa");
  useEffect(() => {
    const onPageLoadGet = async () => {
      if (user) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        result = user.sub.slice(6);
        const token = await getAccessTokenSilently();
        console.log(token);

        const optionsConn = {
          method: "GET",
          url: `https://${config.domain}/mfa/authenticators`,
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        };

        const respCon = await axios.request(optionsConn);
        console.log(respCon, "res");
        if (respCon.data && respCon.data.length > 0) {
          setIsEnrolled(false);
        } else {
          console.log("bye");
          setIsEnrolled(true);
        }
      }
    };
    onPageLoadGet();
  }, []);

  console.log(result);
  // const getSubs = async (e) => {
  //   e.preventDefault();

  //   //console.log("get-otp", detailsState);
  //   const optionsLogin = {
  //     "content-type": "application/json",
  //     cd: "e8ed6c5f2bb44875abc220cb07c27898-f4922599d076",
  //     st: 3,
  //     sv: "V1",
  //     ak: "839B7212425445D1A1113E42708908C5PPS",
  //   };
  //   const jsonBody = {
  //     app_id: "f989723c-3e01-4328-8424-740383c26c11",
  //     type: "ByGlobalRef",
  //     Global_Reference_Id: result,
  //     Include_All_Subs: true,
  //   };
  //   //const data = new URLSearchParams(jsonBody).toString();
  //   try {
  //     const token = await axios.post(
  //       "v2/ProductProvision/GetSubscriptions",
  //       jsonBody,
  //       {
  //         headers: optionsLogin,
  //       }
  //     );
  //     const provisionList = token?.data?.provision_list;
  //     const FinalList = provisionList.reduce((result, item) => {
  //       return { ...result, [item.pkg_name]: item?.provision_id };
  //     }, {});
  //     setSubscription(FinalList);
  //     console.log(FinalList);
  //     history.push("/parseSubscription");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const mfaUL = async (e) => {
    try {
      console.log("Enrolling MFA via UL...");

      const options = {
        redirect_uri: window.location.origin,
        culture: localStorage.getItem("culture") || "en-us",
        //audience: "https://mudit-dev.us.auth0.com/mfa/",
        //scope: "enroll read:authenticators remove:authenticators",
        acr_values:
          "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
        //acr_values:"multi-factor"
      };

      await loginWithRedirect(options);
    } catch (err) {
      console.log("Enroll MFA via UL failed", err);
    }
  };
  const disableMFA = async (e) => {
    try {
      console.log("disabling MFA via api...");

      const token = await getAccessTokenSilently();
      console.log(token);

      const optionsConn = {
        method: "GET",
        url: `https://${config.domain}/mfa/authenticators`,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + token,
        },
      };

      const respCon = await axios.request(optionsConn);
      console.log(respCon);
      var toDelete;
      if (respCon.data && respCon.data.length > 0) {
        toDelete = respCon.data[0];
        const id = toDelete.id;

        const optionsDel = {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        };

        const respDel = await axios.delete(
          `https://${config.domain}/mfa/authenticators/${id}`,
          optionsDel
        );
        if (respDel.status === 204) {
          console.log("disabled");
          setIsEnrolled(true);
          alert("disabled MFA");
        }
      }
    } catch (err) {
      console.log("Enroll MFA via UL failed", err);
    }
  };
  return (
    <div className="mcafee-page-container">
      <div className="mcafee-page-header">
        <h1 className="mcafee-page-title">
          <FontAwesomeIcon icon="shield-alt" className="mcafee-page-icon" />
          Multi-Factor Authentication
        </h1>
        <p className="mcafee-page-subtitle">Manage your two-factor authentication settings</p>
      </div>

      <div className="mcafee-mfa-section">
        <div className="mcafee-mfa-card">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="info-circle" />
            MFA Status
          </h3>
          
          <div className={`mcafee-mfa-status ${isEnrolled ? 'mcafee-mfa-not-enrolled' : 'mcafee-mfa-enrolled'}`}>
            <FontAwesomeIcon icon={isEnrolled ? "exclamation-triangle" : "check-circle"} />
            <span>
              {isEnrolled ? "MFA is not enrolled" : "MFA is enrolled and active"}
            </span>
          </div>

          <div className="mcafee-button-group">
            {isEnrolled ? (
              <button
                className="mcafee-button mcafee-button-primary"
                onClick={(e) => mfaUL(e)}
              >
                <FontAwesomeIcon icon="shield-alt" />
                Enroll 2FA
              </button>
            ) : (
              <button
                className="mcafee-button mcafee-button-secondary"
                onClick={(e) => disableMFA(e)}
                style={{ 
                  background: '#ef4444', 
                  color: 'white',
                  borderColor: '#ef4444'
                }}
              >
                <FontAwesomeIcon icon="shield-alt" />
                Disable MFA
              </button>
            )}
          </div>
        </div>

        <div className="mcafee-mfa-card">
          <h3 className="mcafee-section-title">
            <FontAwesomeIcon icon="key" />
            Token Information
          </h3>
          
          <div className="mcafee-input-group">
            <label className="mcafee-input-label">
              <FontAwesomeIcon icon="unlock-alt" />
              Access Token
            </label>
            <textarea
              className="mcafee-input"
              rows="4"
              readOnly
              value={props?.response?.AccessToken || 'No access token available'}
            />
          </div>

          <div className="mcafee-input-group">
            <label className="mcafee-input-label">
              <FontAwesomeIcon icon="id-card" />
              ID Token
            </label>
            <textarea
              className="mcafee-input"
              rows="4"
              readOnly
              value={props?.response?.IdToken || 'No ID token available'}
            />
          </div>
        </div>

        {displayDelete && (
          <div className="mcafee-alert mcafee-alert-success">
            <FontAwesomeIcon icon="check-circle" />
            <span>You have successfully deleted MFA</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
