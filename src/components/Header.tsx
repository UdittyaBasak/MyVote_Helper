'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Header() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Voter Slip Ready',
      message: 'Your official voter slip is now available for download in the Essentials section.',
      time: '10m ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Wait Times Updated',
      message: 'Current average wait time at your polling booth is approximately 15 minutes.',
      time: '1h ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Aura Verified',
      message: 'Your Sovereign Aura identity verification has been successfully processed.',
      time: '2h ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-end px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span>{lang === 'EN' ? 'English' : 'हिंदी'}</span>
        </button>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => {
              const newShowNotifications = !showNotifications;
              setShowNotifications(newShowNotifications);
              if (newShowNotifications) {
                markAllAsRead();
              }
            }}
            className={`relative p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800 ${showNotifications ? 'bg-slate-800 text-white' : ''}`}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-800/50">
                <h3 className="font-semibold text-white">Notifications</h3>
                <span className="text-xs font-medium text-slate-400">{unreadCount} unread</span>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-slate-400">
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/50">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-slate-800/20' : ''}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
                          {notification.type === 'alert' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                          {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className={`text-sm font-medium truncate pr-2 ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                              {notification.title}
                            </p>
                            <span className="text-[10px] text-slate-500 flex-shrink-0 whitespace-nowrap mt-0.5">
                              {notification.time}
                            </span>
                          </div>
                          <p className={`text-xs line-clamp-2 ${!notification.read ? 'text-slate-300' : 'text-slate-400'}`}>
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="border-t border-slate-800 p-2 bg-slate-800/30">
                  <button 
                    onClick={markAllAsRead}
                    className="w-full rounded-lg py-2 text-xs font-medium text-primary hover:bg-slate-800 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
