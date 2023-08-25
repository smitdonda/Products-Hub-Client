import React from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../../config/cookieStorage";
import Header from "../pages/Header";

function MainLayout({ children }) {
  const isSignedIn = getItem("token");
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
    </div>
  );
}
export default MainLayout;
