"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Query {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status : Boolean;
}

const AdminQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/admin/get-query' , {token : localStorage.getItem("token")});
        setQueries(response.data.contact);

      } catch (error) { 
        toast.error('Failed to fetch queries', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/delete-query/${id}`);
      setQueries(queries.filter(query => query._id !== id));
      toast.success('Query deleted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Failed to delete query', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-orange-500 mb-8">User Queries</h1>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Table className="min-w-full divide-y divide-gray-700">
          <TableHead className='w-full'> 
            <TableRow className='justify-evenly'>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Message</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-gray-800">
            {queries?.map((query) => (
              <TableRow key={query._id}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{query.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{query.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{query.message}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="outline" size="sm" onClick={() => handleDelete(query._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminQueries;
