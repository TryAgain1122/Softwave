import { useState } from "react";
import { X, Copy, Check, MessageCircle, Send, Link2, Twitter, Facebook } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const ShareModal = ({ isOpen, onClose, postId }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://softwave.social/post/${postId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    { icon: MessageCircle, label: "Send in Messages", color: "bg-purple-500", action: () => console.log("Share to messages") },
    { icon: Copy, label: "Copy Link", color: "bg-gray-500", action: handleCopyLink },
    { icon: Twitter, label: "Share to Twitter", color: "bg-blue-400", action: () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`) },
    { icon: Facebook, label: "Share to Facebook", color: "bg-blue-600", action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`) },
  ];

  const quickShareUsers = [
    { name: "Luna Rose", avatar: "🌸" },
    { name: "Mia Belle", avatar: "🦋" },
    { name: "Alex Johnson", avatar: "👋" },
    { name: "Dream Cloud", avatar: "☁️" },
    { name: "Soft Café", avatar: "☕" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-all animate-in slide-in-from-bottom duration-300">
        {/* Handle for mobile */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Share Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Share Users */}
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-3">Send to</p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {quickShareUsers.map((user, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {user.avatar}
                </div>
                <span className="text-xs text-gray-600 max-w-[60px] truncate">{user.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 space-y-2">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {option.label === "Copy Link" && copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <option.icon className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="font-medium text-gray-700">
                {option.label === "Copy Link" && copied ? "Copied!" : option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Copy Link Bar */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-3">
            <Link2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
