import React from 'react';
import { MOCK_ARTICLES } from '@/data/mock';
import { Link } from 'wouter';
import { MessageSquare, Heart, Bookmark, Share2 } from 'lucide-react';

interface ArticleCardProps {
  article: typeof MOCK_ARTICLES[0];
  layout?: 'grid' | 'list';
}

export default function ArticleCard({ article, layout = 'grid' }: ArticleCardProps) {
  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row gap-6 py-6 border-b border-border last:border-0">
        <Link href={`/actualites/${article.slug}`} className="sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden shrink-0">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>
        <div className="flex-1 flex flex-col">
          <div className="flex gap-2 mb-2">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">{article.category}</span>
          </div>
          <Link href={`/actualites/${article.slug}`}>
            <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full" />
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <button className="hover:text-primary transition-colors"><Bookmark size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col h-full rounded-lg overflow-hidden border border-border bg-card">
      <Link href={`/actualites/${article.slug}`} className="aspect-video overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{article.category}</span>
        <Link href={`/actualites/${article.slug}`}>
          <h3 className="text-lg font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-3">
            {article.title}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
          <span className="text-xs text-muted-foreground font-medium">{article.readTime} min read</span>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs"><Heart size={14} /> {article.likes}</span>
            <span className="flex items-center gap-1 text-xs"><MessageSquare size={14} /> {article.commentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
