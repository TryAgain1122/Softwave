import { useState } from "react";
import PostCard from "./PostCard";
import { Bookmark } from "lucide-react";

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

interface ProfilePageProps {
  posts: Post[];
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
  onCommentClick: (id: number) => void;
}

const ProfilePage = ({
  posts,
  onLike,
  onBookmark,
  onCommentClick,
}: ProfilePageProps) => {
  const [activeProfileTab, setActiveProfileTab] = useState<"posts" | "saved">(
    "posts"
  );

  const userPosts = posts.filter((post) => post.user.name === "You");
  const savedPosts = posts.filter((post) => post.isBookmarked);
  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      {/* Profile Page */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-5xl flex-shrink-0 shadow-xl">
            💫
          </div>
          <div className="flex-1">
            <h1>You</h1>
            <p>@You</p>
            <p>
              Living my best life ✨ | Coffee lover ☕ | Creating memories 📸{" "}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div>{posts.filter((p) => p.user.name === "You").length}</div>
                <div>Posts</div>
              </div>

              <div>
                <div>1.2k</div>
                <div>Followers</div>
              </div>
              <div>
                <div>843</div>
                <div>Following</div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs  */}
      <div className="flex items-center gap-4 mb-6 bg-white rounded-2xl shadow-lg p-2">
        <button
          onClick={() => setActiveProfileTab("posts")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeProfileTab === "posts"
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg p-2"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setActiveProfileTab("saved")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeProfileTab === "saved"
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Saved
        </button>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {activeProfileTab === "posts" ? (
          userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                onLike={onLike}
                onBookmark={onBookmark}
                onCommentClick={onCommentClick}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 flex items-center justify-center text-4xl mx-auto mb-4 opacity-50">
                📝
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-5">Share your first moment with the community!</p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadown-xl transform transition-all duration-300 hover:scale-105 active:scale-95">Create Post</button>
            </div>
          )
        ) : savedPosts.length > 0 ? (
          savedPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onLike={onLike}
              onBookmark={onBookmark}
              onCommentClick={onCommentClick}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl mx-auto mb-4 opacity-50">
              <Bookmark className="w-10 h-10 text-white"/>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No saved posts</h3>
            <p className="text-gray-500">Save posts to view them here later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
