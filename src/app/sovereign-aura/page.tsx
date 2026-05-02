'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Download, Fingerprint, Loader2,
  CheckCircle2, ImagePlus, X, Sparkles
} from 'lucide-react';
import { generateAuraMetadata, mockMintNFT } from '@/services/auraGenerator';

const FILTERS = [
  { id: 'original',   label: 'Original',     css: '' },
  { id: 'cyberpunk',  label: 'Cyberpunk',    css: 'hue-rotate(270deg) saturate(2) contrast(1.2) brightness(0.9)' },
  { id: 'saffron',    label: 'Saffron Aura', css: 'sepia(0.6) saturate(2.5) hue-rotate(-10deg) brightness(1.1)' },
  { id: 'democracy',  label: 'Democracy',    css: 'hue-rotate(200deg) saturate(1.8) brightness(0.95) contrast(1.1)' },
  { id: 'verdant',    label: 'Verdant',      css: 'hue-rotate(100deg) saturate(2) brightness(0.9) contrast(1.15)' },
  { id: 'xray',       label: 'X-Ray',        css: 'grayscale(1) invert(0.85) contrast(1.5) brightness(1.2)' },
  { id: 'noir',       label: 'Noir',         css: 'grayscale(1) contrast(1.4) brightness(0.8)' },
];

export default function SovereignAuraPage() {
  const [metadata, setMetadata]       = useState<any>(null);
  const [isMinting, setIsMinting]     = useState(false);
  const [mintResult, setMintResult]   = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter]   = useState(FILTERS[0]);
  const [isDragging, setIsDragging]   = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMetadata(generateAuraMetadata()); }, []);

  // ── Upload helpers ──────────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setActiveFilter(FILTERS[0]);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) handleFile(f);
  };
  const handleDrop      = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); };
  const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const removeImage     = () => { setUploadedImage(null); setActiveFilter(FILTERS[0]); if (fileInputRef.current) fileInputRef.current.value = ''; };

  // ── Mint ────────────────────────────────────────────────────────
  const handleMint = async () => {
    setIsMinting(true);
    const result = await mockMintNFT(metadata);
    setMintResult(result);
    setIsMinting(false);
  };

  // ── 4K Canvas Download ──────────────────────────────────────────
  const handleDownload4K = useCallback(async () => {
    if (!metadata) return;
    setIsDownloading(true);
    try {
      const W = 3000, H = 4000, RADIUS = 80;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d')!;

      // — Clip to rounded card —
      ctx.save();
      ctx.beginPath();
      (ctx as any).roundRect(0, 0, W, H, RADIUS);
      ctx.clip();

      // — Background —
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, W, H);

      // — Purple ambient glow —
      const glow = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, W * 0.7);
      glow.addColorStop(0, 'rgba(88,28,135,0.55)');
      glow.addColorStop(1, 'rgba(2,6,23,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

      // — User photo (cover-fit + CSS filter) —
      if (uploadedImage) {
        const img = new Image();
        await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = uploadedImage; });
        const imgAspect = img.width / img.height, cardAspect = W / H;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (imgAspect > cardAspect) { sw = img.height * cardAspect; sx = (img.width - sw) / 2; }
        else                        { sh = img.width / cardAspect;  sy = (img.height - sh) / 2; }
        ctx.filter = activeFilter.css || 'none';
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
        ctx.filter = 'none';
      }

      // — Soft top fade (upper black vignette) —
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.38);
      topFade.addColorStop(0,   'rgba(2,6,23,0.45)');
      topFade.addColorStop(0.6, 'rgba(2,6,23,0.10)');
      topFade.addColorStop(1,   'rgba(2,6,23,0)');
      ctx.fillStyle = topFade; ctx.fillRect(0, 0, W, H);

      // — Dark bottom overlay (text legibility) — reduced darkness —
      const overlay = ctx.createLinearGradient(0, H * 0.42, 0, H);
      overlay.addColorStop(0,    'rgba(2,6,23,0)');
      overlay.addColorStop(0.32, 'rgba(2,6,23,0.60)');
      overlay.addColorStop(1,    'rgba(2,6,23,0.78)');
      ctx.fillStyle = overlay; ctx.fillRect(0, 0, W, H);

      // — Holographic shimmer band —
      const shimmer = ctx.createLinearGradient(-W * 0.3, 0, W * 1.3, H);
      shimmer.addColorStop(0,    'rgba(255,255,255,0)');
      shimmer.addColorStop(0.48, 'rgba(255,255,255,0)');
      shimmer.addColorStop(0.50, 'rgba(255,255,255,0.06)');
      shimmer.addColorStop(0.52, 'rgba(255,255,255,0)');
      shimmer.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.fillStyle = shimmer; ctx.fillRect(0, 0, W, H);

      // — "SOVEREIGN" heading —
      ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      ctx.font = 'bold 170px Inter, system-ui, sans-serif';
      ctx.shadowColor = 'rgba(147,51,234,0.9)'; ctx.shadowBlur = 60;
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SOVEREIGN', W / 2, H * 0.825);
      ctx.shadowBlur = 0;

      // — Sovereign ID badge —
      const bW = 950, bH = 115, bX = W / 2 - bW / 2, bY = H * 0.865;
      ctx.fillStyle = 'rgba(19,136,8,0.12)';
      ctx.strokeStyle = 'rgba(19,136,8,0.55)'; ctx.lineWidth = 5;
      ctx.beginPath(); (ctx as any).roundRect(bX, bY, bW, bH, 24); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 60px "Courier New", monospace';
      ctx.fillText(metadata.sovereignId, W / 2, bY + 78);

      // — Constituency —
      ctx.fillStyle = 'rgba(203,213,225,0.9)';
      ctx.font = '40px Inter, system-ui, sans-serif';
      ctx.fillText(metadata.constituency, W / 2, H * 0.925);

      // — Timestamp —
      ctx.fillStyle = 'rgba(100,116,139,0.85)';
      ctx.font = '32px "Courier New", monospace';
      ctx.fillText(new Date(metadata.timestamp).toLocaleString('en-IN'), W / 2, H * 0.955);

      // — Filter label (if not original) —
      if (activeFilter.id !== 'original') {
        ctx.fillStyle = 'rgba(255,153,51,0.75)';
        ctx.font = '28px Inter, system-ui, sans-serif';
        ctx.fillText(`✦ ${activeFilter.label} Filter`, W / 2, H * 0.972);
      }

      // — Branding —
      ctx.fillStyle = 'rgba(255,153,51,0.55)';
      ctx.font = 'bold 36px Inter, system-ui, sans-serif';
      ctx.fillText('MyVote Helper  ·  Guardian of Democracy', W / 2, H * 0.988);

      ctx.restore(); // end rounded clip

      // — Gradient border stroke —
      const borderGrad = ctx.createLinearGradient(0, 0, W, H);
      borderGrad.addColorStop(0,   '#FF9933');
      borderGrad.addColorStop(0.5, '#9333EA');
      borderGrad.addColorStop(1,   '#138808');
      ctx.strokeStyle = borderGrad; ctx.lineWidth = 32;
      ctx.beginPath();
      (ctx as any).roundRect(16, 16, W - 32, H - 32, RADIUS);
      ctx.stroke();

      // — Download —
      const link = document.createElement('a');
      link.download = `sovereign-aura-${metadata.sovereignId.replace(/[^a-zA-Z0-9-]/g, '')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }, [uploadedImage, activeFilter, metadata]);

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-8 relative">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.2, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
          className="w-[800px] h-[800px] bg-purple-900 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="mb-10 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent mb-4 tracking-tighter leading-none">
            Guardian of Democracy
          </h1>
          <p className="text-slate-400 text-xl font-medium leading-relaxed">Your Sovereign Identity has been verified.</p>
        </motion.div>
      </header>

      {/* Holographic Card */}
      <motion.div className="relative z-10 w-full max-w-sm aspect-[3/4] mb-6 perspective-1000"
        initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}>
        <div className="w-full h-full relative rounded-2xl p-1 bg-gradient-to-br from-primary via-purple-600 to-accent shadow-[0_0_50px_rgba(75,0,130,0.5)]">
          <div className="absolute inset-1 bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-end pb-8">

            <AnimatePresence mode="wait">
              {uploadedImage ? (
                <motion.img key="photo" src={uploadedImage} alt="Portrait"
                  initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: activeFilter.css || undefined }} />
              ) : (
                <motion.div key="default-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635313337965-72810fb4e0b0?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen grayscale-[50%]" />
              )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center w-full px-6">
              {!uploadedImage && <ShieldCheck className="w-24 h-24 text-primary neon-glow mb-6" />}
              <div className="mb-2">
                <div className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white tracking-widest uppercase mb-1">Sovereign</p>
                  <p className="text-accent font-mono bg-accent/10 px-3 py-1 rounded-md border border-accent/30 inline-block mb-3 text-sm">
                    {metadata?.sovereignId || 'Loading...'}
                  </p>
                  <p className="text-xs text-slate-400 font-mono break-all line-clamp-2">{metadata?.promptUsed}</p>
                </div>
              </div>
            </div>

            {uploadedImage && activeFilter.id !== 'original' && (
              <div className="absolute top-3 right-3 z-20">
                <span className="flex items-center gap-1 text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white px-2 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-yellow-400" />{activeFilter.label}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 transform -skew-x-12 animate-[shimmer_3s_infinite] pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Add Picture */}
      <motion.div className="relative z-10 w-full max-w-sm px-4 mb-4"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        {!uploadedImage ? (
          <div onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
            className={`group cursor-pointer flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-6 px-4 transition-all duration-300
              ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-slate-600 hover:border-purple-500 hover:bg-purple-900/10 bg-slate-900/50'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragging ? 'bg-primary/20' : 'bg-slate-800 group-hover:bg-purple-900/40'}`}>
              <ImagePlus className={`w-6 h-6 transition-colors duration-300 ${isDragging ? 'text-primary' : 'text-slate-400 group-hover:text-purple-400'}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Add Your Portrait</p>
              <p className="text-xs text-slate-500 mt-0.5">Click or drag & drop an image</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl border border-slate-700 transition-colors">
              <ImagePlus className="w-4 h-4" /> Change Photo
            </button>
            <button onClick={removeImage}
              className="flex items-center justify-center gap-2 bg-red-950/50 hover:bg-red-900/60 text-red-400 text-sm font-medium py-2.5 px-4 rounded-xl border border-red-800/50 transition-colors">
              <X className="w-4 h-4" /> Remove
            </button>
          </div>
        )}
      </motion.div>

      {/* Filter Strip */}
      <AnimatePresence>
        {uploadedImage && (
          <motion.div className="relative z-10 w-full max-w-sm px-4 mb-6"
            initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }} transition={{ duration: 0.35 }}>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3 text-center">Cinematic Filters</p>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {FILTERS.map((f) => (
                <button key={f.id} onClick={() => setActiveFilter(f)} className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 group">
                  <div className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200
                    ${activeFilter.id === f.id ? 'border-primary shadow-[0_0_12px_rgba(255,153,51,0.6)] scale-110' : 'border-slate-700 group-hover:border-slate-500 group-hover:scale-105'}`}>
                    <img src={uploadedImage} alt={f.label} className="w-full h-full object-cover" style={{ filter: f.css || undefined }} />
                  </div>
                  <span className={`text-[10px] font-medium transition-colors whitespace-nowrap ${activeFilter.id === f.id ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm px-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>

        <button onClick={handleDownload4K} disabled={isDownloading}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl border border-slate-700 transition-all">
          {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          <span>{isDownloading ? 'Generating...' : '4K Poster'}</span>
        </button>

        <button onClick={handleMint} disabled={isMinting || !!mintResult}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-primary hover:from-purple-500 hover:to-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {isMinting ? <Loader2 className="w-5 h-5 animate-spin" /> : mintResult ? <ShieldCheck className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
          <span>{isMinting ? 'Minting...' : mintResult ? 'Minted' : 'Mint Civic NFT'}</span>
        </button>
      </motion.div>

      {/* Mint Result */}
      {mintResult && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="relative z-10 mt-6 w-full max-w-sm px-4">
          <div className="bg-slate-900 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Successfully Minted to Ledger
            </h4>
            <div className="text-xs font-mono text-slate-400 break-all bg-slate-950 p-2 rounded border border-slate-800">
              TxHash: {mintResult.transactionHash}<br />
              IPFS: {mintResult.metadata?.ipfsLink}<br />
              Timestamp: {mintResult.metadata?.timestamp}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
