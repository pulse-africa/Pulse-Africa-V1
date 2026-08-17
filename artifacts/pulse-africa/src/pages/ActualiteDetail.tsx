import React, { useState } from 'react';
import { useRoute } from 'wouter';
import { MOCK_ARTICLES } from '@/data/mock';
import { Heart, MessageSquare, Bookmark, Share2, Facebook, Twitter, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function ActualiteDetail() {
  const [, params] = useRoute('/actualites/:slug');
  const article = MOCK_ARTICLES.find(a => a.slug === params?.slug) || MOCK_ARTICLES[0];
  
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className="w-full">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-muted">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
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

                {/* Interactions Row */}
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-full border border-border">
                  <Button variant="ghost" size="icon" className={`rounded-full ${liked ? 'text-primary' : 'text-foreground'}`} onClick={handleLike}>
                    <Heart size={20} className={liked ? "fill-primary" : ""} />
                    <span className="sr-only">Like</span>
                  </Button>
                  <span className="text-sm font-bold pr-2">{likesCount}</span>
                  
                  <div className="w-px h-6 bg-border mx-1"></div>
                  
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MessageSquare size={20} />
                  </Button>
                  <span className="text-sm font-bold pr-2">{article.commentsCount}</span>
                  
                  <div className="w-px h-6 bg-border mx-1"></div>

                  <Button variant="ghost" size="icon" className={`rounded-full ${bookmarked ? 'text-primary' : 'text-foreground'}`} onClick={() => setBookmarked(!bookmarked)}>
                    <Bookmark size={20} className={bookmarked ? "fill-primary" : ""} />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2"><LinkIcon size={16} /> Copier le lien</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Twitter size={16} /> Twitter / X</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Facebook size={16} /> Facebook</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Prose Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content || `<p class="lead">${article.excerpt}</p><p>Contenu détaillé simulé pour cet article. Dans un vrai scénario, le corps HTML complet de l'article provenant d'un CMS s'afficherait ici. L'esthétique reste sombre, lisible et élégante, mettant en valeur la typographie.</p><p>Le design éditorial est pensé pour le confort de lecture long format. Le contraste est adouci (texte pas 100% blanc) pour éviter la fatigue visuelle.</p>` }}
              />

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#Afrique</span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#{article.category}</span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">#Actualité</span>
              </div>
            </div>

            {/* Comments Section (Simulated) */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-10 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Commentaires <span className="text-muted-foreground text-lg">({article.commentsCount})</span>
              </h3>
              
              <div className="flex gap-4 mb-10">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback>VO</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <textarea 
                    className="w-full bg-background border border-border rounded-md p-4 text-sm focus:outline-none focus:border-primary resize-none h-24"
                    placeholder="Partagez votre point de vue..."
                  />
                  <div className="flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Publier</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">Lecteur {i}</span>
                        <span className="text-xs text-muted-foreground">Il y a {i*2} heures</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                        Analyse très pertinente. Il est crucial que ces initiatives continentales se concrétisent au-delà des traités sur papier.
                      </p>
                      <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Répondre</button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 border-border">Voir tous les commentaires</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <h3 className="font-black uppercase tracking-wider text-lg mb-6 border-b border-border pb-2">Dans la même catégorie</h3>
              <div className="flex flex-col gap-6">
                {MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3).map(related => (
                  <div key={related.id} className="group cursor-pointer">
                    <div className="aspect-[16/9] rounded-md overflow-hidden mb-3">
                      <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
