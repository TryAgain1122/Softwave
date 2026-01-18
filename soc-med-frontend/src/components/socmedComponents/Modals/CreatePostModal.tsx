import { useState, useRef } from "react";
import { X, Image, Smile, MapPin, Users, ChevronDown } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string, image?: string) => void;
}

const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ["😊", "❤️", "🔥", "✨", "🎉", "💜", "🌸", "☕", "🌿", "🦋", "⭐", "🌙", "💫", "🎨", "📸", "🎵"];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !selectedImage) return;

    setIsPosting(true);
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 800));

    onPost(content, selectedImage || undefined);
    setContent("");
    setSelectedImage(null);
    setIsPosting(false);
    onClose();
  };

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
          <button
            onClick={handlePost}
            disabled={(!content.trim() && !selectedImage) || isPosting}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              content.trim() || selectedImage
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPosting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Posting...
              </span>
            ) : "Post"}
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
            💫
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">You</h3>
            <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
              <Users className="w-3 h-3" />
              Public
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Content Input */}
        <div className="px-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? ✨"
            className="w-full h-32 resize-none text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
            autoFocus
          />
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="px-4 pb-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-h-64 object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="px-4 pb-4">
            <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-8 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Add to your post</p>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-green-50 rounded-full transition-colors group"
              >
                <Image className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 hover:bg-yellow-50 rounded-full transition-colors group ${showEmojiPicker ? "bg-yellow-50" : ""}`}
              >
                <Smile className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                <MapPin className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
