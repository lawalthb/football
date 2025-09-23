import type { Metadata } from "next";
import {
  Lato,
  DM_Sans,
  Mulish,
  Poppins,
  Bai_Jamjuree,
  Inter,
  Montserrat,
  Space_Grotesk,
} from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spacegrotesk",
});

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const baijam = Bai_Jamjuree({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const DMsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Football Nigeria",
  description: "",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lato.variable} ${montserrat.variable} ${inter.variable} ${baijam.variable} ${poppins.variable} ${mulish.variable} ${DMsans.className} ${spaceGrotesk.variable} relative antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
