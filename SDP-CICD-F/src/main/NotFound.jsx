import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#DBE4C9] text-gray-100 px-6">
      {/* Error Code */}
      <h1 className="text-9xl font-extrabold text-yellow-500">Not_Found </h1>
      
      {/* Message */}
      <div className=" px-6 py-4 rounded-xl mt-6">
        {/* <p className="text-lg font-semibold">Oops! Page Not Found</p> */}
        {/* <p className="text-gray-400 text-sm mt-2">
          The page you are looking for doesn’t exist or was moved.
        </p> */}
      </div>

      {/* Go Home Button */}
      <div className="mt-8">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </section>
  );
}
