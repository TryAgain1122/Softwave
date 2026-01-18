import { useState } from "react";
import { UserPlus, UserMinus, X } from "lucide-react";

interface SuggestedUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  isVerified?: boolean;
}

const SuggestedUsers = () => {
  const [users, setUsers] = useState<SuggestedUser[]>([
    { id: 1, name: "Luna Rose", username: "@lunarose", avatar: "🌸", mutualFriends: 12, isVerified: true },
    { id: 2, name: "Dream Cloud", username: "@dreamcloud", avatar: "☁️", mutualFriends: 8 },
    { id: 3, name: "Soft Café", username: "@softcafe", avatar: "☕", mutualFriends: 5, isVerified: true },
    { id: 4, name: "Star Dust", username: "@stardust", avatar: "✨", mutualFriends: 15 },
    { id: 5, name: "Ocean Wave", username: "@oceanwave", avatar: "🌊", mutualFriends: 3 },
  ]);

  const [following, setFollowing] = useState<Set<number>>(new Set());
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const handleFollow = (userId: number) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleDismiss = (userId: number) => {
    setDismissed(prev => new Set(prev).add(userId));
  };

  const visibleUsers = users.filter(user => !dismissed.has(user.id));

  if (visibleUsers.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">People you may know</h3>
        <button className="text-sm text-purple-500 hover:text-purple-600 font-medium">
          See all
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {visibleUsers.map((user) => (
          <div
            key={user.id}
            className="flex-shrink-0 w-36 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 relative group"
          >
            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(user.id)}
              className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl shadow-lg">
                {user.avatar}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-1">
                <h4 className="font-semibold text-gray-900 text-sm truncate">
                  {user.name}
                </h4>
                {user.isVerified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{user.username}</p>
              <p className="text-xs text-gray-400 mt-1">
                {user.mutualFriends} mutual friends
              </p>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => handleFollow(user.id)}
              className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all duration-300 ${
                following.has(user.id)
                  ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              {following.has(user.id) ? (
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
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
