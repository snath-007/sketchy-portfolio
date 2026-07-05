import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soumen Nath | Engineering Portfolio",
  description:
    "Engineering work, AI systems, personal lab projects, and essays.",
};

const themeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = stored === "light" || stored === "dark" ? stored : preferred;
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Inline theme script prevents a light/dark flash before hydration. */}
        `n <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
