'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Bot, Info, PieChart, Globe, Bell, AlertTriangle, CheckCircle, LogOut, LogIn, User } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Ask AI', path: '/ask-ai', icon: Bot },
  { name: 'General Info', path: '/general-info', icon: PieChart },
  { name: 'Essentials', path: '/essentials', icon: Info },
];

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't show navigation on the homepage (landing page)
  if (pathname === '/') return null;

  return (
    <nav className="w-full h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-all">
              <div className="w-6 h-6 bg-primary rounded-md rotate-45 group-hover:rotate-90 transition-all flex items-center justify-center">
                <div className="w-3 h-3 bg-slate-950 rounded-sm -rotate-45 group-hover:-rotate-90 transition-all" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tighter leading-none">
                MyVote <span className="text-primary">Helper</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Sovereign Edition</span>
            </div>
          </Link>

        {!isLoginPage && (
          <ul className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={clsx(
                      'flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all text-base',
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(255,153,51,0.15)] font-bold' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 uppercase tracking-tighter"
          aria-label={`Switch language to ${lang === 'EN' ? 'Hindi' : 'English'}`}
        >
          <Globe className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span>{lang === 'EN' ? 'English' : 'हिंदी'}</span>
        </button>
        
        {!isLoginPage && (
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
              aria-label="Toggle notifications"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-800/50">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <span className="text-xs font-medium text-slate-400">{unreadCount} unread</span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
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
                </div>
              </div>
            )}
          </div>
        )}

        {/* Auth Button */}
        {session ? (
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
            <Link href="/profile" className="flex items-center gap-3 group">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-white leading-none group-hover:text-primary transition-colors">{session.user?.name}</span>
                <span className="text-[10px] text-primary uppercase tracking-widest font-black mt-0.5">Verified</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                {session.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                )}
              </div>
            </Link>
            <button 
              onClick={() => signOut()}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors bg-slate-800 rounded-full hover:bg-red-950/20 border border-slate-700"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link 
            href="/login"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-slate-950 px-4 py-2 rounded-full font-bold transition-all text-sm ml-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
