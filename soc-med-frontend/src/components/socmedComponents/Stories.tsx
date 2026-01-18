import { useState } from "react";
import { Plus } from "lucide-react";
import StoryViewer from "./Modals/StoryViewer";

interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  timestamp: string;
  hasNewStory: boolean;
}

interface StoriesProps {
  onAddStory?: () => void;
}

const Stories = ({ onAddStory }: StoriesProps) => {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const stories: Story[] = [
    { id: 1, user: "Star", avatar: "⭐", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400", timestamp: "2h ago", hasNewStory: true },
    { id: 2, user: "Garden", avatar: "🌿", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", timestamp: "3h ago", hasNewStory: true },
    { id: 3, user: "Fire", avatar: "🔥", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", timestamp: "4h ago", hasNewStory: true },
    { id: 4, user: "Moon", avatar: "🌙", image: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400", timestamp: "5h ago", hasNewStory: false },
    { id: 5, user: "Energy", avatar: "⚡", image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400", timestamp: "6h ago", hasNewStory: true },
    { id: 6, user: "Music", avatar: "🎧", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", timestamp: "8h ago", hasNewStory: false },
    { id: 7, user: "Photo", avatar: "📸", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", timestamp: "10h ago", hasNewStory: true },
    { id: 8, user: "Cosmic", avatar: "🌀", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400", timestamp: "12h ago", hasNewStory: false },
  ];

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setShowViewer(true);
  };

  return (
    <>
      <div className="mb-6 p-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {/* Add Story Button */}
          <button
            onClick={onAddStory}
            className="flex-shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 p-0.5 transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1 text-center">Add</p>
          </button>

          {/* Stories */}
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(index)}
              className="flex-shrink-0 group"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 transform transition-all duration-300 hover:scale-110 ${
                story.hasNewStory
                  ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
                  : "bg-gray-300"
              }`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    {story.avatar}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center truncate w-16">
                {story.user}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      <StoryViewer
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
        stories={stories}
        initialIndex={selectedStoryIndex}
      />
    </>
  );
};

export default Stories;
