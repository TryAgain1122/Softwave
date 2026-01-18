import { useState } from "react";
import { Bell, Search, Settings, User, LogOut, Moon, HelpCircle } from "lucide-react";

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
}

const Header = ({ onSearchClick, onNotificationClick }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuItems = [
    { icon: User, label: "View Profile", action: () => console.log("Profile") },
    { icon: Settings, label: "Settings", action: () => console.log("Settings") },
    { icon: Moon, label: "Dark Mode", action: () => console.log("Dark Mode"), toggle: true },
    { icon: HelpCircle, label: "Help & Support", action: () => console.log("Help") },
    { icon: LogOut, label: "Log Out", action: () => console.log("Logout"), danger: true },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Softwave
        </h1>

        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors group"
          >
            <Search className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            <span className="text-gray-400 text-sm">Search Softwave...</span>
            <kbd className="hidden lg:inline-flex ml-auto px-2 py-0.5 text-xs text-gray-400 bg-white rounded border border-gray-200">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={onSearchClick}
            className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationClick}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-105 relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse border-2 border-white"></span>
          </button>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pr-1 sm:pr-3 hover:bg-gray-100 rounded-full transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5 ring-2 ring-transparent hover:ring-purple-200 transition-all">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-base">
                  💫
                </div>
              </div>
              {/* Name - Hidden on mobile */}
              <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                You
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl">
                          💫
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">You</h4>
                        <p className="text-sm text-gray-500 truncate">@yourusername</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowProfileMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          item.danger ? "text-red-500" : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.toggle && (
                          <div className="w-9 h-5 bg-gray-200 rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
