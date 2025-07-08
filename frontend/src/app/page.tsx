"use client";

import "@/styles/globals.css"
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function Home() {
  const loading = useAuthRedirect({ protectedRoute: true });

  if (loading) {
    return <div className="p-4 text-center">Carregando segurança... 🛡️</div>;
  }
  
  return (
    <div>
      <h1>Voce esta logado</h1>
    </div>
  );
}