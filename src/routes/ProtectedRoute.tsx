import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getSessionStorageItem } from "../utils/Utils";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const token = getSessionStorageItem("token");
  return token ? children : <Navigate to='/login' />;
};
