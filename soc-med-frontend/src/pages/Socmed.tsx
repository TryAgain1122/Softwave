import { useState } from "react";
import Header from "../components/socmedComponents/Header";
import SearchModal from "../components/socmedComponents/Modals/SearchModal";
import NotificationModal from "../components/socmedComponents/Modals/NotificationModal";
import BottomNav from "../components/socmedComponents/BottomNav";
import Stories from "../components/socmedComponents/Stories";
import PostCard from "../components/socmedComponents/PostCard";
import ProfilePage from "../components/socmedComponents/ProfilePage";
import CommentModal from "../components/socmedComponents/Modals/CommentModal";
import Chat from "./Chat";
import MessagesModal from "../components/socmedComponents/Modals/MessagesModal";

interface Notification {
  id: number;
  user: string;
  avatar: string;
  action: string;
  timestamp: string;
  read: boolean;
}

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
const Socmed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: "Luna Rose", username: "@lunarose", avatar: "🌸" },
      content:
        "Spending my morning in the garden with a cup of lavender tea ☕️✨",
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
      image:
        "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&h=400&fit=crop",
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

  const [notifications] = useState<Notification[]>([
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState(false);

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
    console.log("handle comment click called with id: ", id)
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setShowComments(true);
      console.log("selectedPost:", selectedPost);
console.log("showComments:", showComments);
    }
  }

  const handleAddComment = (postId: number, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: post.commentsList.length + 1,
          user: { name: 'You', username: '@you', avatar: '💫'},
          content,
          timestamp: 'Just now',
          likes: 0
        };
        return {
          ...post,
          commentsList: [...post.commentsList, newComment],
          comments: post.comments + 1
        }
      }
      return post;
    }))
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-x-hidden">
        {/*Decorative background elements */}
        <div className="fixed top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
        <div className="fixed top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="fixed bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

        <Header
          onNotificationClick={() => setShowNotifications(true)}
          onSearchClick={() => setShowSearch(true)}
        />

        <main className="max-w-2xl mx-auto px-4 py-6 pb-24 relative">
          {activeTab === "home" ? (
            <>
              <Stories />
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={index}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onCommentClick={handleCommentClick}
                  />
                ))}
              </div>
            </>
          ) : activeTab === 'profile' ? (
            <ProfilePage 
                posts={posts}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onCommentClick={handleCommentClick}
              />
          ) : activeTab === 'messages' ? (
            <Chat />
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

          <MessagesModal />

          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>
    </>
  );
};

export default Socmed;
