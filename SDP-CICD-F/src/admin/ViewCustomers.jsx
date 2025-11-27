import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewAllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  const displayCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallcustomers`);
      setCustomers(response.data);
    } catch (err) {
      setError("Failed to fetch customers data ... " + err.message);
    }
  };

  useEffect(() => {
    displayCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `${config.url}/admin/deletecustomer?cid=${id}`
      );
      toast.success(response.data);
      displayCustomers();
    } catch (err) {
      console.log(err);
      setError("Unexpected Error Occurred... " + err.message);
      toast.error("Deletion failed: " + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 rounded-2xl mt-10">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 underline">
        View All Customers
      </h3>

      <ToastContainer position="top-center" autoClose={4000} />

      {error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : customers.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">No Customer Data Found</p>
      ) : (
        <div className="overflow-x-auto rounded-0xl mt-17 border border-gray-200 shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Gender</th>
                <th className="px-4 py-3 border-b">DOB</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Username</th>
                <th className="px-4 py-3 border-b">Mobile No</th>
                <th className="px-4 py-3 border-b">Location</th>
                <th className="px-4 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-yellow-50 transition`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-700">{customer.id}</td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.gender}</td>
                  <td className="px-4 py-3">{customer.dob}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.username}</td>
                  <td className="px-4 py-3">{customer.mobileno}</td>
                  <td className="px-4 py-3">{customer.location}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteCustomer(customer.id)}
                      className="!text-red-600 !border-red-600 hover:!bg-red-50"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
