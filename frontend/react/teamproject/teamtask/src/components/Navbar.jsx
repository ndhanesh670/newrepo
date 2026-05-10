import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="glass-card sticky top-0 z-50 mb-8 border-t-0 border-x-0 rounded-none rounded-b-2xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              SocialApp
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">
                Hi, <span className="font-bold text-indigo-400">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
