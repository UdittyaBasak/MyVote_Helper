'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation as NavIcon, Search, AlertTriangle } from 'lucide-react';

interface PollingStation {
  name: string;
  lat: number;
  lng: number;
  waitTime: string;
}

const SAMPLE_STATIONS: PollingStation[] = [
  { name: "Delhi Public School, Sector 12", lat: 28.5921, lng: 77.0460, waitTime: "15 min" },
  { name: "Government Boys School, Rohini", lat: 28.7041, lng: 77.1025, waitTime: "45 min" },
  { name: "Modern Vidya Niketan, Faridabad", lat: 28.4089, lng: 77.3178, waitTime: "5 min" },
];

export default function PollingMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    (loader as any).load().then(() => {
      if (mapRef.current) {
        const initialMap = new google.maps.Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 }, // New Delhi
          zoom: 11,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
          ],
          disableDefaultUI: true,
          zoomControl: true,
        });

        // Add markers for sample stations
        SAMPLE_STATIONS.forEach((station) => {
          new google.maps.Marker({
            position: { lat: station.lat, lng: station.lng },
            map: initialMap,
            title: station.name,
            icon: {
              path: 0, // SymbolPath.CIRCLE
              scale: 8,
              fillColor: "#FF9933",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
            },
          } as any);
        });

        setMap(initialMap);
        setLoading(false);
      }
    }).catch((e: any) => {
        console.error("Maps failed to load", e);
        setLoading(false);
    });
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Search Overlay */}
      <div className="absolute top-6 left-6 right-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Search for your polling booth..."
            className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="p-3.5 bg-primary text-slate-950 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <NavIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Info Card */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-white tracking-tight">Active Station</h4>
            <p className="text-sm text-slate-400">Sector 12, Dwarka</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Wait Time</p>
            <p className="text-lg font-black text-primary">15 Min</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Status</p>
            <p className="text-lg font-black text-green-400">Open</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse">Loading Sovereign Map...</p>
          </div>
        </div>
      )}

      {/* Fallback for missing API key */}
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && !loading && (
        <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center p-12 text-center">
            <div className="max-w-md">
                <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-4">Google Maps API Required</h3>
                <p className="text-slate-400 mb-8">To enable interactive polling station tracking, please provide your Google Maps API Key in the environment variables.</p>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs text-slate-500">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
