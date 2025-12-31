import { Sidebar } from "lucide-react";
import { useState } from "react"

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  avatar: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
     {
      id: 1,
      text: "Hey! How are you doing?",
      sender: 'other',
      timestamp: '10:30 AM',
      avatar: '👋'
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some projects. How about you?",
      sender: 'user',
      timestamp: '10:32 AM',
      avatar: '😊'
    },
    {
      id: 3,
      text: "That sounds awesome! I've been learning React and TypeScript lately. It's been quite the journey!",
      sender: 'other',
      timestamp: '10:33 AM',
      avatar: '👋'
    },
    {
      id: 4,
      text: "Nice! Those are great skills to have. Keep it up! 🚀",
      sender: 'user',
      timestamp: '10:35 AM',
      avatar: '😊'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSend = () => {
    if (inputValue.trim()) {
        const newMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            }),
            avatar: '😊'
        };
        setMessages([...messages, newMessage]);
        setInputValue('');

        setTimeout(() => {
            const responseMessage: Message = {
                id: messages.length + 1,
                text: inputValue,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                }),
                avatar: '👋'
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 1000)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden">
        {/* <Sidebar /> */}
        {/* <ChatArea 
            messages
            inputValue
            onInputChange
            onSend
            onMenuClick
        /> */}
        kdalsd
    </div>
  )
}

export default Chat