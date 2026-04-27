'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Landmark, User, FileText, Calendar, MapPin, Users } from 'lucide-react';
import { electionService, ElectionInfo, PartyData, CandidateData } from '@/services/electionService';

export default function GeneralInfoPage() {
  const [constituency, setConstituency] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [electionInfo, setElectionInfo] = useState<ElectionInfo | null>(null);
  const [compareData, setCompareData] = useState<{ party: PartyData, candidate: CandidateData } | null>(null);

  useEffect(() => {
    electionService.fetchElectionOverview().then(setElectionInfo);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!constituency.trim()) return;
    
    setIsSearching(true);
    const data = await electionService.fetchComparativeData(constituency);
    setCompareData(data);
    setIsSearching(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">General Election Info</h1>
        <p className="text-slate-400">Everything you need to know about the upcoming polls.</p>
      </header>

      {/* Election Details Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
          <Calendar className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-slate-400 text-sm font-medium">Key Dates</h3>
          <p className="text-white font-semibold mt-1">{electionInfo?.dates || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
          <Users className="w-8 h-8 text-secondary mb-3" />
          <h3 className="text-slate-400 text-sm font-medium">Demographics</h3>
          <p className="text-white font-semibold mt-1">{electionInfo?.constituencyStats || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
          <MapPin className="w-8 h-8 text-accent mb-3" />
          <h3 className="text-slate-400 text-sm font-medium">Polling Stations</h3>
          <p className="text-white font-semibold mt-1">{electionInfo?.pollingStations || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
          <FileText className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-slate-400 text-sm font-medium">Historical Turnout</h3>
          <p className="text-white font-semibold mt-1">{electionInfo?.historicalTurnout || 'Loading...'}</p>
        </div>
      </section>

      {/* Compare Property */}
      <section className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Compare: Party vs. Candidate</h2>
          <p className="text-slate-400 text-sm">Analyze ideology versus actual candidate track records.</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-8 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-950 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
            placeholder="Enter Constituency (e.g. Ward 42)"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isSearching}
            className="absolute inset-y-1 right-1 px-4 bg-primary text-slate-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
          </button>
        </form>

        {compareData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Card A: Party Pulse */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-secondary">
                  <Landmark className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{compareData.party.name}</h3>
                  <p className="text-sm text-slate-400">Party Pulse</p>
                </div>
              </div>
              <div className="space-y-4 relative z-10">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-1">Ideology</h4>
                  <p className="text-slate-200 font-medium">{compareData.party.ideology}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Manifesto Summary (Vertex AI)</h4>
                  <ul className="space-y-2">
                    {compareData.party.manifestoPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card B: Candidate Scorecard */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-primary">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{compareData.candidate.name}</h3>
                  <p className="text-sm text-slate-400">Candidate Scorecard</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-1">Education</h4>
                  <p className="text-slate-200 font-medium text-sm">{compareData.candidate.education}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-1">Declared Assets</h4>
                  <p className="text-primary font-bold">{compareData.candidate.assets}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 col-span-2 flex justify-between items-center">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500">Criminal Cases</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    compareData.candidate.criminalCases === 0 
                      ? 'bg-accent/20 text-accent border border-accent/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {compareData.candidate.criminalCases} Cases
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
