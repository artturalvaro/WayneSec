import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WayneSec | Sistema de Segurança",
  description: "Plataforma full stack de gerenciamento de segurança das Indústrias Wayne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
