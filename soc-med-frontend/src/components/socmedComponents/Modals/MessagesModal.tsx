import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  avatar: string;
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
  return <div>MessagesModal</div>;
};

export default MessagesModal;
