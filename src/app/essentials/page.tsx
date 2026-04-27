import { Shield, IdCard, Box, Droplet } from 'lucide-react';
import InkScanner from '@/components/InkScanner';

export default function EssentialsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Election Essentials</h1>
        <p className="text-slate-400">Everything you need to know before you vote.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Eligibility</h3>
            <p className="text-slate-400 text-sm">
              Must be 18+ years of age, an Indian citizen, and officially registered in the electoral roll of your constituency.
            </p>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <IdCard className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Valid IDs</h3>
            <p className="text-slate-400 text-sm">
              Voter ID (EPIC), Aadhaar Card, PAN Card, Passport, Driving License, or verified MNREGA job card.
            </p>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 sm:col-span-2">
            <Box className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">EVM / VVPAT</h3>
            <p className="text-slate-400 text-sm">
              Electronic Voting Machines ensure fast, tamper-proof voting. After pressing the button, look at the VVPAT machine next to it. It will display a printed slip with your candidate's serial number, name, and symbol for 7 seconds before securely dropping into a sealed box.
            </p>
          </div>
        </div>

        {/* The Sovereign's Aura Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-purple-900/50 shadow-[0_0_30px_rgba(75,0,130,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <Droplet className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">
                The Sovereign&apos;s Aura
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Voted already? Scan your indelible ink to claim your soul-bound &quot;Guardian of Democracy&quot; badge.
            </p>
            <InkScanner />
          </div>
        </div>
      </div>
    </div>
  );
}
