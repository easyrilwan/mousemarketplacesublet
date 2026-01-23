import { Navigate, Outlet } from "react-router-dom";

import Spinner from "../components/Spinner";
import useAuthStatus from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="absolute flex size-full h-screen items-center justify-center bg-black/20">
        <Spinner />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
