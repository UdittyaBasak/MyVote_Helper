'use client';

import { useState } from 'react';
import { Globe, Bell } from 'lucide-react';

export default function Header() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'HI' : 'EN');
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
        
        <button className="relative p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}
