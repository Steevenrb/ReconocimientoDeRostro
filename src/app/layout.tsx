import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
// import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Face Recognition App",
  description:
    "A comprehensive face recognition application with multiple facial analysis features including detection, landmarks, and authentication.",
  keywords: [
    "Face Recognition",
    "Face Detection",
    "Facial Landmarks",
    "Face Authentication",
    "face-api.js",
    "Next.js",
    "AI",
    "Computer Vision",
  ],
  authors: [
    {
      name: "Luca Palminteri",
      url: "https://github.com/LucaPalminteri",
    },
  ],
  creator: "Luca Palminteri",
  publisher: "Luca Palminteri",
  themeColor: "#000000",
  openGraph: {
    title: "Face Recognition App",
    description:
      "Comprehensive facial analysis with detection, landmarks, and authentication features.",
    url: "https://face-api-lucapalminteri.vercel.app",
    type: "website",
    siteName: "Face Recognition App",
    locale: "en_US",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Face Recognition App preview",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Face Recognition App",
    description: "Advanced face recognition and analysis application",
    creator: "@lucapalminteri",
    images: ["/android-chrome-512x512.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <div className=" bg-background">
          <Navbar />
          <main className="container mx-auto">{children}</main>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
