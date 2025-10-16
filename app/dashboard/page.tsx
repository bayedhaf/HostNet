import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";

export default function UserDashboard() {
  const posts = [
    { job: "Hotel Waiter", definition: "Serve guests with hospitality excellence.", image: "/hot2.jpg" },
    { job: "Receptionist", definition: "Greet and assist guests upon arrival.", image: "/hot3.jpg" },
    { job: "Chef Assistant", definition: "Support chefs in kitchen operations.", image: "/hot2.jpg" },
  ];

  const filters = [
    "Remote",
    "Within 10 miles",
    "Date posted",
    "Experience level",
    "Salary",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <Link href="/">
          <p className="text-xl font-bold text-cyan-500 sm:float-end">HostNet</p>
        </Link>
        <Link href="/posts" className="w-full sm:w-auto hidden sm:block">
          <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-600 flex items-center justify-center gap-2">
            <MdAddCircle className="text-lg" />
            Post a Job
          </Button>
        </Link>
      </div>

      <Card className="flex-1 overflow-y-auto max-h-[80vh] shadow-lg rounded-3xl border border-gray-200 dark:border-gray-700 p-4">
        <CardTitle className="text-2xl font-bold mb-4">Find Your Next Hospitality Job</CardTitle>
        <Input type="search" placeholder="Search jobs..." className="mb-4" />

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f, idx) => (
            <Button key={idx} variant="outline" className="rounded-full bg-cyan-100 hover:cyan-200 px-4 py-2">
              {f}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Card key={p.job} className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="relative w-full h-48">
                <Image 
                  src={p.image} 
                  alt={p.job} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <h2 className="font-semibold text-lg">{p.job}</h2>
                <p className="text-cyan-600 text-sm">{p.definition}</p>
                <Button className="mt-2 w-full bg-cyan-500 text-white hover:bg-cyan-600 rounded-full">
                  Quick Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}