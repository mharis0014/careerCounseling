import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuthStatus } from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [myStatus, setMyStatus] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const answer = checkAuthStatus();
  answer.then(function (result) {
    setMyStatus(result);
    setIsLoading(false);
  });
  if (isloading) {
    return <div>Authenticating</div>;
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (myStatus) {
            console.log("Authentication Success");
            return <Component {...props} />;
          } else {
            console.log("Authentication Failed");
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    );
  }
};
