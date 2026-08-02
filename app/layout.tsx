import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import JsonLd from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: `${siteName} Portfolio`,
  authors: [{ name: siteName, url: absoluteUrl("/about") }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  keywords: [
    "Soumen Nath",
    "software engineer",
    "AI engineer",
    "full-stack engineer",
    "agentic AI",
    "LangGraph",
    "RAG systems",
    "data platforms",
    "engineering portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: absoluteUrl("/"),
  email: "mailto:soumen.nath119@gmail.com",
  jobTitle: "Software Engineer",
  sameAs: ["https://github.com/snath-007"],
  knowsAbout: [
    "Software engineering",
    "Artificial intelligence",
    "Agentic AI systems",
    "Retrieval-augmented generation",
    "Full-stack development",
    "Data platforms",
  ],
};

const themeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={personSchema} />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
