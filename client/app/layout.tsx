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
    <html lang="en" className="bg-base-200/40" suppressHydrationWarning>
      <body>
        {/* Theme provider for next-themes */}
        <Providers>
          <AuthContext>{children}</AuthContext>
        </Providers>
      </body>
    </html>
  );
}
