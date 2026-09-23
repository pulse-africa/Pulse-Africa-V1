import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateStudioShow, useDeleteStudioShow, useListStudioShows, useUpdateStudioShow } from '@workspace/api-client-react';
import type { Show, StudioShowInput } from '@workspace/api-client-react';
import { CalendarClock, Edit3, MonitorPlay, Plus, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { StudioPageHeader, StatusBadge } from '@/components/studio/StudioPrimitives';
import SafeImage from '@/components/content/SafeImage';
import StudioContentDialog from '@/components/studio/StudioContentDialog';

export default function StudioEmissions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const showsQuery = useListStudioShows();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Show>();
  const shows = showsQuery.data ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey: showsQuery.queryKey });
  const createShow = useCreateStudioShow({ mutation: { onSuccess: async () => { setEditorOpen(false); await refresh(); } } });
  const updateShow = useUpdateStudioShow({ mutation: { onSuccess: async () => { setEditorOpen(false); setEditing(undefined); await refresh(); } } });
  const deleteShow = useDeleteStudioShow({ mutation: { onSuccess: refresh } });
  const save = (value: StudioShowInput) => editing ? updateShow.mutate({ id: editing.id, data: value }) : createShow.mutate({ data: value });
  const remove = (show: Show) => {
    if (window.confirm(`Supprimer définitivement « ${show.title} » ?`)) deleteShow.mutate({ id: show.id, });
  };

  return (
    <div className="space-y-6">
      <StudioPageHeader title="Émissions" description="Organisez les rendez-vous éditoriaux de Pulse Africa." action={<Button onClick={() => { setEditing(undefined); setEditorOpen(true); }} className="bg-primary hover:bg-primary/90"><Plus size={15} className="mr-2" /> Nouvelle émission</Button>} />
      {showsQuery.isLoading && <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">Chargement des émissions...</div>}
      {showsQuery.isError && <div className="rounded-xl border border-destructive/40 bg-card p-10 text-center text-destructive">Impossible de charger les émissions.</div>}
      {!showsQuery.isLoading && !showsQuery.isError && shows.length === 0 && <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucune émission programmée.</div>}
      {!showsQuery.isLoading && !showsQuery.isError && shows.length > 0 && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {shows.map((show) => (
          <Card key={show.id} className="overflow-hidden border-border bg-card">
            <div className="relative aspect-[4/3]"><SafeImage src={show.coverUrl} alt={show.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" /><div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2"><h2 className="font-bold text-white">{show.title}</h2>{show.isLive && <StatusBadge status="En direct" />}</div></div>
            <CardContent className="space-y-3 p-4"><p className="text-sm text-muted-foreground">Avec {show.host}</p><div className="flex items-center justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1"><CalendarClock size={14} /> {show.schedule}</span><span className="flex items-center gap-1"><Users size={14} /> {Math.floor(show.subscribers / 1000)}k</span></div><div className="flex gap-2"><Button variant="outline" size="sm" className="flex-1 border-border gap-2" onClick={() => { setEditing(show); setEditorOpen(true); }}><Edit3 size={14} /> Modifier</Button><Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => remove(show)} aria-label={`Supprimer ${show.title}`}><Trash2 size={14} /></Button></div></CardContent>
          </Card>
        ))}
      </div>}
      {shows.length > 0 && <Card className="border-border bg-card"><CardContent className="flex items-center gap-4 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><MonitorPlay size={20} /></div><div><p className="font-bold">Programmation de la semaine</p><p className="text-sm text-muted-foreground">{shows.length} émission{shows.length !== 1 ? 's' : ''} active{shows.length !== 1 ? 's' : ''} · {shows.filter((show) => show.isLive).length} en direct</p></div></CardContent></Card>}
      {(createShow.isError || updateShow.isError || deleteShow.isError) && <p className="text-sm text-destructive">Une opération sur l’émission a échoué. Réessayez.</p>}
      <StudioContentDialog kind="show" record={editing} open={editorOpen} pending={createShow.isPending || updateShow.isPending} onOpenChange={setEditorOpen} onSubmit={(value) => save(value as StudioShowInput)} />
    </div>
  );
}