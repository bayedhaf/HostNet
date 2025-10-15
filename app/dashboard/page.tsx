"use client";

import React from "react";

export default function Dashboard() {
  const stats = [
    { name: 'Total Jobs', value: '1,234', change: '+12%', changeType: 'positive', color: 'bg-blue-100 text-blue-800' },
    { name: 'Applications', value: '456', change: '+8%', changeType: 'positive', color: 'bg-green-100 text-green-800' },
    { name: 'Active Companies', value: '89', change: '+2%', changeType: 'positive', color: 'bg-purple-100 text-purple-800' },
    { name: 'Avg. Salary', value: '$45K', change: '-3%', changeType: 'negative', color: 'bg-red-100 text-red-800' },
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Hospitality Jobs Dashboard</h1>
            <p className="text-indigo-200 mt-1">Manage and monitor your job listings</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-lg hover:bg-indigo-50 transition duration-200">
              Post New Job
            </button>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-gray-600 font-medium">AD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition border-l-4 border-indigo-500 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50">
                <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Job Title', 'Type', 'Salary', 'Applications', 'Status'].map((head) => (
                        <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{job.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.salary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applications}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{job.status}</span>
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
              <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50 rounded-t-xl">
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
              <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50 rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition duration-200 font-medium">
                  View All Jobs
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-200 font-medium">
                  Manage Applications
                </button>
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-purple-600 transition duration-200 font-medium">
                  Analytics Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
