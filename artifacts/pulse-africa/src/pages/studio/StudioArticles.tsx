import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateStudioArticle, useDeleteStudioArticle, useListStudioArticles, useUpdateStudioArticle } from '@workspace/api-client-react';
import type { Article, StudioArticleInput } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, MoreHorizontal, Edit, Trash2, Eye, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SafeImage from '@/components/content/SafeImage';
import StudioContentDialog from '@/components/studio/StudioContentDialog';
import { StudioPageHeader, StatusBadge } from '@/components/studio/StudioPrimitives';

export default function StudioArticles() {
  const queryClient = useQueryClient();
  const articlesQuery = useListStudioArticles();
  const [search, setSearch] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Article>();
  const [editorError, setEditorError] = useState('');
  const articles = articlesQuery.data ?? [];
  const visibleArticles = articles.filter((article) => `${article.title} ${article.category} ${article.author.name}`.toLowerCase().includes(search.toLowerCase()));

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: articlesQuery.queryKey });
  };
  const createArticle = useCreateStudioArticle({ mutation: { onSuccess: async () => { setEditorOpen(false); setEditorError(''); await refresh(); } } });
  const updateArticle = useUpdateStudioArticle({ mutation: { onSuccess: async () => { setEditorOpen(false); setEditing(undefined); setEditorError(''); await refresh(); } } });
  const deleteArticle = useDeleteStudioArticle({ mutation: { onSuccess: refresh } });
  const pending = createArticle.isPending || updateArticle.isPending;

  const save = (value: StudioArticleInput) => {
    setEditorError('');
    if (editing) updateArticle.mutate({ id: editing.id, data: value });
    else createArticle.mutate({ data: value });
  };
  const openCreate = () => { setEditing(undefined); setEditorError(''); setEditorOpen(true); };
  const openEdit = (article: Article) => { setEditing(article); setEditorError(''); setEditorOpen(true); };
  const remove = (article: Article) => {
    if (window.confirm(`Supprimer définitivement « ${article.title} » ?`)) deleteArticle.mutate({ id: article.id });
  };

  return (
    <div className="space-y-6">
      <StudioPageHeader
        title="Articles"
        description="Gérez vos publications, leurs signaux éditoriaux et leurs performances."
        action={<Button onClick={openCreate} className="bg-primary hover:bg-primary/90 text-white gap-2"><Plus size={16} /> Nouvel article</Button>}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un article..." className="bg-card pl-9" />
        </div>
        <p className="text-sm text-muted-foreground">{visibleArticles.length} article{visibleArticles.length !== 1 ? 's' : ''}</p>
      </div>
      {articlesQuery.isLoading && <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">Chargement des articles...</div>}
      {articlesQuery.isError && <div className="rounded-xl border border-destructive/40 bg-card p-10 text-center text-destructive">Impossible de charger les articles.</div>}
      {!articlesQuery.isLoading && !articlesQuery.isError && visibleArticles.length === 0 && <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Aucun article ne correspond à cette recherche.</div>}
      {!articlesQuery.isLoading && !articlesQuery.isError && visibleArticles.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="px-5 py-4">Article</th><th className="px-5 py-4">Auteur</th><th className="px-5 py-4">Catégorie</th><th className="px-5 py-4">Statut</th><th className="px-5 py-4">Vues</th><th className="px-5 py-4 text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-border/70">
              {visibleArticles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/20">
                  <td className="max-w-[330px] px-5 py-4"><div className="flex items-center gap-3"><SafeImage src={article.imageUrl} alt="" className="h-11 w-16 rounded object-cover" /><div><p className="truncate font-semibold">{article.title}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</p></div></div></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><SafeImage src={article.author.avatar} alt="" className="h-7 w-7 rounded-full" /><span>{article.author.name}</span></div></td>
                  <td className="px-5 py-4"><span className="rounded bg-muted px-2 py-1 text-xs">{article.category}</span></td>
                  <td className="px-5 py-4"><StatusBadge status={article.isBreaking ? 'À la une' : 'Publié'} /></td>
                  <td className="px-5 py-4 text-muted-foreground">{article.views.toLocaleString('fr-FR')}</td>
                  <td className="px-5 py-4 text-right"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="text-muted-foreground"><MoreHorizontal size={17} /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(article)} className="gap-2"><Edit size={14} /> Modifier</DropdownMenuItem>
                    <DropdownMenuItem asChild className="gap-2"><Link href={`/actualites/${article.slug}`}><Eye size={14} /> Voir sur le site</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => remove(article)} className="gap-2 text-destructive focus:text-destructive"><Trash2 size={14} /> Supprimer</DropdownMenuItem>
                  </DropdownMenuContent></DropdownMenu></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {(createArticle.isError || updateArticle.isError || deleteArticle.isError) && <p className="text-sm text-destructive">{editorError || 'Une opération Studio a échoué. Vérifiez les champs et réessayez.'}</p>}
      <StudioContentDialog kind="article" record={editing} open={editorOpen} pending={pending} error={editorError} onOpenChange={setEditorOpen} onSubmit={(value) => save(value as StudioArticleInput)} />
    </div>
  );
}