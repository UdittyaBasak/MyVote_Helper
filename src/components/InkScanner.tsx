'use client';

import { useState, useEffect } from 'react';
import { Camera, Scan, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InkScanner() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');
  const router = useRouter();

  const startScan = () => {
    setStatus('scanning');
    
    // Simulate finding the finger
    setTimeout(() => {
      setStatus('verifying');
      
      // Simulate GCP Vision API check for #4B0082
      setTimeout(() => {
        // Haptic feedback simulation
        if (typeof window !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        setStatus('success');
        
        // Redirect to the Sovereign Aura reveal after a delay
        setTimeout(() => {
          router.push('/sovereign-aura');
        }, 1500);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative w-full max-w-sm mx-auto">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        <h3 className="text-xl font-bold text-white mb-2">The Sovereign&apos;s Aura</h3>
        <p className="text-xs text-slate-400 text-center mb-8">Scan your indelible ink to claim your cryptographic badge.</p>
        
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          {/* Camera Viewfinder UI */}
          <div className="absolute inset-0 border-2 border-slate-700 rounded-full"></div>
          
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>

          {status === 'idle' && (
            <Camera className="w-16 h-16 text-slate-600" />
          )}

          {status === 'scanning' && (
            <>
              <div className="absolute inset-4 bg-purple-900/20 rounded-full animate-pulse"></div>
              <Scan className="w-16 h-16 text-primary animate-pulse" />
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-[spin_2s_linear_infinite]"></div>
            </>
          )}

          {status === 'verifying' && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Vision API Active</span>
            </div>
          )}

          {status === 'success' && (
            <CheckCircle2 className="w-20 h-20 text-accent drop-shadow-[0_0_15px_rgba(19,136,8,0.8)]" />
          )}
        </div>

        <button
          onClick={startScan}
          disabled={status !== 'idle'}
          className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {status === 'idle' && 'Initialize Scanner'}
          {status === 'scanning' && 'Scanning Patterns...'}
          {status === 'verifying' && 'Verifying Hex #4B0082...'}
          {status === 'success' && 'Identity Verified'}
        </button>
      </div>
    </div>
  );
}
