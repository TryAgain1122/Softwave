import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Send } from "lucide-react";

interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  timestamp: string;
}

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialIndex: number;
}

const StoryViewer = ({ isOpen, onClose, stories, initialIndex }: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showHeart, setShowHeart] = useState(false);

  const STORY_DURATION = 5000; // 5 seconds per story

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentIndex, isPaused, stories.length, onClose]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handleDoubleTap = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%"
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
            {currentStory.avatar}
          </div>
          <div>
            <h3 className="text-white font-semibold">{currentStory.user}</h3>
            <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Story Content */}
      <div
        className="relative w-full h-full max-w-lg"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Heart Animation on Double Tap */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-white animate-ping" />
          </div>
        )}

        {/* Navigation Areas */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-0 bottom-20 w-1/3 cursor-pointer"
        />
        <button
          onClick={goToNext}
          className="absolute right-0 top-0 bottom-20 w-1/3 cursor-pointer"
        />
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Reply Input */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply to story..."
          className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        />
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
          <Heart className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-colors hover:opacity-90">
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
