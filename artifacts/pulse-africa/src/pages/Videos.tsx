import React from 'react';
import { MOCK_VIDEOS } from '@/data/mock';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Videos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Vidéos</h1>
        <p className="text-muted-foreground max-w-2xl">
          Reportages exclusifs, interviews et analyses documentaires. L'Afrique en mouvement, capturée par nos caméras.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-6 pb-4 border-b border-border">
          <Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary/90">Toutes</Button>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:border-primary hover:text-primary">Enquêtes</Button>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:border-primary hover:text-primary">Interviews</Button>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:border-primary hover:text-primary">Mini-Docs</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_VIDEOS.map(video => (
          <div key={video.id} className="group cursor-pointer flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur shadow-lg group-hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={20} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-1 text-xs font-medium text-white rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{video.category}</span>
              <h3 className="font-bold leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2 text-sm">
                {video.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                <span>{video.author}</span>
                <span>{(video.views / 1000).toFixed(1)}k vues</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
