import React from "react";
import Logo from "../img/logo.png";
import { useTheme } from "../lib/hoc/AppContext";
import SVGIcon from "../lib/utils/SVGIcon";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-black"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex">
          <Link to={'/'} className="">
            <span className="sr-only">Your Company</span>
            <img alt="Novalyze logo" src={Logo} className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:flex lg:flex-1 lg:justify-end">
          <Navbar />
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            type="button"
            className={`rounded-full cursor-pointer ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-neutral-800 text-neutral-200"
            }`}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            <span className="group inline-flex shrink-0 justify-center items-center size-9">
              {theme === "light" ? (
                <SVGIcon name="light_mode_icon" size={16} />
              ) : (
                <SVGIcon name="dark_mode_icon" size={16} />
              )}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
