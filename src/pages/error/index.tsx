import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link 
        to="/" 
        className="text-lg font-semibold rounded-full py-2 px-4 bg-red-500 hover:bg-red-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;