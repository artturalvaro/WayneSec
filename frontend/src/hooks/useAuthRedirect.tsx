
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface UserPayload {
  username: string;
  email: string;
  role: string;
  exp: number;
}

export default function useAuthRedirect(protectedRoute: boolean = true) {
  const router = useRouter();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  function isTokenValidLocally(token: string): boolean {
    try {
      const decoded: UserPayload = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  async function validateToken(token: string) {
    try {
      const res = await axios.get('http://localhost:8000/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const token = Cookies.get('access_token');

    if (!token || !isTokenValidLocally(token)) {
      if (protectedRoute) router.replace('/auth');
      setLoading(false);
      return;
    }

    validateToken(token).then((data) => {
      if (!data) {
        Cookies.remove('access_token');
        if (protectedRoute) router.replace('/auth');
      } else {
        setUser(data);
        if (!protectedRoute) router.replace('/');
      }
      setLoading(false);
    });
  }, [protectedRoute, router]);

  return { user, loading };
}