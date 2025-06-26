import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TwiX",
  description: "TwiX est un réseau social minimaliste et rapide, conçu pour une expérience utilisateur fluide et agréable.",
  openGraph: {
    title: "TwiX",
    description: "TwiX est un réseau social minimaliste et rapide, conçu pour une expérience utilisateur fluide et agréable."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
