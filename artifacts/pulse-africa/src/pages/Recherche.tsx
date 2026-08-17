import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/mock';
import ArticleCard from '@/components/content/ArticleCard';

export default function Recherche() {
  const [query, setQuery] = useState('');
  
  const results = query.length > 2 
    ? MOCK_ARTICLES.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Recherche</h1>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="search"
            className="block w-full bg-card border-2 border-border rounded-full py-4 pl-14 pr-4 text-lg focus:outline-none focus:border-primary transition-colors shadow-sm"
            placeholder="Rechercher des articles, des vidéos, des auteurs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        {query.length === 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Recherches fréquentes:</span>
            {['Économie', 'Naira', 'CAN 2025', 'Climat'].map(term => (
              <button key={term} className="text-xs bg-muted hover:bg-muted/80 border border-border px-3 py-1 rounded-full transition-colors" onClick={() => setQuery(term)}>
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {query.length > 2 && (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold mb-6 border-b border-border pb-2">
            {results.length} résultat{results.length !== 1 ? 's' : ''} pour "{query}"
          </h2>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground text-lg mb-2">Aucun résultat trouvé pour "{query}"</p>
              <p className="text-sm">Essayez d'autres mots-clés ou vérifiez l'orthographe.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
