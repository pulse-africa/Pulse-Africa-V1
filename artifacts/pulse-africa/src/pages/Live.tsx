import React, { useState, useEffect } from 'react';
import { Play, Users, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeImage from '@/components/content/SafeImage';

export default function Live() {
  const [messages, setMessages] = useState<{id:number, user:string, text:string}[]>([
    { id: 1, user: 'Ahmed', text: 'Excellent débat !' },
    { id: 2, user: 'SarahK', text: 'Je suis d\'accord avec l\'invité.' }
  ]);

  useEffect(() => {
    let id = 3;
    const interval = setInterval(() => {
      const texts = ['Très intéressant', 'Merci Pulse Africa', 'Salutations depuis Dakar', 'Question : Quel est l\'impact sur l\'économie ?', '100% vrai', 'Je regarde depuis Paris !'];
      const users = ['Kofi', 'Amina', 'Chidi', 'Fatou', 'Moussa', 'Ngozi'];
      setMessages(prev => {
        const newMsgs = [...prev, { 
          id: id++, 
          user: users[Math.floor(Math.random() * users.length)], 
          text: texts[Math.floor(Math.random() * texts.length)] 
        }];
        if (newMsgs.length > 50) return newMsgs.slice(newMsgs.length - 50);
        return newMsgs;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Main Player Area */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Video Player Placeholder */}
          <div className="relative flex-1 bg-zinc-950 flex items-center justify-center border-b border-border lg:border-b-0 lg:border-r">
            {/* The Live Video Feed */}
            <SafeImage 
              src="https://images.unsplash.com/photo-1577960613240-62dfeb479366?w=1600&auto=format&fit=crop&q=80" 
              alt="Live Studio" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-red-900/50">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                En Direct
              </span>
              <span className="bg-black/60 backdrop-blur border border-white/10 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                <Users size={12} /> 12,450
              </span>
            </div>
            
            {/* Play overlay for demo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/50">
                <Play fill="white" size={32} className="ml-2 text-white/90" />
              </div>
            </div>

            {/* Bottom Gradient for controls visibility */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>

          {/* Info Bar */}
          <div className="bg-card p-4 md:p-6 shrink-0 border-r border-border">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black mb-1 text-white">Le Grand Journal d'Afrique : Édition Spéciale</h1>
                <p className="text-muted-foreground text-sm mb-4">Analyse des retombées du sommet de l'Union Africaine en direct d'Addis-Abeba avec nos envoyés spéciaux.</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                      <SafeImage src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=100&auto=format&fit=crop" alt="Marie-Laure N'Goran" className="h-full w-full object-cover" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-sm">Marie-Laure N'Goran</div>
                    <div className="text-xs text-muted-foreground">Présentatrice</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-border hover:bg-muted bg-transparent">Partager</Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">S'abonner à la chaîne</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Sidebar */}
        <div className="w-full lg:w-[350px] xl:w-[400px] h-[400px] lg:h-full bg-card border-l border-border flex flex-col shrink-0">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <MessageSquare size={16} /> Chat en direct
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-end">
            {messages.map(msg => (
              <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 text-sm">
                <span className="font-bold text-muted-foreground mr-2">{msg.user}:</span>
                <span className="text-foreground">{msg.text}</span>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Participez à la discussion..." 
                className="flex-1 bg-background border border-border rounded p-2.5 text-sm focus:outline-none focus:border-primary"
              />
              <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-white rounded">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458494 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458494 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22091 7.90002 9.4 7.72093 9.4 7.50002C9.4 7.27911 9.22091 7.10002 9 7.10002H4.84553Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
            </div>
            <div className="text-[10px] text-muted-foreground text-center mt-2">Connectez-vous pour discuter</div>
          </div>
        </div>

      </div>
    </div>
  );
}
