import { Bell, X } from "lucide-react";

interface Notification {
  id: number;
  user: string;
  avatar: string;
  action: string;
  timestamp: string;
  read: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
}: NotificationModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideDown">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-600"/>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0  ? (
                <div className="divide-y divide-gray-200">
                    {notifications.map(notification => (
                        <div 
                            key={notification.id}
                            className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-all duration-300 ${
                                !notification.read ? 'bg-purple-50/30' : ''
                            }`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
                                {notification.avatar}
                            </div>
                            <div className="flex-1 min-h-0">
                                <p className="text-sm text-gray-800">
                                    <span className="font-semibold">{notification.user}</span> {notification.action}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                            {!notification.read && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            ): (
                <div className="p-8 text-center text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50"/>
                    <p>No notifications</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
