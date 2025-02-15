import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  date: string;
  applyLink: string;
}

interface DelegatedJobsTableProps {
  jobData: Job[];
  onDeleteJobs: (jobIds: string[]) => void;
  onJobsUpdated: () => void;
  isLoading: boolean;
}

const DelegatedJobsTable: React.FC<DelegatedJobsTableProps> = ({
  jobData,
  onDeleteJobs,
  onJobsUpdated,
  isLoading,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setJobs(jobData);
  }, [jobData]);

  const filteredJobs = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowercasedSearchTerm) ||
        job.company.toLowerCase().includes(lowercasedSearchTerm) ||
        job.location.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [jobs, searchTerm]);

  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [filteredJobs, currentPage, jobsPerPage]);

  const pageCount = useMemo(() => Math.ceil(filteredJobs.length / jobsPerPage), [filteredJobs.length, jobsPerPage]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  }, []);

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const allJobIds = currentJobs.map((job) => job._id || `${job.title}-${job.company}`);
        setSelectedJobs(allJobIds);
      } else {
        setSelectedJobs([]);
      }
    },
    [currentJobs]
  );

  const handleSelectRow = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, job: Job) => {
      const jobId = job._id || `${job.title}-${job.company}`;
      if (e.target.checked) {
        setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs, jobId]);
      } else {
        setSelectedJobs((prevSelectedJobs) => prevSelectedJobs.filter((id) => id !== jobId));
      }
    },
    []
  );

  const handleDelete = useCallback(async () => {
    try {
      await onDeleteJobs(selectedJobs);
      setJobs((prevJobs) =>
        prevJobs.filter((job) => !selectedJobs.includes(job._id || `${job.title}-${job.company}`))
      );
      setSelectedJobs([]);
      onJobsUpdated();

      const newPageCount = Math.ceil((filteredJobs.length - selectedJobs.length) / jobsPerPage);
      if (currentPage > newPageCount) {
        setCurrentPage(Math.max(1, newPageCount));
      }
    } catch (error) {
      console.error('Error deleting jobs:', error);
    }
  }, [selectedJobs, onDeleteJobs, onJobsUpdated, filteredJobs.length, jobsPerPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        <table className="w-full text-sm text-left text-gray-500" style={{ minWidth: '600px' }}>
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th style={{ width: '5%' }} className="p-4">
                <input
                  type="checkbox"
                  checked={selectedJobs.length === currentJobs.length && currentJobs.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </th>
              <th style={{ width: '30%' }} className="p-4">Title</th>
              <th style={{ width: '20%' }} className="p-4">Company</th>
              <th style={{ width: '20%' }} className="p-4">Location</th>
              <th style={{ width: '15%' }} className="p-4">Date</th>
              <th style={{ width: '10%' }} className="p-4">Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr key={job._id || `${job.title}-${job.company}`} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job._id || `${job.title}-${job.company}`)}
                      onChange={(e) => handleSelectRow(e, job)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4 truncate">{job.title}</td>
                  <td className="p-4 truncate">{job.company}</td>
                  <td className="p-4 truncate">{job.location}</td>
                  <td className="p-4">{formatDate(job.date)}</td>
                  <td className="p-4">
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Apply
                    </a>
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
          <button
            onClick={handleDelete}
            disabled={selectedJobs.length === 0}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🗑️ Delete Selected
          </button>
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
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= pageCount}
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

export default DelegatedJobsTable;
