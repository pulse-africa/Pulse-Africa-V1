import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateStudioVideo, useDeleteStudioVideo, useListStudioVideos, useUpdateStudioVideo } from '@workspace/api-client-react';
import type { StudioVideoInput, Video } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, PlayCircle, Search, Trash2, Edit } from 'lucide-react';
import SafeImage from '@/components/content/SafeImage';
import StudioContentDialog from '@/components/studio/StudioContentDialog';
import { StudioPageHeader } from '@/components/studio/StudioPrimitives';

export default function StudioVideos() {
  const queryClient = useQueryClient();
  const videosQuery = useListStudioVideos();
  const [search, setSearch] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Video>();
  const videos = (videosQuery.data ?? []).filter((video) => `${video.title} ${video.category} ${video.author}`.toLowerCase().includes(search.toLowerCase()));
  const refresh = () => queryClient.invalidateQueries({ queryKey: videosQuery.queryKey });
  const createVideo = useCreateStudioVideo({ mutation: { onSuccess: async () => { setEditorOpen(false); await refresh(); } } });
  const updateVideo = useUpdateStudioVideo({ mutation: { onSuccess: async () => { setEditorOpen(false); setEditing(undefined); await refresh(); } } });
  const deleteVideo = useDeleteStudioVideo({ mutation: { onSuccess: refresh } });
  const save = (value: StudioVideoInput) => editing ? updateVideo.mutate({ id: editing.id, data: value }) : createVideo.mutate({ data: value });
  const remove = (video: Video) => {
    if (window.confirm(`Supprimer définitivement « ${video.title} » ?`)) deleteVideo.mutate({ id: video.id });
  };

  return (
    <div className="space-y-6">
      <StudioPageHeader title="Vidéos" description="Gérez votre bibliothèque vidéo et ses métadonnées de diffusion." action={<Button onClick={() => { setEditing(undefined); setEditorOpen(true); }} className="bg-primary hover:bg-primary/90 text-white gap-2"><Plus size={16} /> Ajouter une vidéo</Button>} />
      <div className="relative w-full max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher une vidéo..." className="bg-card pl-9" /></div>
      {videosQuery.isLoading && <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">Chargement des vidéos...</div>}
      {videosQuery.isError && <div className="rounded-xl border border-destructive/40 bg-card p-10 text-center text-destructive">Impossible de charger les vidéos.</div>}
      {!videosQuery.isLoading && !videosQuery.isError && videos.length === 0 && <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucune vidéo ne correspond à cette recherche.</div>}
      {!videosQuery.isLoading && !videosQuery.isError && videos.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-video"><SafeImage src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"><PlayCircle size={34} className="text-white" /><span className="sr-only">Lire</span></div><div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">{video.duration}</div></div>
              <div className="space-y-3 p-5"><div><p className="text-xs font-bold uppercase tracking-wider text-primary">{video.category}</p><h2 className="mt-1 line-clamp-2 font-bold">{video.title}</h2><p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{video.description}</p></div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{video.views.toLocaleString('fr-FR')} vues</span><span>{video.author}</span></div><div className="flex gap-2 border-t border-border/70 pt-3"><Button variant="outline" size="sm" className="flex-1 border-border gap-2" onClick={() => { setEditing(video); setEditorOpen(true); }}><Edit size={14} /> Modifier</Button><Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => remove(video)} aria-label={`Supprimer ${video.title}`}><Trash2 size={14} /></Button></div></div>
            </div>
          ))}
        </div>
      )}
      {(createVideo.isError || updateVideo.isError || deleteVideo.isError) && <p className="text-sm text-destructive">Une opération sur la vidéo a échoué. Réessayez.</p>}
      <StudioContentDialog kind="video" record={editing} open={editorOpen} pending={createVideo.isPending || updateVideo.isPending} onOpenChange={setEditorOpen} onSubmit={(value) => save(value as StudioVideoInput)} />
    </div>
  );
}