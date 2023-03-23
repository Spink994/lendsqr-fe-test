import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function PageNotFound({}: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Work sans",
        fontWeight: "700",
      }}
    >
      No Content
      <button
        style={{
          fontFamily: "Work sans",
          fontWeight: "700",
          marginLeft: "20px",
          fontSize: "16px",
          textDecoration: "underline",
        }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
