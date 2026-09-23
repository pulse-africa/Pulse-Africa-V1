import React from 'react';
import { useListShows } from '@workspace/api-client-react';
import { Bell, Calendar, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SafeImage from '@/components/content/SafeImage';
import ContentInteractions from '@/components/content/ContentInteractions';

export default function Emissions() {
  const showsQuery = useListShows();
  const shows = showsQuery.data ?? [];

  if (showsQuery.isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Chargement des émissions...</div>;
  }
  if (showsQuery.isError) {
    return <div className="container mx-auto px-4 py-16 text-center text-destructive">Les émissions sont indisponibles pour le moment.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Nos Émissions</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Débats, décryptages, enquêtes et talks. Retrouvez tous nos rendez-vous réguliers animés par nos experts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {shows.map(show => (
          <div key={show.id} className="flex flex-col sm:flex-row bg-card border border-border rounded-xl overflow-hidden group">
            <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto relative overflow-hidden shrink-0">
              <SafeImage 
                src={show.coverUrl} 
                alt={show.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:bg-gradient-to-r" />
              {show.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Live Actuel
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col flex-1 relative z-10 sm:-ml-8 bg-gradient-to-t sm:bg-gradient-to-r from-card via-card to-card/50">
              <div className="mb-auto">
                <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{show.title}</h2>
                <p className="text-muted-foreground text-sm font-medium mb-4">Présenté par {show.host}</p>
                
                <div className="flex items-center gap-2 text-xs font-medium text-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-md border border-border/50 mb-6">
                  <Calendar size={14} className="text-primary" />
                  {show.schedule}
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 flex items-center justify-between gap-4 mt-4">
                  <div className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{(show.subscribers / 1000000).toFixed(1)}M</span> abonnés
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <ContentInteractions contentId={`show:${show.id}`} title={show.title} authorName={show.host} compact />
                  <Button variant="outline" size="sm" className="border-border bg-transparent hover:text-primary hover:border-primary px-3">
                    <Play size={14} className="mr-1" /> Replays
                  </Button>
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90 px-3">
                    <Bell size={14} className="mr-1" /> S'abonner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
