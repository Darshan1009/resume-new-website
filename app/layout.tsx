import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darshan Shinde — SOC Analyst & Web App Pentester",
  description:
    "Portfolio of Darshan Shinde — SOC Analyst & Aspiring Web-Application Pentester. SIEM, EDR, threat detection, VAPT.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='38' fill='%23c2a4ff'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
