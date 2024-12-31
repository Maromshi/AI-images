import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { logo } from "../assets";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // from ContextApi
  const navigate = useNavigate();

  // Logout user
  const handleLogout = () => {
    logout(); // activate logut function
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <div className="flex gap-4">
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="font-inter font-medium bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
