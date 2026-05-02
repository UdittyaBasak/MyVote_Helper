'use client';

import { useState, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function AskAIPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', text: 'Namaste. How can I assist you with your voting queries today?' }
  ]);

  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-IN';

        rec.onstart = () => {
          setIsRecording(true);
          setTranscript('');
        };

        rec.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        rec.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsRecording(false);
          if (event.error === 'network') {
            alert('Network Error: Your browser (likely Brave or un-configured Chromium) blocks Google\'s Speech API. Please open this page in standard Google Chrome for real-time voice, or provide a cloud API key.');
          } else {
            alert(`Microphone error: ${event.error}`);
          }
        };

        rec.onend = () => {
          setIsRecording(false);
          if (transcript) {
            processFinalTranscript(transcript);
          }
        };

        setRecognition(rec);
      }
    }
  }, []);

  const processFinalTranscript = (finalText: string) => {
    setIsProcessing(true);
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: finalText }]);
    
    setTimeout(() => {
      setIsProcessing(false);
      setTranscript('');
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          role: 'assistant', 
          text: `I heard you say: "${finalText}". I am ready to process this inquiry!` 
        }
      ]);
    }, 1000);
  };

  const handleVoiceStream = () => {
    if (isRecording) {
      recognition?.stop();
    } else {
      if (!recognition) {
        alert('Speech recognition is not supported in your current browser.');
        return;
      }
      try {
        recognition.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Voice Concierge</h1>
        <p className="text-slate-400 mt-3 text-lg font-medium leading-relaxed">Speak naturally. I understand regional dialects.</p>
      </header>

      {/* Chat Transcript */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-primary text-slate-900 rounded-br-none font-medium' 
                  : 'bg-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {transcript && (
          <div className="flex justify-end">
            <div className="max-w-[80%] p-4 rounded-2xl bg-primary/50 text-slate-900 rounded-br-none font-medium animate-pulse">
              {transcript} ...
            </div>
          </div>
        )}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm">Gemini Pro is analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Voice Control */}
      <div className="flex justify-center items-center py-8">
        <div className="relative flex justify-center items-center">
          {/* Wavy/Ripple Effect when recording */}
          {isRecording && (
            <>
              <div className="absolute w-32 h-32 bg-red-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute w-40 h-40 border border-red-500/20 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
              <div className="absolute w-48 h-48 border border-red-500/10 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
            </>
          )}
          
          <button
            onClick={handleVoiceStream}
            disabled={isProcessing}
            className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_40px_rgba(239,68,68,0.8)] scale-110' 
                : 'bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(255,153,51,0.3)]'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRecording ? (
              <Square className="w-10 h-10 text-white" fill="currentColor" />
            ) : (
              <Mic className="w-12 h-12 text-slate-900" />
            )}
          </button>
        </div>
      </div>
      <div className="text-center mt-2 text-xs text-slate-500">
        {isRecording ? 'Listening to your voice...' : 'Tap to speak'}
      </div>
    </div>
  );
}
