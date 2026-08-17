import React from 'react';
import { MOCK_VIDEOS } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, PlayCircle } from 'lucide-react';

export default function StudioVideos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vidéos</h1>
          <p className="text-muted-foreground">Gérez votre bibliothèque vidéo.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus size={16} /> Ajouter une vidéo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_VIDEOS.map(video => (
          <div key={video.id} className="bg-card border border-border rounded-lg overflow-hidden group">
            <div className="relative aspect-video">
              <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={32} className="text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-xs rounded text-white font-medium">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">{video.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                <span>{video.views.toLocaleString()} vues</span>
                <span className="bg-muted px-2 py-0.5 rounded">{video.category}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="w-full text-xs h-8">Modifier</Button>
                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-destructive/30 text-destructive hover:bg-destructive/10">Supprimer</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
