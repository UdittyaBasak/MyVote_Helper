'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Landmark, User, FileText, Calendar, MapPin, Users, Clock, HelpCircle, CheckCircle2, AlertCircle, ExternalLink, Info } from 'lucide-react';
import { electionService, ElectionInfo, PartyData, CandidateData } from '@/services/electionService';
import PollingMap from '@/components/PollingMap';

export default function GeneralInfoPage() {
  const [constituency, setConstituency] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [electionInfo, setElectionInfo] = useState<ElectionInfo | null>(null);
  const [compareData, setCompareData] = useState<{ party: PartyData, candidate: CandidateData } | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const timelineEvents = [
    { phase: "Notification", date: "T-45 Days", description: "Official announcement and issuance of notification." },
    { phase: "Nominations", date: "T-38 Days", description: "Candidates file their nomination papers." },
    { phase: "Scrutiny", date: "T-37 Days", description: "Review of filed nominations for eligibility." },
    { phase: "Withdrawal", date: "T-35 Days", description: "Last date for candidates to withdraw." },
    { phase: "Campaigning", date: "T-34 to T-2 Days", description: "Official period for rallies and manifestos." },
    { phase: "Polling Day", date: "Day 0", description: "Citizens cast their votes at assigned stations." },
    { phase: "Counting", date: "T+3 Days", description: "Official counting and result declaration." }
  ];

  const faqs = [
    { q: "How do I check if my name is on the voter list?", a: "You can visit the ECI Voter Portal or use the 'Voter Helpline' app. Search by EPIC number or personal details." },
    { q: "How can I find my polling station?", a: "Your polling station details are on your Voter Slip. You can also find it online via the ECI search portal using your EPIC number." },
    { q: "What if I don't have a Voter ID card (EPIC)?", a: "You can still vote if your name is in the electoral roll. You'll need an alternative ID like Aadhaar, PAN card, or Driving License." },
    { q: "Can I vote online?", a: "No, currently Indian elections require physical presence at the polling station. Remote voting is only available for certain categories like service voters." }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="relative py-8 px-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none">Election Intelligence Hub</h1>
          <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">A comprehensive guide to the democratic process, powered by GIGW 3.0 standards and real-time data insights.</p>
        </div>
      </header>

      {/* Interactive Map Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Polling Station Tracker</h2>
            <p className="text-slate-500 font-medium">Live wait times and station availability near you.</p>
          </div>
        </div>
        <PollingMap />
      </section>

      {/* Election Details Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-primary/50 transition-all group">
          <Calendar className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">Election Cycle</h3>
          <p className="text-white text-2xl font-black mt-2 leading-tight tracking-tight">{electionInfo?.dates || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-secondary/50 transition-all group">
          <Users className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">Representation</h3>
          <p className="text-white text-2xl font-black mt-2 leading-tight tracking-tight">{electionInfo?.constituencyStats || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-accent/50 transition-all group">
          <MapPin className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">Logistics Hub</h3>
          <p className="text-white text-2xl font-black mt-2 leading-tight tracking-tight">{electionInfo?.pollingStations || 'Loading...'}</p>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-primary/50 transition-all group">
          <FileText className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">Civic Engagement</h3>
          <p className="text-white text-2xl font-black mt-2 leading-tight tracking-tight">{electionInfo?.historicalTurnout || 'Loading...'}</p>
        </div>
      </section>

      {/* Election Timeline */}
      <section className="bg-slate-900/20 p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-4 mb-10">
          <Clock className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-black text-white tracking-tight">Election Roadmap</h2>
        </div>
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-8 pb-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative pl-8 group">
              <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-primary group-hover:bg-primary transition-colors"></div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className="text-primary font-mono text-sm font-bold min-w-[100px]">{event.date}</span>
                <div>
                  <h4 className="text-white font-bold">{event.phase}</h4>
                  <p className="text-slate-400 text-sm">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Compare & FAQ */}
        <div className="lg:col-span-2 space-y-8">
          {/* Compare Section */}
          <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Voter Decision Matrix</h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">Deep-dive into candidate profiles vs. party ideologies using AI synthesis.</p>
              </div>

              <form onSubmit={handleSearch} className="relative mb-8 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-3 py-4 border border-slate-700 rounded-2xl leading-5 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Enter Constituency Name..."
                  value={constituency}
                  onChange={(e) => setConstituency(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute inset-y-2 right-2 px-6 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center shadow-lg active:scale-95"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
                </button>
              </form>

              {compareData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
                  {/* Card A: Party */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-secondary/30 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                        <Landmark className="w-7 h-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{compareData.party.name}</h3>
                        <p className="text-xs text-secondary font-bold uppercase tracking-widest">Party Ideology</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{compareData.party.ideology}</p>
                      <div className="space-y-2">
                        <h4 className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Key Manifesto Pillars</h4>
                        {compareData.party.manifestoPoints.map((point, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                            <CheckCircle2 className="w-3 h-3 text-secondary" />
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card B: Candidate */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <User className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{compareData.candidate.name}</h3>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest">Candidate Analytics</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">Education</span>
                        <span className="text-sm text-white font-medium">{compareData.candidate.education}</span>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">Assets</span>
                        <span className="text-sm text-primary font-black">{compareData.candidate.assets}</span>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 col-span-2 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Legal Status</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${compareData.candidate.criminalCases === 0 ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'
                          }`}>
                          {compareData.candidate.criminalCases === 0 ? 'Clean Record' : `${compareData.candidate.criminalCases} Cases`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Voter FAQ Section */}
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-4 mb-10">
              <HelpCircle className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-black text-white tracking-tight">Common Voter Queries</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/50 transition-all">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-all duration-300 ${activeFaq === index ? 'bg-slate-900/80 shadow-[0_0_20px_rgba(255,153,51,0.05)]' : 'hover:bg-slate-900/50'}`}
                  >
                    <span className={`font-bold pr-4 text-lg transition-colors ${activeFaq === index ? 'text-primary' : 'text-slate-200'}`}>{faq.q}</span>
                    <span className={`text-accent transition-transform duration-300 ${activeFaq === index ? 'rotate-180 scale-125' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {activeFaq === index && (
                    <div className="p-6 pt-2 text-slate-400 text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Guidelines & Resources */}
        <div className="space-y-8">
          {/* Polling Day Guidelines */}
          <section className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Polling Day Protocol
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-secondary uppercase tracking-widest px-2">Essential Checklist</h4>
                <ul className="space-y-2">
                  {["Voter ID (EPIC)", "Voter Information Slip", "Valid ID Proof", "Mask/Sanitizer"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-black text-red-400 uppercase tracking-widest px-2">Prohibited Items</h4>
                <ul className="space-y-2">
                  {["Mobile Phones", "Cameras", "Political Wear", "Loudspeakers"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-sm text-slate-400">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* External Portals */}
          <section className="bg-primary/5 p-6 rounded-3xl border border-primary/20">
            <h3 className="text-lg font-bold text-white mb-4">Official Portals</h3>
            <div className="space-y-3">
              {[
                { name: "Election Commission of India", url: "https://eci.gov.in" },
                { name: "National Voter Services Portal", url: "https://nvsp.in" },
                { name: "Voter Portal (Search Electoral Roll)", url: "https://voters.eci.gov.in" },
                { name: "Know Your Candidate (KYC)", url: "https://www.eci.gov.in/know-your-candidate" }
              ].map((portal, i) => (
              <a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-primary transition-all group"
              >
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{portal.name}</span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-primary" />
              </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
