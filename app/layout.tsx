import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { AppProvider } from "@/lib/context/AppContext";

export const metadata: Metadata = {
  title: "Host Net App",
  description: "This app serves hotel or restaurant services",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased w-full min-h-screen flex flex-col bg-gray-50">
        <AppProvider>
          <main className="flex-1 w-full">{children}</main>
          <Footer/>
        </AppProvider>
      </body>
    </html>
  );
}
