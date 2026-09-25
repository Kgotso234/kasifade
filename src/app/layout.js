import { Bungee, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Kasifade Barbershop | Tembisa",
  description:
    "Sharp cuts, clean fades and good energy. Kasifade barbershop in Tembisa. Walk-ins welcome.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bungee.variable} ${jakarta.variable}`}>
      <body className="bg-forest font-sans text-cream antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}