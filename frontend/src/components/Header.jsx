import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="w-full bg-background-paper/80 border-b border-primary/10">
      <nav className="container-layout py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-primary hover:text-primary-hover transition-all duration-300" aria-label="Home">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {userInfo && (
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-sm text-text-secondary hover:text-text-primary transition-all duration-300"
                >
                  Search
                </Link>
                <Link
                  to="/lists"
                  className="text-sm text-text-secondary hover:text-text-primary transition-all duration-300"
                >
                  My Lists
                </Link>
              </div>
            )}
            <div>
              {userInfo ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-text-secondary">Welcome, {userInfo.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="px-3 py-1 text-sm bg-background-paper hover:bg-background text-text-primary transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:hidden flex-col space-y-4 pt-4 border-t border-primary/10 mt-4`}
        >
          {userInfo && (
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm text-text-secondary hover:text-text-primary transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/lists"
                className="text-sm text-text-secondary hover:text-text-primary transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                My Lists
              </Link>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            {userInfo ? (
              <>
                <span className="text-sm text-text-secondary">Welcome, {userInfo.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-1 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 text-sm bg-background-paper hover:bg-background text-text-primary transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 text-sm bg-primary hover:bg-primary-hover text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
