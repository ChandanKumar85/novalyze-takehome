import React, { useState } from "react";
import { Link } from "react-router-dom";
import SVGIcon from "../lib/utils/SVGIcon";
import { LoginForm } from "../lib/types/interfaces";
import { useTheme } from "../lib/hoc/AppContext";

const Login: React.FC<LoginForm> = ({ onLogin }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
  
    if (name === "email") {
      if (!value) {
        errorMessage = "Email is required";
      } else if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address";
      }
    }
    if(name === "password"){
      if (!value) {
        errorMessage = "Password is required";
      } else if (value.length < 8) {
        errorMessage = "Password must be at least 8 characters";
      } 
    }
    
    return errorMessage;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) acc[key as keyof typeof formData] = error;
      return acc;
    }, {} as typeof errors);
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onLogin(formData.email, formData.password);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center login-form-container p-4">
      <div
        className={`login-card rounded-2xl shadow-xl w-full max-w-md p-8 ${
          theme === "dark" ? "shadow-gray-700" : "shadow-gray-200"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="login-label mt-2">Please sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium login-label">
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute svg-normal left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="email_icon" size={16} />
              </div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.email ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium login-label">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute svg-normal left-3 top-4 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="password_icon" size={12} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.password ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-button w-full py-2 px-4 rounded-lg transition duration-200 cursor-pointer disabled:opacity-70 min-h-[45px]"
            disabled={isLoading}
          >
            {isLoading ? <div className="loader"></div> : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 login-divider">Sign in with SSO</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className={`w-full cursor-pointer flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50 ${
                theme === "dark"
                  ? "hover:bg-gray-700 border-gray-600"
                  : "hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="ml-2">Google</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex text-center justify-between">
          <Link to={"/"} className="block login-link hover:text-gray-800">
            Change password?
          </Link>
          <Link
            to={"/signup"}
            className="login-link-primary hover:text-indigo-800 font-medium"
          >
            Create a new user
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
