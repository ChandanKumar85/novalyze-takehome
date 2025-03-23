import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import SignupForm from "../pages/Signup.tsx";
import { RouteProps } from "../lib/types/interfaces.ts";
import { AppContext } from "../lib/hoc/AppContext.tsx";

const ProtectedRoute: React.FC<RouteProps> = ({
  element,
  isAuthenticated,
  redirectTo,
}) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

const PublicRoute: React.FC<RouteProps> = ({
  element,
  isAuthenticated,
  redirectTo,
}) => {
  return !isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

const AppRouter = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(AppContext);

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} isAuthenticated={isAuthenticated} redirectTo="/login" />}/>
      <Route path="/login" element={ <PublicRoute element={<Login onLogin={handleLogin} />} isAuthenticated={isAuthenticated} redirectTo="/" />}/>
      <Route path="/signup" element={ <PublicRoute element={<SignupForm />} isAuthenticated={isAuthenticated} redirectTo="/" />}/>
    </Routes>
  );
};

export default AppRouter;
