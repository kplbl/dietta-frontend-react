import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  //const authContext = useContext(AuthContext);

  //const { isAuthenticated, user, logout } = authContext;

  return (
    <nav className="bg-gray-500 flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <span className="font-semibold text-xl tracking-tight">Dietta</span>
      </div>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-600 hover:text-gray-600 hover:border-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/diary"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-2"
          >
            Dnevnik
          </Link>
          <Link
            to="/profile"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-2"
          >
            Profil
          </Link>

          <Link
            to="/foods"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-2"
          >
            Hrana
          </Link>
        </div>
      </div>
      {/* {isAuthenticated ? (
        <button
          onClick={logout}
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600"
        >
          Odjava
        </button>
      ) : (
        <Link
          to="/login"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-600 mr-2"
        >
          Prijava
        </Link>
      )} */}
    </nav>
  );
};

export default Navbar;
