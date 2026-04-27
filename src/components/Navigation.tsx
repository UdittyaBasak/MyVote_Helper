'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Info, ShieldCheck, PieChart } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Ask AI', path: '/ask-ai', icon: Bot },
  { name: 'General Info', path: '/general-info', icon: PieChart },
  { name: 'Essentials', path: '/essentials', icon: Info },
  { name: 'Sovereign Aura', path: '/sovereign-aura', icon: ShieldCheck },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Side-Nav */}
      <nav className="hidden md:flex flex-col w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary tracking-wider">MyVote Helper</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Sovereign Edition</p>
        </div>
        <ul className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,153,51,0.1)]' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          GIGW 3.0 Compliant
        </div>
      </nav>

      {/* Mobile Bottom-Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50">
        <ul className="flex justify-around p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={clsx(
                    'flex flex-col items-center gap-1 p-2 rounded-lg transition-all',
                    isActive ? 'text-primary' : 'text-slate-400'
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
