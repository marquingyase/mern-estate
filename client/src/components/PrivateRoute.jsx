import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};
