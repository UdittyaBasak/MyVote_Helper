'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Fingerprint, Loader2 } from 'lucide-react';
import { generateAuraMetadata, mockMintNFT } from '@/services/auraGenerator';

export default function SovereignAuraPage() {
  const [metadata, setMetadata] = useState<any>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<any>(null);

  useEffect(() => {
    // Generate the metadata on load
    setMetadata(generateAuraMetadata());
  }, []);

  const handleMint = async () => {
    setIsMinting(true);
    const result = await mockMintNFT(metadata);
    setMintResult(result);
    setIsMinting(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-8 relative">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[800px] h-[800px] bg-purple-900 rounded-full blur-[120px]"
        />
      </div>

      <header className="mb-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent mb-3">
            Guardian of Democracy
          </h1>
          <p className="text-slate-400 text-lg">Your Sovereign Identity has been verified.</p>
        </motion.div>
      </header>

      {/* Holographic Card Reveal */}
      <motion.div 
        className="relative z-10 w-full max-w-sm aspect-[3/4] mb-10 perspective-1000"
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
      >
        <div className="w-full h-full relative rounded-2xl p-1 bg-gradient-to-br from-primary via-purple-600 to-accent shadow-[0_0_50px_rgba(75,0,130,0.5)] transform-style-3d hover:rotate-y-12 transition-transform duration-500 ease-out">
          <div className="absolute inset-1 bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center">
            {/* The Generative Image Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635313337965-72810fb4e0b0?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen grayscale-[50%]"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <ShieldCheck className="w-24 h-24 text-primary neon-glow mb-6" />
              <div className="text-center px-6">
                <p className="text-2xl font-bold text-white tracking-widest uppercase mb-1">Sovereign</p>
                <p className="text-accent font-mono bg-accent/10 px-3 py-1 rounded-md border border-accent/30 inline-block mb-4">
                  {metadata?.sovereignId || 'Loading...'}
                </p>
                <p className="text-xs text-slate-400 font-mono break-all line-clamp-2">
                  {metadata?.promptUsed}
                </p>
              </div>
            </div>

            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 transform -skew-x-12 animate-[shimmer_3s_infinite]"></div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl border border-slate-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>4K Poster</span>
        </button>
        
        <button 
          onClick={handleMint}
          disabled={isMinting || !!mintResult}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-primary hover:from-purple-500 hover:to-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMinting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : mintResult ? (
            <ShieldCheck className="w-5 h-5" />
          ) : (
            <Fingerprint className="w-5 h-5" />
          )}
          <span>{isMinting ? 'Minting...' : mintResult ? 'Minted' : 'Mint Civic NFT'}</span>
        </button>
      </motion.div>

      {/* Mint Result Metadata display */}
      {mintResult && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="relative z-10 mt-8 w-full max-w-md px-4"
        >
          <div className="bg-slate-900 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 
              Successfully Minted to Ledger
            </h4>
            <div className="text-xs font-mono text-slate-400 break-all bg-slate-950 p-2 rounded border border-slate-800">
              TxHash: {mintResult.transactionHash}<br/>
              IPFS: {mintResult.metadata.ipfsLink}<br/>
              Timestamp: {mintResult.metadata.timestamp}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Needed to add the CheckCircle2 import for the success message
import { CheckCircle2 } from 'lucide-react';
