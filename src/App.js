import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import CustomClaims from "./views/customClaims";
import { useAuth0 } from "@auth0/auth0-react";
import MainComponent from "./components/login-flow/MainComponent";
import history from "./utils/history";
import ParseLoginAccessToken from "./components/login-flow/parseAccessToken";
import "./App.css";
import "./styles/mcafee-theme.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/components.css";
import "./styles/pages.css";
import initFontAwesome from "./utils/initFontAwesome";
import OTP from "./components/otp";
import Tokens from "./components/Tokens";
import OTPFill from "./components/OTPFill";
import ID from "./components/ID";
import Access from "./components/Access";
import Refresh from "./components/Refresh";

initFontAwesome();

const App = () => {
  const [detailsState, setDetailsState] = useState({
    email: "",
    otp: "",
    accessToken: "",
    idToken: "",
    refreshToken: "",
  });
  
  const [responseForHomeRoute, setResponse] = useState({
    AccessToken: "",
    IdToken: "",
  });
  
  const { isLoading, error } = useAuth0();
  
  useEffect(() => {
    console.log(responseForHomeRoute);
  }, [responseForHomeRoute]);
  
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Switch>
            {/* Show Home component with customizations at /auth-test-app */}
            <Route path="/auth-test-app" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/custom-claims" component={CustomClaims} />
            <Route path="/main-component">
              <MainComponent response={responseForHomeRoute} />
            </Route>
            <Route path="/otp" exact>
              <OTP
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/verify" exact>
              <OTPFill
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/token" exact>
              <Tokens
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseAccessToken" exact>
              <Access
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseIDToken" exact>
              <ID
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseRefreshToken" exact>
              <Refresh
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseLoginAccessToken" exact>
              <ParseLoginAccessToken
                response={responseForHomeRoute}
                setResponse={setResponse}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
