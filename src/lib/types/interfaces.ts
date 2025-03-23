import { JSX } from "react";

// Login component interfaces
export interface LoginForm {
  onLogin: (email: string, password: string) => void;
}

// NewUserPage interfaces
export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// PdfViewer interfaces
export interface PdfData {
  url: string;
  title: string;
}

// SvgIconProps interfaces
export interface SvgIconProps {
  name: string;
  size?: number;
  className?: string;
}

// RouteProps interfaces
export interface RouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
  redirectTo: string;
}

// ToastType interfaces
export interface ToastType {
  message: string;
  isVisible: boolean; 
}