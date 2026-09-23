import React from 'react';
import { MOCK_ARTICLES } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SafeImage from '@/components/content/SafeImage';

export default function StudioArticles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">Gérez vos publications, brouillons et archives.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus size={16} /> Nouvel Article
        </Button>
      </div>

      <div className="border border-border rounded-md bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Titre</th>
                <th className="px-6 py-4 font-medium">Auteur</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">Vues</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ARTICLES.map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground max-w-[300px] truncate">
                    {article.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <SafeImage src={article.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                      {article.author.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{article.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-green-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Publié
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Edit size={14} /> Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Eye size={14} /> Voir sur le site</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive"><Trash2 size={14} /> Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
