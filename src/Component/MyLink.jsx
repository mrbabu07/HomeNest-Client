// MyLink.jsx
import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "text-blue-600 " + className : className)}
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
