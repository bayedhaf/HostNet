import Navbar from '@/components/navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UserDashboard() {
  const post = [
    { job: "Hotel Waiter", definition: "To serve the hosts", image: "/hot2.jpg" },
    { job: "Receptionist", definition: "To welcome guests", image: "/hot2.jpg" },
    { job: "Chef Assistant", definition: "To support kitchen staff", image: "/hot2.jpg" },
  ]

  const links = [
    { name: "Remote", href: "/#" },
    { name: "Within 10 miles", href: "/b#" },
    { name: "Date posted", href: "/#t" },
    { name: "Experience level", href: "/r#" },
    { name: "Salary", href: "/t#" },
  ]

  return (
    <div className="p-4">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <Navbar />
        </CardHeader>

        <CardContent className="space-y-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Find your next Hospitality job
          </CardTitle>
          <p className="text-gray-600">
            Search thousands of jobs from the top restaurants, hotels, and bars.
          </p>

          {/* Search & filters */}
          <Card className="p-4 border rounded-xl shadow-sm">
            <CardHeader>
              <Input
                type="search"
                placeholder="Search for jobs or companies"
                className="w-full"
              />
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-3">
                {links.map((link, idx) => (
                  <Button
                    key={`${link.href}-${idx}`}
                    className="bg-green-100 border border-gray-400 text-gray-800 hover:text-green-700 hover:bg-green-200 transition"
                  >
                    <Link href={link.href} className="w-full">
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {post.map((item) => (
              <Card key={item.job} className="flex flex-col overflow-hidden rounded-xl shadow">
                {/* Image on top */}
                <div className="w-full h-48 relative">
                  <Image
                    src={item.image}
                    alt={item.job}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content below */}
                <div className="p-4 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="font-semibold text-lg">{item.job}</h2>
                    <p className="text-cyan-600 text-sm">{item.definition}</p>
                  </div>
                  <Button className="bg-cyan-500 text-white hover:bg-cyan-600 mt-2">
                    Quick apply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
