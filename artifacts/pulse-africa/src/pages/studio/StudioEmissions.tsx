import React from 'react';
import { CalendarClock, Edit3, MonitorPlay, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_SHOWS } from '@/data/mock';
import { StudioPageHeader, StatusBadge } from '@/components/studio/StudioPrimitives';
import SafeImage from '@/components/content/SafeImage';

export default function StudioEmissions() {
  return (
    <div className="space-y-6">
      <StudioPageHeader title="Émissions" description="Organisez les rendez-vous éditoriaux de Pulse Africa." action={<Button className="bg-primary hover:bg-primary/90"><Plus size={15} className="mr-2" /> Nouvelle émission</Button>} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {MOCK_SHOWS.map((show) => (
          <Card key={show.id} className="overflow-hidden border-border bg-card">
            <div className="relative aspect-[4/3]">
              <SafeImage src={show.coverUrl} alt={show.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <h2 className="font-bold text-white">{show.title}</h2>
                {show.isLive && <StatusBadge status="En direct" />}
              </div>
            </div>
            <CardContent className="space-y-3 p-4">
              <p className="text-sm text-muted-foreground">Avec {show.host}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarClock size={14} /> {show.schedule}</span>
                <span className="flex items-center gap-1"><Users size={14} /> {Math.floor(show.subscribers / 1000)}k</span>
              </div>
              <Button variant="outline" size="sm" className="w-full border-border gap-2"><Edit3 size={14} /> Modifier la fiche</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border bg-card">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><MonitorPlay size={20} /></div>
          <div><p className="font-bold">Programmation de la semaine</p><p className="text-sm text-muted-foreground">4 émissions actives · 12 épisodes programmés</p></div>
        </CardContent>
      </Card>
    </div>
  );
}