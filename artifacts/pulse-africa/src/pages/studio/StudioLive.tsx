import React, { useEffect, useState } from 'react';
import { Activity, Eye, Mic2, Radio, Square, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudioPageHeader, MetricCard, StatusBadge } from '@/components/studio/StudioPrimitives';
import SafeImage from '@/components/content/SafeImage';

export default function StudioLive() {
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(12450);

  useEffect(() => {
    const timer = window.setInterval(() => setViewers((value) => value + (Math.random() > 0.45 ? 1 : -1)), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <StudioPageHeader
        title="Live"
        description="Supervisez les directs et préparez les prochaines antennes."
        action={
          <Button className={isLive ? 'bg-primary hover:bg-primary/90' : 'bg-emerald-600 hover:bg-emerald-500'} onClick={() => setIsLive((value) => !value)}>
            {isLive ? <><Square size={15} className="mr-2" /> Arrêter le direct</> : <><Radio size={15} className="mr-2" /> Démarrer le direct</>}
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Spectateurs actuels" value={viewers.toLocaleString()} detail="+8,4% depuis 1 h" icon={Users} tone="red" />
        <MetricCard label="Temps de visionnage" value="42 h 18" detail="+12,7% aujourd’hui" icon={Eye} tone="gold" />
        <MetricCard label="Qualité du signal" value="1080p" detail="Signal stable" icon={Activity} tone="green" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="overflow-hidden border-border bg-card">
          <div className="relative aspect-video bg-zinc-950">
            <SafeImage src="https://images.unsplash.com/photo-1577960613240-62dfeb479366?w=1400&auto=format&fit=crop&q=80" alt="Aperçu du direct" className="h-full w-full object-cover opacity-70" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> {isLive ? 'En direct' : 'Hors antenne'}
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/70">Antenne principale</p>
                <h2 className="mt-1 text-xl font-bold text-white">Le Grand Journal d’Afrique</h2>
              </div>
              <span className="rounded bg-black/70 px-3 py-1 text-sm text-white">{viewers.toLocaleString()} spectateurs</span>
            </div>
          </div>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="font-bold">Édition spéciale — sommet de l’UA</p>
              <p className="mt-1 text-sm text-muted-foreground">Studio Addis-Abeba · Marie-Laure N’Goran</p>
            </div>
            <Button variant="outline" className="border-border gap-2"><Mic2 size={15} /> Configurer l’antenne</Button>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader><CardTitle>Prochaines antennes</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {[
              ['18:30', 'Africa Tech Review', 'Rebecca Enonchong'],
              ['20:00', 'Le Débat Panafricain', 'Alain Foka'],
              ['Demain', 'Génération Entreprendre', 'Vusi Thembekwayo'],
            ].map(([time, title, host]) => (
              <div key={title} className="flex items-start justify-between gap-3 border-b border-border/70 pb-4 last:border-0 last:pb-0">
                <div><p className="text-xs font-bold text-primary">{time}</p><p className="mt-1 font-semibold">{title}</p><p className="text-xs text-muted-foreground">{host}</p></div>
                <StatusBadge status="Programmé" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}