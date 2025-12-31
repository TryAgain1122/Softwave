import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: string;
  commentsList: Comment[];
}

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  onCommentClick: (id: number) => void;
}
const PostCard = ({
  post,
  index,
  onLike,
  onBookmark,
  onCommentClick,
}: PostCardProps) => {
  return (
    <article
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl transform transition-transform hover:scale-110">
            {post.user.avatar}
          </div>
          <div>
            <h3>{post.user.name}</h3>
            <p>
              {post.user.username} • {post.timestamp}
            </p>
          </div>
        </div>
        <button>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="overflow-hidden">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-80 object-cover transform transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${
                post.isLiked
                  ? "fill-purple-500 text-purple-500 scale-110"
                  : "text-gray-400 group-hover:text-purple-500 group-hover:scale-110"
              }`}
            />
            <span className="text-sm text-gray-600">{post.likes}</span>
          </button>
          <button
            onClick={() => {
              console.log("comment button clicked!", post.id);
              onCommentClick(post.id);
            }}
            className="flex items-center gap-2 group transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 text-gray-400 group group-hover:text-blue-500 transition-colors" />
            <span className="text-sm text-gray-600">{post.comments}</span>
          </button>
          <button className="group transition-all duration-300 hover:scale-110">
            <Share2 className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />
          </button>
        </div>
        <button
          onClick={() => onBookmark(post.id)}
          className="transition-all duration-300 hover:scale-110"
        >
          <Bookmark
            className={`w-6 h-6 transition-colors ${
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
