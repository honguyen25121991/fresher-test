import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
  const { children } = props;

  if (user && !user.auth) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>You don't have permission to access this route</p>
      </Alert>
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
