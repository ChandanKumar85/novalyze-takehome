import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SVGIcon from "../lib/utils/SVGIcon";
import { UserFormData } from "../lib/types/interfaces";
import { useTheme } from "../lib/hoc/AppContext";
import Toast from "../components/Toast";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  // regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        return value.trim() ? "" : `First name is required`;
      case "lastName":
        return value.trim() ? "" : `Last name is required`;
      case "email":
        return !value ? "Email is required" : !emailRegex.test(value) ? "Please enter a valid email address" : "";
      case "phone":
        return !value ? "Phone number is required" : !phoneRegex.test(value) ? "Please enter a valid phone number" : "";
      case "password":
        return !value ? "Password is required" : value.length < 8 ? "Password must be at least 8 characters" : "";
      case "confirmPassword":
        return !value ? "Please confirm your password" : value !== formData.password ? "Passwords do not match" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors: Partial<UserFormData> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof UserFormData]);
      if (error) newErrors[key as keyof UserFormData] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    new Promise((resolve)=>{
      // Assuming we are calling API that will be take two seconds 
      setTimeout(() => {
        resolve(true)
      }, 2000);
    }).then(()=>{
      setMessage("Account created successfully.")
      setIsMessage(true)
      setIsLoading(false);
      // Redirection after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    })
  };

  return (
    <>
    <Toast message={message} isVisible={isMessage} />
    <div className="flex items-center justify-center login-form-container p-4">
      <div className={`login-card rounded-2xl shadow-xl w-full max-w-md p-8 ${theme === 'dark' ? 'shadow-gray-700' : 'shadow-gray-200'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create User</h1>
          <p className="login-label mt-2">
            Fill in your details to get started
          </p>
        </div>

        {errors.general && (
          <div className={`mb-4 p-3 ${theme === 'dark' ? 'bg-red-900 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-600'} border rounded-lg`}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium login-label">
              First Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute svg-normal left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="user_icon" size={16} />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.firstName ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="John"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium login-label">
              Last Name
            </label>
            <div className="mt-1 relative">
              <div className="absolute svg-normal left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="user_icon" size={16} />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.lastName ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

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
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.email ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="john.doe@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium login-label">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <div className="absolute grayIcon left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="phone_icon" size={20} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.phone ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="+91 555 5555 555"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.password ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium login-label">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute svg-normal left-3 top-4 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <SVGIcon name="password_icon" size={12} />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`login-input pl-10 w-full px-4 py-2 border ${
                  errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : ""
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-button w-full py-2 px-4 rounded-lg transition duration-200 cursor-pointer disabled:opacity-70 min-h-[45px]"
            disabled={isLoading}
          >
            {isLoading ? <div className="loader"></div> : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to={"/login"}
            className="login-link-primary hover:text-indigo-800 font-medium"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignupForm;