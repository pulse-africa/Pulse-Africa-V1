import React, { useEffect, useState } from 'react';
import type { Article, Show, StudioArticleInput, StudioShowInput, StudioVideoInput, Video } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContentKind = 'article' | 'video' | 'show';
type ContentRecord = Article | Video | Show;
type ContentInput = StudioArticleInput | StudioVideoInput | StudioShowInput;

type FormState = Record<string, string | number | boolean>;

function toDateInput(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
}

export default function StudioContentDialog({
  kind,
  record,
  open,
  pending,
  error,
  onOpenChange,
  onSubmit,
}: {
  kind: ContentKind;
  record?: ContentRecord;
  open: boolean;
  pending?: boolean;
  error?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (value: ContentInput) => void;
}) {
  const [form, setForm] = useState<FormState>({});

  useEffect(() => {
    if (!open) return;
    if (kind === 'article') {
      const article = record as Article | undefined;
      setForm({
        slug: article?.slug ?? '',
        title: article?.title ?? '',
        excerpt: article?.excerpt ?? '',
        content: article?.content ?? '',
        category: article?.category ?? 'Politique',
        authorName: article?.author.name ?? '',
        authorAvatar: article?.author.avatar ?? '',
        publishedAt: toDateInput(article?.publishedAt) || new Date().toISOString().slice(0, 16),
        readTime: article?.readTime ?? 5,
        imageUrl: article?.imageUrl ?? '',
        isBreaking: article?.isBreaking ?? false,
        isTrending: article?.isTrending ?? false,
      });
    } else if (kind === 'video') {
      const video = record as Video | undefined;
      setForm({
        title: video?.title ?? '',
        description: video?.description ?? '',
        category: video?.category ?? 'Culture',
        duration: video?.duration ?? '10:00',
        thumbnailUrl: video?.thumbnailUrl ?? '',
        publishedAt: toDateInput(video?.publishedAt) || new Date().toISOString().slice(0, 16),
        author: video?.author ?? 'Pulse Africa',
      });
    } else {
      const show = record as Show | undefined;
      setForm({
        title: show?.title ?? '',
        host: show?.host ?? '',
        schedule: show?.schedule ?? '',
        nextEpisode: show?.nextEpisode ?? new Date().toISOString(),
        coverUrl: show?.coverUrl ?? '',
        subscribers: show?.subscribers ?? 0,
        isLive: show?.isLive ?? false,
      });
    }
  }, [kind, open, record]);

  const set = (key: string, value: string | number | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const value = (key: string) => form[key] ?? '';
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (kind === 'article') {
      onSubmit({
        slug: String(value('slug')),
        title: String(value('title')),
        excerpt: String(value('excerpt')),
        content: String(value('content')) || null,
        category: String(value('category')),
        authorName: String(value('authorName')),
        authorAvatar: String(value('authorAvatar')),
        publishedAt: new Date(String(value('publishedAt'))).toISOString(),
        readTime: Number(value('readTime')),
        imageUrl: String(value('imageUrl')),
        isBreaking: Boolean(value('isBreaking')),
        isTrending: Boolean(value('isTrending')),
      });
    } else if (kind === 'video') {
      onSubmit({
        title: String(value('title')),
        description: String(value('description')),
        category: String(value('category')),
        duration: String(value('duration')),
        thumbnailUrl: String(value('thumbnailUrl')),
        publishedAt: new Date(String(value('publishedAt'))).toISOString(),
        author: String(value('author')),
      });
    } else {
      onSubmit({
        title: String(value('title')),
        host: String(value('host')),
        schedule: String(value('schedule')),
        nextEpisode: new Date(String(value('nextEpisode'))).toISOString(),
        coverUrl: String(value('coverUrl')),
        subscribers: Number(value('subscribers')),
        isLive: Boolean(value('isLive')),
      });
    }
  };

  const title = record ? `Modifier ${kind === 'article' ? "l’article" : kind === 'video' ? 'la vidéo' : "l’émission"}` : `Nouvel ${kind === 'article' ? 'article' : kind === 'video' ? 'vidéo' : 'émission'}`;
  const textField = (key: string, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <label className="space-y-2 text-sm font-medium">
      {label}
      <Input {...props} value={String(value(key))} onChange={(event) => set(key, event.target.value)} className="bg-background" required />
    </label>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Les champs obligatoires sont validés avant l’enregistrement.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-5">
          {kind === 'article' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {textField('title', 'Titre')}
                {textField('slug', 'Slug')}
                {textField('category', 'Catégorie')}
                {textField('authorName', 'Auteur')}
                {textField('authorAvatar', 'Avatar auteur', { type: 'url' })}
                {textField('imageUrl', 'Image principale', { type: 'url' })}
                {textField('publishedAt', 'Publication', { type: 'datetime-local' })}
                {textField('readTime', 'Temps de lecture (minutes)', { type: 'number', min: 1 })}
              </div>
              <label className="space-y-2 text-sm font-medium">Extrait<Textarea value={String(value('excerpt'))} onChange={(event) => set('excerpt', event.target.value)} className="bg-background" required /></label>
              <label className="space-y-2 text-sm font-medium">Contenu HTML<Textarea value={String(value('content'))} onChange={(event) => set('content', event.target.value)} className="min-h-32 bg-background" /></label>
              <div className="flex flex-wrap gap-5 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value('isBreaking'))} onChange={(event) => set('isBreaking', event.target.checked)} className="accent-red-700" /> À la une</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value('isTrending'))} onChange={(event) => set('isTrending', event.target.checked)} className="accent-red-700" /> Tendance</label>
              </div>
            </>
          )}
          {kind === 'video' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {textField('title', 'Titre')}
                {textField('category', 'Catégorie')}
                {textField('duration', 'Durée', { placeholder: '12:30' })}
                {textField('author', 'Crédit / auteur')}
                {textField('thumbnailUrl', 'Miniature', { type: 'url' })}
                {textField('publishedAt', 'Publication', { type: 'datetime-local' })}
              </div>
              <label className="space-y-2 text-sm font-medium">Description<Textarea value={String(value('description'))} onChange={(event) => set('description', event.target.value)} className="bg-background" required /></label>
            </>
          )}
          {kind === 'show' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {textField('title', 'Nom de l’émission')}
              {textField('host', 'Présentateur')}
              {textField('schedule', 'Rendez-vous')}
              {textField('nextEpisode', 'Prochain épisode', { type: 'datetime-local' })}
              {textField('coverUrl', 'Visuel', { type: 'url' })}
              {textField('subscribers', 'Abonnés', { type: 'number', min: 0 })}
              <label className="flex items-center gap-2 self-end pb-2 text-sm"><input type="checkbox" checked={Boolean(value('isLive'))} onChange={(event) => set('isLive', event.target.checked)} className="accent-red-700" /> En direct</label>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border">Annuler</Button>
            <Button type="submit" disabled={pending} className="bg-primary hover:bg-primary/90">{pending ? 'Enregistrement...' : 'Enregistrer'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}