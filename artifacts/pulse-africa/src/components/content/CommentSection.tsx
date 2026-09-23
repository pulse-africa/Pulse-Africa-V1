import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateComment, useListComments } from '@workspace/api-client-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function CommentSection({
  articleId,
  initialCount = 0,
  onCountChange,
}: {
  articleId: string;
  initialCount?: number;
  onCountChange?: (count: number) => void;
}) {
  const [value, setValue] = useState('');
  const [displayCount, setDisplayCount] = useState(initialCount);
  const queryClient = useQueryClient();
  const commentsQuery = useListComments({ articleId });
  const createComment = useCreateComment({
    mutation: {
      onSuccess: async () => {
        setValue('');
        await queryClient.invalidateQueries({ queryKey: commentsQuery.queryKey });
        setDisplayCount((count) => {
          const nextCount = count + 1;
          onCountChange?.(nextCount);
          return nextCount;
        });
      },
    },
  });
  const comments = commentsQuery.data ?? [];

  const publish = (event: React.FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    createComment.mutate({
      data: { articleId, user: 'Koffi Diallo', text },
    });
  };

  return (
    <section className="bg-card border border-border rounded-xl p-6 md:p-10 mb-8">
      <h3 className="text-2xl font-bold mb-6">
        Commentaires <span className="text-muted-foreground text-lg">({displayCount})</span>
      </h3>
      <form onSubmit={publish} className="flex gap-4 mb-10">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full bg-background border border-border rounded-md p-4 text-sm focus:outline-none focus:border-primary resize-none h-24"
            placeholder="Partagez votre point de vue..."
            aria-label="Votre commentaire"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={createComment.isPending} className="bg-primary hover:bg-primary/90 text-white">
              {createComment.isPending ? 'Publication...' : 'Publier'}
            </Button>
          </div>
        </div>
      </form>
      {commentsQuery.isLoading && <p className="text-sm text-muted-foreground">Chargement des commentaires...</p>}
      {commentsQuery.isError && <p className="text-sm text-destructive">Les commentaires ne sont pas disponibles pour le moment.</p>}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={comment.avatar ?? undefined} />
                <AvatarFallback>{comment.user.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{comment.user}</span>
                <span className="text-xs text-muted-foreground">{comment.time}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{comment.text}</p>
              <button className="text-xs font-bold text-muted-foreground hover:text-foreground mt-2">Répondre</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}