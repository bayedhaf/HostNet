import SideBar from "@/components/sidebar/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host Net App",
  description: "This app serves for hotel or restaurant services",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <aside className="hidden md:block md:w-60 lg:w-64 md:flex-shrink-0">
        <SideBar />
      </aside>
      <div className="block md:hidden w-full">
        <SideBar />
      </div>
       <main className="flex-1 w-full min-h-screen overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
