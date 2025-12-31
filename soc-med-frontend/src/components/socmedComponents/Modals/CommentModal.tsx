import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

interface Comment {
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

interface CommentModalProps {
    isOpen: boolean
    onClose: () => void;
    posts: Post | null;
    onAddComment: (postId: number, content: string) => void;
}

const CommentModal = ({isOpen, onClose, posts, onAddComment}: CommentModalProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim() && posts) {
      onAddComment(posts.id, newComment);
      setNewComment('');
    }
  };

  if (!isOpen || !posts) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] sm:h-auto sm:max-h-[80vh] flex flex-col transform transition-all duration-300 animate-slideUp sm:animate-scaleIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Comments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
              {posts.user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm">{posts.user.name}</h3>
              <p className="text-gray-700 text-sm mt-1">{posts.content}</p>
            </div>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {posts.commentsList.length > 0 ? (
            <div className="space-y-4">
              {posts.commentsList.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
                    {comment.user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">{comment.user.name}</h4>
                      <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-2">
                      <button className="text-xs text-gray-500 hover:text-purple-500 transition-colors">
                        Like
                      </button>
                      <button className="text-xs text-gray-500 hover:text-purple-500 transition-colors">
                        Reply
                      </button>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-end gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
              💫
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal