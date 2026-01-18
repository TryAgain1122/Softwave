import { useState, useRef } from "react";
import { Bookmark, Heart, MessageCircle, Share2, MoreHorizontal, UserPlus, UserMinus, Flag, EyeOff, Link, ChevronLeft, ChevronRight } from "lucide-react";

interface IComment {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface IPost {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  images?: string[]; // Support multiple images
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: string;
  commentsList: IComment[];
  isFollowing?: boolean;
}

interface PostCardProps {
  post: IPost;
  index: number;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  onCommentClick: (id: number) => void;
  onShare?: (id: number) => void;
  onFollow?: (id: number) => void;
}

const PostCard = ({
  post,
  index,
  onLike,
  onBookmark,
  onCommentClick,
  onShare,
  onFollow,
}: PostCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing || false);
  const lastTapRef = useRef<number>(0);

  const reactions = [
    { emoji: "❤️", label: "Love" },
    { emoji: "😂", label: "Haha" },
    { emoji: "😮", label: "Wow" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🔥", label: "Fire" },
  ];

  const postOptions = [
    { icon: Link, label: "Copy link", action: () => console.log("Copy link") },
    { icon: EyeOff, label: "Hide post", action: () => console.log("Hide post") },
    { icon: Flag, label: "Report post", action: () => console.log("Report"), danger: true },
  ];

  // Get images array (support both single image and multiple images)
  const images = post.images || (post.image ? [post.image] : []);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // Double tap detected
      if (!post.isLiked) {
        onLike(post.id);
      }
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
    lastTapRef.current = now;
  };

  const handleReaction = (emoji: string) => {
    setSelectedReaction(emoji);
    setShowReactions(false);
    if (!post.isLiked) {
      onLike(post.id);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.(post.id);
  };

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <article
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl transform transition-transform hover:scale-110 cursor-pointer">
            {post.user.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                {post.user.name}
              </h3>
              {/* Follow Button */}
              <button
                onClick={handleFollow}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isFollowing
                    ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="w-3 h-3" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    Follow
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {post.user.username} • {post.timestamp}
            </p>
          </div>
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>

          {showOptions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowOptions(false)}
              />
              <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                {postOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      option.action();
                      setShowOptions(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                      option.danger ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image(s) with Carousel */}
      {images.length > 0 && (
        <div
          className="relative overflow-hidden cursor-pointer"
          onClick={handleDoubleTap}
        >
          <img
            src={images[currentImageIndex]}
            alt="Post content"
            className="w-full h-80 object-cover transform transition-transform duration-700"
          />

          {/* Heart Animation on Double Tap */}
          {showHeartAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <Heart
                className="w-24 h-24 text-white fill-white animate-ping"
                style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.3))" }}
              />
            </div>
          )}

          {/* Image Carousel Controls */}
          {images.length > 1 && (
            <>
              {currentImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
              )}
              {currentImageIndex < images.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              )}

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-6">
          {/* Like/Reactions Button */}
          <div className="relative">
            <button
              onClick={() => onLike(post.id)}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              className="flex items-center gap-2 group transition-all duration-300"
            >
              {selectedReaction ? (
                <span className="text-2xl transform transition-transform group-hover:scale-125">
                  {selectedReaction}
                </span>
              ) : (
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    post.isLiked
                      ? "fill-pink-500 text-pink-500 scale-110"
                      : "text-gray-400 group-hover:text-pink-500 group-hover:scale-110"
                  }`}
                />
              )}
              <span className="text-sm text-gray-600">{post.likes}</span>
            </button>

            {/* Reactions Popup */}
            {showReactions && (
              <div
                className="absolute -top-12 left-0 bg-white rounded-full shadow-xl border border-gray-100 px-2 py-1 flex gap-1 z-20 animate-in fade-in zoom-in duration-200"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleReaction(reaction.emoji)}
                    className="text-2xl hover:scale-150 transition-transform p-1"
                    title={reaction.label}
                  >
                    {reaction.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Comment Button */}
          <button
            onClick={() => onCommentClick(post.id)}
            className="flex items-center gap-2 group transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm text-gray-600">{post.comments}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShare?.(post.id)}
            className="group transition-all duration-300 hover:scale-110"
          >
            <Share2 className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(post.id)}
          className="transition-all duration-300 hover:scale-110"
        >
          <Bookmark
            className={`w-6 h-6 transition-all duration-300 ${
              post.isBookmarked
                ? "fill-purple-500 text-purple-500 scale-110"
                : "text-gray-400 hover:text-purple-500"
            }`}
          />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
