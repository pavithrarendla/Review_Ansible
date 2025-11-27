import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewManagers() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");

  const displayManagers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewalleventmanagers`);
      setManagers(response.data);
    } catch (err) {
      setError("Failed to fetch managers data ... " + err.message);
    }
  };

  useEffect(() => {
    displayManagers();
  }, []);

  const deleteManager = async (id) => {
    try {
      const response = await axios.delete(`${config.url}/admin/deletemanager?mid=${id}`);
      toast.success(response.data);
      displayManagers();
    } catch (err) {
      console.log(err);
      setError("Unexpected Error Occurred... " + err.message);
      toast.error("Deletion failed: " + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6   -1xl mt-10">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 underline">
        View All Event Managers
      </h3>

      <ToastContainer position="top-center" autoClose={4000} />

      {error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : managers.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">No Manager Data Found</p>
      ) : (
        <div className="overflow-x-auto mt-17 border border-gray-200 shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-sm uppercase ">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Gender</th>
                <th className="px-4 py-3 border-b">DOB</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Username</th>
                <th className="px-4 py-3 border-b">Mobile No</th>
                <th className="px-4 py-3 border-b">Company</th>
                <th className="px-4 py-3 border-b">Location</th>
                <th className="px-4 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200  text-sm">
              {managers.map((manager, index) => (
                <tr
                  key={manager.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-yellow-50 transition`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-700">{manager.id}</td>
                  <td className="px-4 py-3">{manager.name}</td>
                  <td className="px-4 py-3">{manager.gender}</td>
                  <td className="px-4 py-3">{manager.dob}</td>
                  <td className="px-4 py-3">{manager.email}</td>
                  <td className="px-4 py-3">{manager.username}</td>
                  <td className="px-4 py-3">{manager.mobileno}</td>
                  <td className="px-4 py-3">{manager.company_name}</td>
                  <td className="px-4 py-3">{manager.company_location}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteManager(manager.id)}
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
