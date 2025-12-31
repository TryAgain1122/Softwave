import { Bell, Search } from "lucide-react";

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
}

const Header = ({ onSearchClick, onNotificationClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Softwave
        </h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
            onClick={onSearchClick}
          >
            <Search className="w-5 h-5 text-gray-600"/>
          </button>
          <button 
            onClick={onNotificationClick}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110 relative"
        >
            <Bell className="w-5 h-5 text-gray-600"/>
            <span className="absolute w-2 h-2 rounded-xl top-1 right-1 bg-purple-500 animate-pulse"></span>
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
