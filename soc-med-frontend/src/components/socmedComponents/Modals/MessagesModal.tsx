import { useRef, useState } from "react";
import { Send, Search, MoreVertical } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;  
  avatar: string;
}

interface ChatConversation {
  id: number;
  name: string;
  message: string;
  time: string;
  active: boolean
  avatar: string;
  unread: number;
}

const MessagesModal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: "other",
      timestamp: "10:30 AM",
      avatar: "👋",
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some projects. How about you?",
      sender: "user",
      timestamp: "10:32 AM",
      avatar: "😊",
    },
    {
      id: 3,
      text: "That sounds awesome! I've been learning React and TypeScript lately. It's been quite the journey!",
      sender: "other",
      timestamp: "10:33 AM",
      avatar: "👋",
    },
    {
      id: 4,
      text: "Nice! Those are great skills to have. Keep it up! 🚀",
      sender: "user",
      timestamp: "10:35 AM",
      avatar: "😊",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: ChatConversation[] = [
    {
      id: 1,
      name: "Alex Johnson",
      message: "That sounds awesome! I've been...",
      time: "10:33 AM",
      active: true,
      avatar: "👋",
      unread: 2,
    },
    {
      id: 2,
      name: "Luna Rose",
      message: "See you tomorrow!",
      time: "Yesterday",
      active: false,
      avatar: "🌸",
      unread: 0,
    },
    {
      id: 3,
      name: "Mia Belle",
      message: "Love your recent post! 🎨",
      time: "Monday",
      active: false,
      avatar: "🦋",
      unread: 0,
    },
    {
      id: 4,
      name: "Soft Café",
      message: "Thanks for visiting! ☕",
      time: "Sunday",
      active: false,
      avatar: "☕",
      unread: 1,
    },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: "😊",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectedChat = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="flex w-full h-full bg-white overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                selectedConversation === conv.id 
                  ? "bg-pink-50" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-3xl">{conv.avatar}</span>
                  {conv.active && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.message}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedChat?.avatar}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedChat?.name}</h3>
              <p className="text-xs text-gray-500">
                {selectedChat?.active ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "other" && (
                <span className="text-2xl flex-shrink-0">{msg.avatar}</span>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-pink-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-pink-100" : "text-gray-500"
                }`}>
                  {msg.timestamp}
                </p>
              </div>
              {msg.sender === "user" && (
                <span className="text-2xl flex-shrink-0">{msg.avatar}</span>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;
