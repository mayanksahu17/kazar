import React, { useState, useEffect, useMemo } from 'react';

interface Job {
  _id?: string;
  image: string;
  title: string;
  position: string;
  date: string;
  status: string;
  location: string;
}

interface JobTableProps {
  jobData?: Job[];
  onJobsUpdated: () => void;
}

const SavedJobsTable: React.FC<JobTableProps> = ({ jobData = [], onJobsUpdated }) => {
  const [jobs, setJobs] = useState<Job[]>(Array.isArray(jobData) ? jobData : []);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true); // Set loading to true when data fetching starts
        const response = await fetch('/api/savedjobs');
        const data = await response.json();
        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          onJobsUpdated(); // Call this to update the parent component
        } else {
          console.error('Unexpected response format:', data);
          setJobs([]);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    }

    if (jobData.length === 0) {
      fetchJobs();
    } else {
      setJobs(jobData);
    }
  }, [jobData, onJobsUpdated]);

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.date.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [jobs, searchTerm]
  );

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredJobs, sortOrder]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  if (loading) {
    return <div className="text-center p-6">Loading jobs, please wait...</div>; // Display a loading text
  }

  return (
    <div className="flex flex-col w-full space-y-6 bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-lg">
      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full max-w-md border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-lg">
        <table className="w-full text-sm text-left text-gray-500" style={{ tableLayout: 'fixed', minWidth: '600px' }}>
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="p-4 w-12">
                <input type="checkbox" />
              </th>
              <th className="p-4 w-40">Title</th>
              <th className="p-4 w-40">Position</th>
              <th className="p-4 w-40">Location</th>
              <th
                className="p-4 w-32 cursor-pointer"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                Date <span>{sortOrder === 'asc' ? '⇅' : '⇅'}</span>
              </th>
              <th className="p-4 w-32">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>
                  <td className="p-4 truncate">{job.title}</td>
                  <td className="p-4 truncate">{job.position}</td>
                  <td className="p-4 truncate">{job.location}</td>
                  <td className="p-4">{formatDate(job.date)}</td>
                  <td className="p-4">
                    <select
                      value={job.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          const response = await fetch(`/api/updatejobstatus`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: job._id, status: newStatus }),
                          });
                          if (response.ok) {
                            setJobs((prevJobs) =>
                              prevJobs.map((j) => (j._id === job._id ? { ...j, status: newStatus } : j))
                            );
                          } else {
                            console.error('Failed to update job status');
                          }
                        } catch (error) {
                          console.error('Error updating job status:', error);
                        }
                      }}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewed">Interviewed</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-sm text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Controls */}
      <div className="mt-4 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <span className="text-sm text-gray-700">{filteredJobs.length} result(s) found</span>
        </div>

        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Rows per page:</label>
            <select
              value={jobsPerPage}
              onChange={(e) => {
                setJobsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="mt-1 block w-full rounded-md border-black py-2 pl-3 pr-10 text-base focus:border-blue-800 focus:outline-none focus:ring-blue-800 hover:border-blue-800 transition duration-150 ease-in-out sm:text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &laquo;
            </button>
            <span className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {currentPage} of {pageCount || 1}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount || pageCount === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobsTable;
