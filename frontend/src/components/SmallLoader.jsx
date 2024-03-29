// Parent Component => Homepage
import React from "react";
import { Spinner } from "react-bootstrap";

const SmallLoader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "20px",
        height: "20px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading.....</span>
    </Spinner>
  );
};

export default SmallLoader;
