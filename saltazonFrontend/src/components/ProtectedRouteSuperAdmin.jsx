import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteSuperAdmin({ isAuthenticated, role }) {
  const hasRequiredRole = role === "super-admin";
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{hasRequiredRole ? <Outlet /> : <Navigate to="/" />}</>;
}
export default ProtectedRouteSuperAdmin;
