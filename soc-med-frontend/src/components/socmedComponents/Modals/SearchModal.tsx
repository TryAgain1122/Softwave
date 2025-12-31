import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

    const [searchResults] = useState([
    { id: 1, name: 'Luna Rose', username: '@lunarose', avatar: '🌸' },
    { id: 2, name: 'Mia Belle', username: '@miabelle', avatar: '🦋' },
    { id: 3, name: 'Soft Café', username: '@softcafe', avatar: '☕' },
    { id: 4, name: 'Dream Cloud', username: '@dreamcloud', avatar: '☁️' },
    { id: 5, name: 'Pastel Sky', username: '@pastelsky', avatar: '🌈' }
  ]);

  const filteredResults = searchResults.filter(result => 
    result.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    result.username.toLowerCase().includes(searchQuery.toLowerCase())
);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-300 animate-slideDown">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Searh users, tags or content..."
                        className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                        autoFocus
                    />
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
                        <X className="w-5 h-5 text-gray-600"/>
                    </button>
                </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {searchQuery === '' ? (
                    <div className="p-8 text-center text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-50"/>
                        <p>Start typing to search</p>
                    </div>
                ) : filteredResults.length > 0 ? (
                    <div className="p-4 space-y-2">
                        {filteredResults.map(result => (
                            <button
                                key={result.id}
                                className="w-full flex items-center gap-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                                    {result.avatar}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">{result.name}</h3>
                                    <p className="text-sm text-gray-500">{result.username}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                ): (
                    <div className="p-8 text-center text-gray-400">
                        <p>No results found for "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
};

export default SearchModal;
