import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { useGetArticle, useListArticles } from '@workspace/api-client-react';
import SafeImage from '@/components/content/SafeImage';
import ContentInteractions from '@/components/content/ContentInteractions';
import CommentSection from '@/components/content/CommentSection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ActualiteDetail() {
  const [, params] = useRoute('/actualites/:slug');
  const articleQuery = useGetArticle(params?.slug ?? '');
  const articlesQuery = useListArticles();
  const article = articleQuery.data;
  
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (article) setCommentsCount(article.commentsCount);
  }, [article]);

  if (articleQuery.isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">Chargement de l'article...</div>;
  }
  if (articleQuery.isError || !article) {
    return <div className="container mx-auto px-4 py-16 text-center text-destructive">Cet article est introuvable ou indisponible.</div>;
  }

  return (
    <article className="w-full">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-muted">
        <SafeImage src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-2xl mb-8">
              
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">
                {article.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-border mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg leading-none">{article.author.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">Éditeur associé • {article.readTime} min de lecture</div>
                  </div>
                </div>

                <ContentInteractions
                  contentId={`article:${article.id}`}
                  title={article.title}
                  authorName={article.author.name}
                  likesCount={article.likes}
                  commentsCount={commentsCount}
                  onCommentsClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                />
              </div>

              {/* Prose Content */}
              {article.content ? (
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-muted-foreground text-lg leading-relaxed">{article.excerpt}</p>
              )}

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#Afrique</span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#{article.category}</span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#Actualité</span>
              </div>
            </div>

            {/* Comments Section (Simulated) */}
            <div id="comments">
              <CommentSection articleId={article.id} initialCount={article.commentsCount} onCountChange={setCommentsCount} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <h3 className="font-black uppercase tracking-wider text-lg mb-6 border-b border-border pb-2">Dans la même catégorie</h3>
              <div className="flex flex-col gap-6">
                {(articlesQuery.data ?? []).filter(a => a.category === article.category && a.id !== article.id).slice(0, 3).map(related => (
                  <div key={related.id} className="group cursor-pointer">
                    <div className="aspect-[16/9] rounded-md overflow-hidden mb-3">
                      <SafeImage src={related.imageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-serif font-bold text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                      {related.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{new Date(related.publishedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
