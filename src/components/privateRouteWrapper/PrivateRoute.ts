// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useBoundStore from "../../zustand/store";

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const userId = useBoundStore((state) => state.auth.id);
//   const navigate = useNavigate();

//   const [authenticated, setAuthenticated] = React.useState(false);

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login", { replace: true });
//     } else {
//       setAuthenticated(true);
//     }
//   }, [userId, navigate]);

//   return authenticated ? children : null;
// };

// export default PrivateRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../zustand/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = useBoundStore((state) => state.auth.id);
  const [authenticating, setAuthenticating] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId: ", userId);
    if (!userId) {
      navigate("/login", { replace: true });
    } else {
      setAuthenticating(false);
    }
  }, [userId, navigate]);

  return authenticating ? null : children;
};

export default PrivateRoute;
