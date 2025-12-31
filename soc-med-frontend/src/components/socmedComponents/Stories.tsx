import { Plus } from "lucide-react";

const Stories = () => {
    const stories = ['You', '⭐', '🌿', '🔥', '🌙', '⚡', '🎧', '📸', '🌀']
  return (
    <div className="mb-8 p-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
            {stories.map((emoji, index) => (
                <button 
                    key={index}
                    className="flex-shrink-0 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 p-0.5 transform transition-all duration-300 hover:scale-110">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                                {index === 0 ? <Plus className="w-6 h-6 text-purple-500"/> : emoji}    
                            </div>  
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-c">{index === 0 ? 'Add' : 'Story'}</p>
                    </button>
            ))}
        </div>
    </div>
  )
}

export default Stories