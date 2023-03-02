import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setIsAuthenticated(true);
      setRole(
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
    }
  }, []);

  return { isAuthenticated, role };
}

export default useAuth;
