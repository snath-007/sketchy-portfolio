import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soumen Nath | Engineering Portfolio",
  description:
    "Engineering work, AI systems, personal lab projects, and essays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
