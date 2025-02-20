import React, { useState } from 'react';
import MentorCard from '../components/MentorCard';

const SessionPage = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sessionType: 'all',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flex">

      <div className="w-1/4 bg-white p-4">
        <h2 className="text-lg font-bold mb-4">Filters</h2>


        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>


        <div className="mb-4">
          <label className="block mb-2">Date Range</label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="custom">Custom</option>
          </select>
        </div>


        <div className="mb-4">
          <label className="block mb-2">Session Type</label>
          <select
            name="sessionType"
            value={filters.sessionType}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="one-on-one">One-on-One</option>
            <option value="group">Group</option>
          </select>
        </div>
      </div>


      <div className="w-3/4 p-8">
  

        <MentorCard filters={filters} />
      </div>
    </div>
  );
};

export default SessionPage;
