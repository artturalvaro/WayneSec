"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useAuthRedirect({
  protectedRoute = true,
}: {
  protectedRoute?: boolean;
}): boolean {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = Cookies.get("access_token");

    if (protectedRoute && !access_token) {
      router.replace("/auth");
      return;
    }

    if (!protectedRoute && access_token) {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, [protectedRoute, router]);

  return loading;
}