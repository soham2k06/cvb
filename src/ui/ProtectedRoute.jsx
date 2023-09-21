import { useUser } from "../features/authentication/useUser";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  console.log(isLoading, isAuthenticated);
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  if (isLoading) return <Spinner />;
  // 3. If there IS a user, render the app
  if (isAuthenticated) {
    navigate("/dashboard");
    return children;
  }
}

export default ProtectedRoute;
