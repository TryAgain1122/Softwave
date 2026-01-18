import { useState } from "react";
import PostCard from "./PostCard";
import {
  Bookmark,
  Grid3X3,
  List,
  Settings,
  Edit3,
  Camera,
  MapPin,
  Link as LinkIcon,
  Calendar,
  MoreHorizontal,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  X,
} from "lucide-react";

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

interface ProfilePageProps {
  posts: IPost[];
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
  const [activeProfileTab, setActiveProfileTab] = useState<"posts" | "saved" | "tagged">("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const userPosts = posts.filter((post) => post.user.name === "You");
  const savedPosts = posts.filter((post) => post.isBookmarked);

  // User profile data
  const userProfile = {
    name: "You",
    username: "@yourusername",
    bio: "Living my best life ✨ | Coffee lover ☕ | Creating memories 📸",
    location: "Manila, Philippines",
    website: "softwave.social/you",
    joinDate: "Joined January 2024",
    followers: 1234,
    following: 843,
    avatar: "💫",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop",
  };

  // Get all images from posts for grid view
  const getPostImages = (postsList: IPost[]) => {
    return postsList.filter(post => post.image || (post.images && post.images.length > 0));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-32 sm:h-48 md:h-56 lg:h-64 w-full overflow-hidden rounded-b-3xl">
          <img
            src={userProfile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Cover Photo Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-b-3xl" />
        </div>

        {/* Edit Cover Button */}
        <button className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all">
          <Camera className="w-5 h-5" />
        </button>

        {/* Settings Button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className="p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Settings Dropdown */}
          {showSettingsMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSettingsMenu(false)} />
              <div className="absolute left-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  <Share2 className="w-4 h-4" /> Share Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative -mt-16 sm:-mt-20 self-center sm:self-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl sm:text-5xl">
                  {userProfile.avatar}
                </div>
              </div>
              {/* Online Indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white" />
              {/* Edit Avatar Button */}
              <button className="absolute bottom-0 right-0 p-1.5 bg-purple-500 hover:bg-purple-600 rounded-full text-white shadow-lg transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name and Actions */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {userProfile.name}
                  </h1>
                  <p className="text-gray-500">{userProfile.username}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="hidden sm:inline">Edit Profile</span>
                    <Edit3 className="w-5 h-5 sm:hidden" />
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4 text-center sm:text-left">
            <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>

            {/* Profile Details */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {userProfile.location}
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="text-purple-500 hover:underline">{userProfile.website}</a>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {userProfile.joinDate}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 mt-6 pt-6 border-t border-gray-100">
            <button className="text-center group">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-500 transition-colors">
                {userPosts.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Posts</div>
            </button>
            <button className="text-center group">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-500 transition-colors">
                {formatNumber(userProfile.followers)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Followers</div>
            </button>
            <button className="text-center group">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-500 transition-colors">
                {formatNumber(userProfile.following)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Following</div>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs & View Toggle */}
      <div className="px-4 sm:px-6 mt-6">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 flex-1">
            {[
              { id: "posts", label: "Posts", icon: Grid3X3 },
              { id: "saved", label: "Saved", icon: Bookmark },
              { id: "tagged", label: "Tagged", icon: UserPlus },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProfileTab(tab.id as typeof activeProfileTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeProfileTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 ml-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list" ? "bg-white shadow text-purple-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid" ? "bg-white shadow text-purple-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 mt-6">
        {activeProfileTab === "posts" ? (
          userPosts.length > 0 ? (
            viewMode === "list" ? (
              <div className="space-y-6">
                {userPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={index}
                    onLike={onLike}
                    onBookmark={onBookmark}
                    onCommentClick={onCommentClick}
                  />
                ))}
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {getPostImages(userPosts).map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
                  >
                    <img
                      src={post.image || (post.images && post.images[0])}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <Heart className="w-5 h-5 fill-white" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <MessageCircle className="w-5 h-5 fill-white" /> {post.comments}
                      </span>
                    </div>
                    {/* Multiple Images Indicator */}
                    {post.images && post.images.length > 1 && (
                      <div className="absolute top-2 right-2">
                        <Grid3X3 className="w-5 h-5 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <EmptyState
              icon="📝"
              title="No posts yet"
              description="Share your first moment with the community!"
              actionLabel="Create Post"
            />
          )
        ) : activeProfileTab === "saved" ? (
          savedPosts.length > 0 ? (
            viewMode === "list" ? (
              <div className="space-y-6">
                {savedPosts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={index}
                    onLike={onLike}
                    onBookmark={onBookmark}
                    onCommentClick={onCommentClick}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {getPostImages(savedPosts).map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
                  >
                    <img
                      src={post.image || (post.images && post.images[0])}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <Heart className="w-5 h-5 fill-white" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <MessageCircle className="w-5 h-5 fill-white" /> {post.comments}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <EmptyState
              icon={<Bookmark className="w-10 h-10 text-white" />}
              title="No saved posts"
              description="Save posts to view them here later"
            />
          )
        ) : (
          <EmptyState
            icon="🏷️"
            title="No tagged posts"
            description="When people tag you in posts, they'll appear here"
          />
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={userProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

/* Empty State Component */
const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl mx-auto mb-4">
      {typeof icon === "string" ? icon : icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 mb-5">{description}</p>
    {actionLabel && (
      <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95">
        {actionLabel}
      </button>
    )}
  </div>
);

/* Edit Profile Modal */
const EditProfileModal = ({
  profile,
  onClose,
}: {
  profile: {
    name: string;
    username: string;
    bio: string;
    location: string;
    website: string;
  };
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-100 bg-white rounded-t-2xl">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all">
            Save
          </button>
        </div>

        {/* Cover & Avatar */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400">
            <button className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </button>
          </div>
          <div className="absolute -bottom-12 left-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                  💫
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 pt-16 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
