import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
// import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Face Recognition App",
  description: "A multi-page face recognition application",
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
