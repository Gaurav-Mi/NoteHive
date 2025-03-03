import React, { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Authcontext } from "../context/Authcontext";

export default function Alerts() {
  const { alertMessage, alertType, setAlertMessage } = useContext(Authcontext);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, setAlertMessage]);

  return (
    <>
      <div style={{ height: "50px" }}>
        {alertMessage && (
          <Alert variant={alertType} className="text-center text-dark shadow">
            {alertMessage}
          </Alert>
        )}
      </div>
    </>
  );
}
