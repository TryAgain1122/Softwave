import { useState, useCallback } from "react";
import Header from "../components/socmedComponents/Header";
import SearchModal from "../components/socmedComponents/Modals/SearchModal";
import NotificationModal from "../components/socmedComponents/Modals/NotificationModal";
import BottomNav from "../components/socmedComponents/BottomNav";
import Stories from "../components/socmedComponents/Stories";
import PostCard from "../components/socmedComponents/PostCard";
import ProfilePage from "../components/socmedComponents/ProfilePage";
import CommentModal from "../components/socmedComponents/Modals/CommentModal";
import MessagesModal from "../components/socmedComponents/Modals/MessagesModal";
import CreatePostModal from "../components/socmedComponents/Modals/CreatePostModal";
import ShareModal from "../components/socmedComponents/Modals/ShareModal";
import SuggestedUsers from "../components/socmedComponents/SuggestedUsers";
import { Plus } from "lucide-react";

interface INotification {
  id: number;
  user: string;
  avatar: string;
  action: string;
  timestamp: string;
  read: boolean;
}

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
  images?: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: string;
  commentsList: IComment[];
}

const Socmed = () => {
  const [posts, setPosts] = useState<IPost[]>([
    {
      id: 1,
      user: { name: "Luna Rose", username: "@lunarose", avatar: "🌸" },
      content:
        "Spending my morning in the garden with a cup of lavender tea 🍵 ✨",
      image:
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=400&fit=crop",
      likes: 342,
      comments: 28,
      isLiked: false,
      isBookmarked: false,
      timestamp: "2h ago",
      commentsList: [
        {
          id: 1,
          user: { name: "Mia Belle", username: "@miabelle", avatar: "🦋" },
          content: "This looks so peaceful! I need to try lavender tea ☕",
          timestamp: "1h ago",
          likes: 12,
        },
        {
          id: 2,
          user: { name: "Dream Cloud", username: "@dreamcloud", avatar: "☁️" },
          content: "Your garden must be beautiful this time of year! 🌺",
          timestamp: "45m ago",
          likes: 8,
        },
      ],
    },
    {
      id: 2,
      user: { name: "Mia Belle", username: "@miabelle", avatar: "🦋" },
      content:
        "New art piece finished! Watercolor skies and dreamy clouds 🎨💭",
      images: [
        "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600&h=400&fit=crop",
      ],
      likes: 521,
      comments: 45,
      isLiked: true,
      isBookmarked: true,
      timestamp: "5h ago",
      commentsList: [
        {
          id: 1,
          user: { name: "Luna Rose", username: "@lunarose", avatar: "🌸" },
          content: "The colors are absolutely stunning! Do you sell prints?",
          timestamp: "4h ago",
          likes: 23,
        },
        {
          id: 2,
          user: { name: "Soft Café", username: "@softcafe", avatar: "☕" },
          content: "We would love to feature this in our café! 💜",
          timestamp: "3h ago",
          likes: 15,
        },
        {
          id: 3,
          user: { name: "Pastel Sky", username: "@pastelsky", avatar: "🌈" },
          content: "Your art always inspires me! Keep creating 🎨",
          timestamp: "2h ago",
          likes: 9,
        },
      ],
    },
    {
      id: 3,
      user: { name: "Soft Café", username: "@softcafe", avatar: "☕" },
      content: "Cozy corner vibes with our new pastel collection 🌿",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      likes: 892,
      comments: 67,
      isLiked: false,
      isBookmarked: false,
      timestamp: "8h ago",
      commentsList: [
        {
          id: 1,
          user: { name: "Luna Rose", username: "@lunarose", avatar: "🌸" },
          content: "I need to visit soon! This looks amazing ☕",
          timestamp: "7h ago",
          likes: 34,
        },
      ],
    },
  ]);

  const [notifications] = useState<INotification[]>([
    {
      id: 1,
      user: "Luna Rose",
      avatar: "🌸",
      action: "liked your post",
      timestamp: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      user: "Mia Belle",
      avatar: "🦋",
      action: "commented on your post",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      user: "Soft Café",
      avatar: "☕",
      action: "started following you",
      timestamp: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      user: "Dream Cloud",
      avatar: "☁️",
      action: "mentioned you in a comment",
      timestamp: "3 hours ago",
      read: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [sharePostId, setSharePostId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  const handleCommentClick = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setSelectedPost(post);
      setShowComments(true);
    }
  };

  const handleAddComment = (postId: number, content: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: IComment = {
            id: post.commentsList.length + 1,
            user: { name: "You", username: "@you", avatar: "💫" },
            content,
            timestamp: "Just now",
            likes: 0,
          };
          return {
            ...post,
            commentsList: [...post.commentsList, newComment],
            comments: post.comments + 1,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: IPost = {
      id: posts.length + 1,
      user: { name: "You", username: "@you", avatar: "💫" },
      content,
      image,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      timestamp: "Just now",
      commentsList: [],
    };
    setPosts([newPost, ...posts]);
  };

  const handleShare = (id: number) => {
    setSharePostId(id);
    setShowShare(true);
  };

  const handleFollow = (id: number) => {
    console.log("Follow user from post:", id);
  };

  // Pull to refresh functionality
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-x-hidden">
        {/* Decorative background elements */}
        <div className="fixed top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
        <div className="fixed top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="fixed bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

        <Header
          onNotificationClick={() => setShowNotifications(true)}
          onSearchClick={() => setShowSearch(true)}
        />

        {activeTab === "messages" ? (
          <div className="fixed inset-0 top-16 bottom-16 z-10">
            <MessagesModal />
          </div>
        ) : (
          <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 relative">
            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            )}

            {activeTab === "home" ? (
              <>
                <Stories onAddStory={() => setShowCreatePost(true)} />

                {/* Suggested Users */}
                <SuggestedUsers />

                {/* Posts Feed */}
                <div className="space-y-6">
                  {posts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                      onCommentClick={handleCommentClick}
                      onShare={handleShare}
                      onFollow={handleFollow}
                    />
                  ))}
                </div>

                {/* Load More Indicator */}
                <div className="flex justify-center py-8">
                  <button
                    onClick={handleRefresh}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                  >
                    Load more posts
                  </button>
                </div>
              </>
            ) : activeTab === "profile" ? (
              <ProfilePage
                posts={posts}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onCommentClick={handleCommentClick}
              />
            ) : (
              <></>
            )}

            <SearchModal
              isOpen={showSearch}
              onClose={() => setShowSearch(false)}
            />
            <NotificationModal
              notifications={notifications}
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />

            <CommentModal
              isOpen={showComments}
              onClose={() => setShowComments(false)}
              posts={selectedPost}
              onAddComment={handleAddComment}
            />
          </main>
        )}

        {/* Floating Action Button - Create Post */}
        {activeTab === "home" && (
          <button
            onClick={() => setShowCreatePost(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-110 transition-all duration-300 z-20"
          >
            <Plus className="w-7 h-7" />
          </button>
        )}

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onPost={handleCreatePost}
        />

        {/* Share Modal */}
        <ShareModal
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          postId={sharePostId || 0}
        />

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </>
  );
};

export default Socmed;
