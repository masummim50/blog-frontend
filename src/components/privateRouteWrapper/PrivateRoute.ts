import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = useAuthStore((state) => state.auth.id);
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = React.useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
    } else {
      setAuthenticated(true);
    }
  }, [userId, navigate]);

  return authenticated ? children : null;
};

export default PrivateRoute;
