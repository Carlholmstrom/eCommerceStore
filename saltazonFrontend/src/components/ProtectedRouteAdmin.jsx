import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteAdmin({ isAuthenticated, role }) {
  const hasRequiredRole = role === "admin" || role === "super-admin";
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{hasRequiredRole ? <Outlet /> : <Navigate to="/" />}</>;
}
export default ProtectedRouteAdmin;
