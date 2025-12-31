import { Home, User, MessageCircle, Icon } from "lucide-react";
import React from "react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({activeTab, onTabChange}:BottomNavProps) => {
  const tabs = [
    { icon: Home, label: "Home", id: "home" },
    { icon: User, label: "Community", id: "community" },
    { icon: MessageCircle, label: "Messages", id: "messages" },
    { icon: User, label: "Profile", id: "profile" },
  ];
  return (
     <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-around">
            {tabs.map(({icon: Icon, label, id}) => (
                <button
                    id={id}
                    onClick={() => onTabChange(id)}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                        activeTab === id ? 'scale-110' : 'scale-110 hover:scale-105'
                    }`}
                >
                    <Icon 
                        className={`w-6 h-6 transition-colors ${
                            activeTab === id ? 'text-purple-500' : 'text-gray-400'
                        }`}
                    />
                    <span className={`text-xs transition-colors ${
                        activeTab === id ? 'text-purple-500 font-semibold' : 'text-gray-400'
                    }`}>{label}</span>
                </button>
            ))}
        </div>
     </nav>
  )
};

export default BottomNav;
