'use client'

import React, { useState } from "react"

// Simple color palette for color picking
const COLORS = [
  { name: "Blue", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-500" },
  { name: "Green", bg: "bg-green-100", text: "text-green-800", border: "border-green-500" },
  { name: "Purple", bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-500" },
  { name: "Red", bg: "bg-red-100", text: "text-red-800", border: "border-red-500" },
  { name: "Orange", bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-500" },
  { name: "Teal", bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-500" },
  { name: "Indigo", bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-500" },
  { name: "Pink", bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-500" },
]

export default function Dashboard() {
  // Allow user to select color for each stat
  const [statColors, setStatColors] = useState([
    COLORS[0], COLORS[1], COLORS[2], COLORS[3]
  ]);

  const stats = [
    { name: 'Total Jobs', value: '1,234', change: '+12%', changeType: 'positive' },
    { name: 'Applications', value: '456', change: '+8%', changeType: 'positive' },
    { name: 'Active Companies', value: '89', change: '+2%', changeType: 'positive' },
    { name: 'Avg. Salary', value: '$45K', change: '-3%', changeType: 'negative' },
  ];

  const recentJobs = [
    { id: 1, title: 'Bartender', company: 'The Tiny Cross', type: 'Full Time', salary: '$35K', applications: 23, status: 'Active' },
    { id: 2, title: 'Server', company: 'The Golden Sham', type: 'Part Time', salary: '$28K', applications: 15, status: 'Active' },
    { id: 3, title: 'Line Cook', company: 'The Stanley Stakes', type: 'Full Time', salary: '$42K', applications: 18, status: 'Active' },
    { id: 4, title: 'Host/Hostess', company: 'The Wakemesh River', type: 'Full Time', salary: '$30K', applications: 12, status: 'Active' },
  ];

  const popularCompanies = [
    { name: 'The Tiny Cross', jobs: 15, rating: '4.8' },
    { name: 'The Golden Sham', jobs: 12, rating: '4.6' },
    { name: 'The Stanley Stakes', jobs: 8, rating: '4.9' },
    { name: 'The Wakemesh River', jobs: 6, rating: '4.7' },
  ];

  // Handle color selection for a stat
  const handleColorChange = (statIdx: number, colorIdx: number) => {
    setStatColors(colors =>
      colors.map((c, i) => (i === statIdx ? COLORS[colorIdx] : c))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Hospitality Jobs Dashboard</h1>
              <p className="text-blue-100 mt-1">Manage and monitor your job listings</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-200">
                Post New Job
              </button>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-gray-600 font-medium">AD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow p-6 border-l-4 ${statColors[index].border} hover:shadow-lg transition relative`}
            >
              {/* Color Picker Button */}
              <div className="absolute top-3 right-3 z-10 group">
                <button className="w-7 h-7 rounded-full border flex items-center justify-center bg-gray-100 hover:bg-gray-200 focus:outline-none">
                  <span className="sr-only">Change color</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="7" />
                  </svg>
                </button>
                {/* Color options (show on hover) */}
                <div className="hidden group-hover:flex absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-2 space-x-1 z-20">
                  {COLORS.map((c, cidx) => (
                    <button
                      key={c.name}
                      aria-label={c.name}
                      className={`w-5 h-5 rounded-full border-2 ${c.bg} ${statColors[index].name === c.name ? 'border-black' : 'border-transparent'}`}
                      onClick={() => handleColorChange(index, cidx)}
                      style={{ outline: 'none' }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${statColors[index].bg} ${statColors[index].text}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {['Job Title', 'Type', 'Salary', 'Applications', 'Status'].map((head) => (
                        <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.company}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.salary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Companies */}
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-900">Popular Companies</h2>
              </div>
              <div className="p-6 space-y-4">
                {popularCompanies.map((company, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.jobs} jobs</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{company.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 font-medium">
                  View All Jobs
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition duration-200 font-medium">
                  Manage Applications
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-200 font-medium">
                  Analytics Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}