import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function SuccessStepForm() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 6000);
  }, []);
  return (
    <>
      <div>Registration completed!</div>
      <div>A verification link will be sent to email. Please verify!</div>
    </>
  );
}
