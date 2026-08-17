import React from 'react';
import { MOCK_TRENDING_HASHTAGS, MOCK_ARTICLES } from '@/data/mock';
import { Link } from 'wouter';
import { TrendingUp, Activity, Hash } from 'lucide-react';

export default function Tendances() {
  const trendingArticles = MOCK_ARTICLES.filter(a => a.isTrending);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-10">
        <TrendingUp className="text-primary" size={32} />
        <h1 className="text-4xl font-black uppercase tracking-tighter">Tendances</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col - Hashtags */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-border pb-4">
              <Activity size={18} className="text-primary" />
              Sujets Chauds (24h)
            </h2>
            
            <div className="space-y-4">
              {MOCK_TRENDING_HASHTAGS.sort((a,b) => b.posts - a.posts).map((tag, idx) => (
                <div key={tag.tag} className="group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary/40 transition-colors w-6">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        <Hash size={14} className="text-muted-foreground" />
                        {tag.tag}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{(tag.posts / 1000).toFixed(1)}k mentions</div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-muted/50 rounded-sm relative overflow-hidden">
                    {/* Simulated sparkline */}
                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-primary/20 rounded-t-sm"></div>
                    <div className="absolute bottom-0 left-0 h-full w-2 bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Trending Articles */}
        <div className="lg:col-span-8">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-border pb-4">
            Articles les plus discutés
          </h2>
          
          <div className="space-y-6">
            {trendingArticles.map(article => (
              <Link key={article.id} href={`/actualites/${article.slug}`} className="group flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
                <div className="sm:w-48 aspect-video rounded-md overflow-hidden shrink-0">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex gap-2 mb-2">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-sm">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1"><TrendingUp size={12} className="text-primary" /> {article.views.toLocaleString()} vues</span>
                    <span>•</span>
                    <span>{article.commentsCount} commentaires</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
