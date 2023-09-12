import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
