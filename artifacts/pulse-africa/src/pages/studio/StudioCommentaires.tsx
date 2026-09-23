import React, { useState } from 'react';
import { Check, MessageSquare, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STUDIO_COMMENTS } from '@/data/studio';
import { MetricCard, StudioPageHeader, StudioTable, StatusBadge } from '@/components/studio/StudioPrimitives';

export default function StudioCommentaires() {
  const [comments, setComments] = useState(STUDIO_COMMENTS);
  const updateStatus = (id: string, status: string) => setComments((current) => current.map((comment) => comment.id === id ? { ...comment, status } : comment));

  return (
    <div className="space-y-6">
      <StudioPageHeader title="Commentaires" description="Modérez les conversations de la communauté Pulse Africa." />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="À modérer" value={String(comments.filter((comment) => comment.status === 'En attente').length)} detail="Nouveaux commentaires" icon={MessageSquare} tone="gold" />
        <MetricCard label="Approuvés aujourd’hui" value="284" detail="+12,8% vs hier" icon={Check} tone="green" />
        <MetricCard label="Signalements" value="18" detail="4 prioritaires" icon={X} tone="red" />
      </div>
      <StudioTable headers={['Auteur', 'Commentaire', 'Article associé', 'Statut', 'Date', 'Actions']}>
        {comments.map((comment) => (
          <tr key={comment.id} className="hover:bg-muted/20">
            <td className="px-5 py-4 font-semibold">{comment.user}</td>
            <td className="max-w-[280px] truncate px-5 py-4 text-muted-foreground">{comment.content}</td>
            <td className="max-w-[220px] truncate px-5 py-4 text-muted-foreground">{comment.article}</td>
            <td className="px-5 py-4"><StatusBadge status={comment.status} /></td>
            <td className="px-5 py-4 text-muted-foreground">{comment.time}</td>
            <td className="px-5 py-4"><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="text-emerald-400" onClick={() => updateStatus(comment.id, 'Approuvé')}><Check size={16} /></Button><Button variant="ghost" size="icon" className="text-primary" onClick={() => updateStatus(comment.id, 'Rejeté')}><X size={16} /></Button><Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button></div></td>
          </tr>
        ))}
      </StudioTable>
    </div>
  );
}