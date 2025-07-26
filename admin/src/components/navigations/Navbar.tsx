// components/Navbar.tsx
import { HelpCircle, Search, Settings, UserCircle } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setShowHelp: Dispatch<SetStateAction<boolean>>;
  showUserMenu: boolean;
  setShowUserMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({
  searchTerm,
  setSearchTerm,
  setShowHelp,
  showUserMenu,
  setShowUserMenu,
}: Props) => (
  <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-blue-600">ImageProcessor</div>
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-80">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search folders and files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <UserCircle className="w-5 h-5" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-40">
              <div className="px-3 py-2 text-sm text-gray-600 border-b">
                user@example.com
              </div>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
