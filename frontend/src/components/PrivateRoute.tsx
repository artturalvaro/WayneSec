"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const access_token = localStorage.getItem("access_token")

  useEffect(() => {
    if (!access_token) {
      redirect("/auth");
    }
  }, []);

  if (!access_token) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;