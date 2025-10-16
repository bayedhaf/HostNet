import SideBar from "@/components/sidebar/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Net App",
  description: "This app serves for hotel or restaurant services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
       
        <aside className="hidden md:block md:w-60 lg:w-64 md:flex-shrink-0">
          <SideBar />
        </aside>
        
     
        <div className="md:hidden">
          <SideBar />
        </div>

     
        <main className="flex-1 w-full min-h-screen overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}