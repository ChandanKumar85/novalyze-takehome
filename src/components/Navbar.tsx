import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../lib/hoc/AppContext";

const Navbar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useContext(AppContext);
  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsAuthenticated(false)
      setIsLoading(false)
    }, 2000);
  }
  return (
    <nav className="items-center flex gap-x-12">
      <Link to="/" className="text-sm/6 font-semibold text-secondary hidden sm:block">
        Home
      </Link>
      <Link to="#" className="text-sm/6 font-semibold text-secondary hidden sm:block">
        Marketplace
      </Link>
      <Link to="#" className="text-sm/6 font-semibold text-secondary hidden sm:block">
        Company
      </Link>
      {!isAuthenticated ? 
        <Link to="/login" className="text-sm/6 font-semibold bg-primary text-white py-2 px-4 mr-5 rounded-lg transition cursor-pointer">
          Log in
        </Link> :
        <button onClick={handleLogout} disabled={isLoading} type="button" className="text-sm/6 font-semibold bg-primary text-white py-2 px-4 mr-5 rounded-lg transition cursor-pointer flex items-center justify-between min-w-[85px] min-h-[40px]">
          {isLoading ? <div className="loader"></div> : "Log Out"}
        </button>
      }
    </nav>
  );
};

export default Navbar;
