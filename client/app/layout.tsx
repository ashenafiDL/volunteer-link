import type { Metadata } from "next";
import Providers from "./Providers";
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
    <html lang="en" suppressHydrationWarning>
      <body className="dark-theme bg-bg-200 text-text-100">
        <Providers>
          <AuthContext>
            {/* Theme provider for next-themes */}
            {children}
          </AuthContext>
        </Providers>
      </body>
    </html>
  );
}
