import React, { useState } from 'react';
import { useListArticles } from '@workspace/api-client-react';
import ArticleCard from '@/components/content/ArticleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES = ['Politique', 'Économie', 'Sport', 'Culture', 'Tech', 'Santé', 'Environnement', 'Monde'] as const;

export default function Actualites() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number] | 'Tous'>('Tous');
  const articlesQuery = useListArticles();
  const articles = articlesQuery.data ?? [];
  
  const filteredArticles = articles.filter(
    a => activeCategory === 'Tous' || a.category === activeCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Filters */}
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-6">Actualités</h1>
        
        <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
          <Button 
            variant={activeCategory === 'Tous' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('Tous')}
            className={activeCategory === 'Tous' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-transparent border-border text-foreground hover:border-primary hover:text-primary'}
            size="sm"
          >
            Tous
          </Button>
          {CATEGORIES.map(cat => (
            <Button 
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'} 
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'bg-primary text-white hover:bg-primary/90' : 'bg-transparent border-border text-foreground hover:border-primary hover:text-primary'}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {articlesQuery.isLoading && <div className="py-12 text-center text-muted-foreground">Chargement des articles...</div>}
      {articlesQuery.isError && <div className="py-12 text-center text-destructive">Les articles sont indisponibles pour le moment.</div>}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-0">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} layout="list" />
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-lg">
                Aucun article trouvé pour cette catégorie.
              </div>
            )}
          </div>
          
          {filteredArticles.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" className="w-full max-w-sm border-border hover:bg-accent">
                Charger plus d'articles
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Newsletter Box */}
          <div className="bg-card border border-border p-6 rounded-lg text-center">
            <h3 className="font-bold text-lg mb-2">Restez informé</h3>
            <p className="text-sm text-muted-foreground mb-4">L'essentiel de l'actualité africaine, tous les matins.</p>
            <div className="space-y-2">
              <Input placeholder="Votre email" className="bg-background" />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">S'inscrire</Button>
            </div>
          </div>

          {/* Most Read (Trending) */}
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted p-4 border-b border-border">
              <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                Les plus lus
              </h3>
            </div>
            <div className="flex flex-col p-4 gap-4">
              {articles.filter(a => a.isTrending).map((article, idx) => (
                <div key={article.id} className="flex gap-4 items-start group cursor-pointer">
                  <span className="text-3xl font-black text-muted-foreground/30 font-serif leading-none mt-1 group-hover:text-primary/40 transition-colors">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold font-serif text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
