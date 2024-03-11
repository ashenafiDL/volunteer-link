import type { Metadata } from "next";
import "./globals.css";
import AuthContext from "./lib/contexts/AppContext";

export const metadata: Metadata = {
  title: "VolunteerLink",
  description: "Empowering communities thorough volunteering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-200 text-text-100">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
