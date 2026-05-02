'use client';

import Link from 'next/link';
import { Bot, Shield, Zap, ArrowRight, Info, Search, Map, CheckCircle, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-primary/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" 
        />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[180px]" />
        
        {/* 3D Decorative Ring */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full [transform:rotateX(60deg)] pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 border-t border-primary/20 rounded-full shadow-[0_0_50px_rgba(255,153,51,0.1)]"
          />
        </div>
      </div>

      <header className="relative z-10 px-6 py-10 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex flex-col group cursor-pointer">
          <h1 className="text-3xl font-black text-primary tracking-tighter leading-none italic">MyVote Helper</h1>
          <p className="text-sm text-slate-400 mt-1 uppercase tracking-[0.3em] font-bold">Sovereign Edition</p>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/general-info" className="text-slate-400 hover:text-white transition-colors">Platform</Link>
          <Link href="/essentials" className="text-slate-400 hover:text-white transition-colors">Resources</Link>
          <Link
            href="/general-info"
            className="bg-primary hover:bg-primary/90 text-slate-950 px-5 py-2 rounded-full font-bold transition-all shadow-lg shadow-primary/20"
          >
            Launch App
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">GIGW 3.0 Compliant Platform</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
        >
          Empowering the <span className="text-primary italic">Sovereign</span> <br />
          Electorate with <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Intelligence</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-14 leading-relaxed font-medium"
        >
          High-availability, decentralized-ready election intelligence platform designed for the next generation of digital democracy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-24"
        >
          <Link
            href="/general-info"
            className="group relative bg-primary text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,153,51,0.3)] flex items-center gap-2"
          >
            GET STARTED
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => document.getElementById('platform-ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl font-bold text-lg border border-slate-800 hover:bg-slate-900 transition-all flex items-center gap-2"
          >
            LEARN MORE
          </button>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 w-full mb-32">
          {[
            { icon: Bot, title: 'AI Concierge', desc: 'Real-time voice-activated transcription and election feedback.' },
            { icon: Shield, title: 'Sovereign Aura', desc: 'Gamified identity verification with advanced computer vision.' },
            { icon: Zap, title: 'Real-time Data', desc: 'Interactive hubs for waiting times and polling station info.' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                rotateX: 10, 
                rotateY: -10,
                z: 20,
                perspective: 1000
              }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl text-left hover:border-primary/30 hover:bg-slate-900/60 transition-all group [transform-style:preserve-3d]"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Platform Ecosystem / Learn More Section */}
        <div id="platform-ecosystem" className="w-full pt-20 scroll-mt-20">
          <div className="text-left mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Platform <span className="text-primary italic">Ecosystem</span></h2>
            <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed">
              MyVote Helper is a multi-layered intelligence platform designed to bridge the gap between complex electoral data and the sovereign voter.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Ask AI Section */}
            <motion.div 
              whileHover={{ 
                rotateX: 5, 
                rotateY: -5,
                z: 10,
                perspective: 2000
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-primary/20 transition-all [transform-style:preserve-3d]"
            >
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center [transform:translateZ(50px)]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Bot className="w-3.5 h-3.5" /> Voice Intelligence
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white">Multilingual AI Concierge</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                    Our voice-activated assistant provides real-time transcription and feedback. It's designed to assist voters with physical disabilities or literacy barriers, ensuring everyone has access to critical election information in their native tongue.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {['Instant Voice-to-Text', 'Multilingual Support', 'Policy Deep-dives', 'Accessibility First'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/ask-ai"
                    className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Launch AI Concierge <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group/ai">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Neural Orb Visual */}
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: 360 
                      }}
                      transition={{ 
                        scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                        rotate: { repeat: Infinity, duration: 20, ease: "linear" }
                      }}
                      className="w-40 h-40 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
                      style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,0.1) 50%, transparent 100%)' }}
                    />
                    
                    {/* Pulsing Soundwaves */}
                    <div className="absolute flex items-center gap-1">
                      {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [h * 20, h * 45, h * 20] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                          className="w-1.5 bg-blue-500/40 rounded-full"
                        />
                      ))}
                    </div>
                    
                    <div className="absolute w-56 h-56 rounded-full border border-blue-500/10 animate-pulse" />
                  </div>
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                    <Activity className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Neural Stream Active</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sovereign Aura Section */}
            <motion.div 
              whileHover={{ 
                rotateX: -5, 
                rotateY: 5,
                z: 10,
                perspective: 2000
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-accent/20 transition-all [transform-style:preserve-3d]"
            >
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center [transform:translateZ(50px)]">
                <div className="order-2 md:order-1">
                  <div className="relative aspect-[3/4] max-w-xs mx-auto rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group/shield">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50" />
                    
                    {/* Hexagon Grid Background Simulation */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ff9933 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    
                    {/* Scanning Orbits */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="absolute w-64 h-64 border border-accent/10 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                      className="absolute w-48 h-48 border border-accent/20 rounded-full border-t-accent/40"
                    />
                    
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="relative z-10 flex flex-col items-center gap-6"
                    >
                      <div className="relative">
                        <Shield className="w-24 h-24 text-accent drop-shadow-[0_0_20px_rgba(255,153,51,0.6)]" />
                        <motion.div 
                          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-accent/20 blur-2xl rounded-full"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-md">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Identity Secure</span>
                        </div>
                      </div>
                    </motion.div>

                    <div className="absolute bottom-4 right-4">
                      <Globe className="w-4 h-4 text-accent opacity-20 animate-spin-slow" />
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                    <Shield className="w-3.5 h-3.5" /> Identity & Honor
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white">Sovereign Aura Verification</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                    Gamifying the democratic process. Using advanced computer vision, we verify your indelible ink and mint a soul-bound "Guardian of Democracy" badge directly to the digital ledger.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {['Ink-Scan Verification', 'Soul-bound NFT Badges', 'Cinematic Portrait Filters', 'Ledger Provenance'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sovereign-aura"
                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors"
                  >
                    Claim Your Aura <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Live Intelligence Hub Section */}
            <motion.div 
              whileHover={{ 
                rotateX: 5, 
                rotateY: -5,
                z: 10,
                perspective: 2000
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-secondary/20 transition-all [transform-style:preserve-3d]"
            >
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center [transform:translateZ(50px)]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3.5 h-3.5" /> Real-time Data
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white">Live Intelligence Hub</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                    Interactive dashboards showing live wait times at your local polling station, constituency heatmaps, and historical participation data.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {['Live Wait Times', 'Constituency Heatmaps', 'Historical Participation', 'Polling Station Info'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/general-info"
                    className="inline-flex items-center gap-2 bg-secondary text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors"
                  >
                    Explore Hub <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group/radar">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Digital Map Grid Simulation */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ff6600 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  
                  {/* Radar Circles */}
                  <div className="absolute w-48 h-48 rounded-full border border-secondary/20" />
                  <div className="absolute w-32 h-32 rounded-full border border-secondary/15" />
                  
                  {/* Rotating Scanner */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                    className="absolute w-64 h-64 rounded-full"
                    style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,102,0,0.15) 25%, transparent 50%)' }}
                  />
                  
                  {/* Abstract Map Nodes */}
                  <div className="relative w-full h-full p-12">
                    {[
                      { top: '30%', left: '40%', size: 4 },
                      { top: '60%', left: '70%', size: 3 },
                      { top: '50%', left: '20%', size: 5 },
                      { top: '20%', left: '80%', size: 2 },
                      { top: '70%', left: '30%', size: 4 },
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          opacity: [0.2, 0.8, 0.2],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4, 
                          delay: i * 0.8,
                        }}
                        className="absolute rounded-full bg-secondary shadow-[0_0_15px_rgba(255,102,0,0.6)]"
                        style={{ 
                          top: pos.top, 
                          left: pos.left, 
                          width: `${pos.size}px`, 
                          height: `${pos.size}px` 
                        }}
                      />
                    ))}
                    
                    {/* Connection Lines Simulation */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                      <motion.path 
                        d="M 40 30 L 70 60 L 20 50 L 80 20 Z" 
                        fill="none" 
                        stroke="#ff6600" 
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    </svg>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full backdrop-blur-md">
                    <Map className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Global Live Map</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Election Essentials Section */}
            <motion.div 
              whileHover={{ 
                rotateX: -5, 
                rotateY: 5,
                z: 10,
                perspective: 2000
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-primary/20 transition-all [transform-style:preserve-3d]"
            >
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center [transform:translateZ(50px)]">
                <div className="order-2 md:order-1">
                  <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group/scanner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
                    
                    {/* Floating Document Visual */}
                    <motion.div 
                      animate={{ 
                        y: [0, -15, 0],
                        rotateY: [0, 5, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="relative z-10 w-44 h-56 bg-slate-900 border border-primary/30 rounded-xl p-5 flex flex-col gap-4 shadow-2xl [transform-style:preserve-3d] [perspective:1000px]"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <div className="w-full h-2 bg-primary/20 rounded" />
                      </div>
                      <div className="w-2/3 h-2 bg-primary/10 rounded ml-6" />
                      
                      <div className="w-full h-28 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10 flex items-center justify-center relative overflow-hidden">
                         <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ repeat: Infinity, duration: 4 }}
                          className="absolute inset-0 bg-primary/5"
                         />
                        <Info className="w-10 h-10 text-primary opacity-40 drop-shadow-[0_0_8px_rgba(255,153,51,0.5)]" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="w-full h-1.5 bg-primary/10 rounded" />
                        <div className="w-4/5 h-1.5 bg-primary/10 rounded" />
                      </div>
                      
                      {/* Scanning Line */}
                      <motion.div 
                        animate={{ top: ['5%', '95%', '5%'] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute left-2 right-2 h-0.5 bg-primary shadow-[0_0_20px_rgba(255,153,51,1)] z-20"
                      />
                    </motion.div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-md">
                      <Search className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Guide Synced</span>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3.5 h-3.5" /> Education
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white">Election Essentials</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                    Everything you need to know: eligibility criteria, valid IDs, EVM instructions, and the VVPAT verification process.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {['Eligibility Criteria', 'Valid ID List', 'EVM Instructions', 'VVPAT Verification'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/essentials"
                    className="inline-flex items-center gap-2 bg-primary text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    View Essentials <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-900/80 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-sm">
            © 2026 MyVote Helper. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
