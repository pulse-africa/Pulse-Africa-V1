import React from 'react';
import { MOCK_ARTICLES, MOCK_VIDEOS, MOCK_SHOWS, MOCK_TRENDING_HASHTAGS } from '@/data/mock';
import { Link } from 'wouter';
import { ChevronRight, Play } from 'lucide-react';
import ArticleCard from '@/components/content/ArticleCard';

export default function Home() {
  const breakingNews = MOCK_ARTICLES.find(a => a.isBreaking) || MOCK_ARTICLES[0];
  const topStories = MOCK_ARTICLES.filter(a => a.id !== breakingNews.id).slice(0, 4);
  const featuredVideos = MOCK_VIDEOS.slice(0, 3);
  const recommendedShows = MOCK_SHOWS.slice(0, 4);

  return (
    <div className="w-full">
      {/* Ticker */}
      <div className="bg-primary text-primary-foreground text-xs font-bold py-2 px-4 overflow-hidden flex whitespace-nowrap">
        <div className="bg-background text-foreground px-2 py-0.5 rounded-sm mr-4 shrink-0 uppercase tracking-wider text-[10px]">Breaking News</div>
        <div className="animate-marquee inline-block">
          {MOCK_ARTICLES.map(a => a.title).join(' • ')}
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Article */}
          <div className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-lg">
            <Link href={`/actualites/${breakingNews.slug}`} className="block h-full">
              <div className="absolute inset-0">
                <img 
                  src={breakingNews.imageUrl} 
                  alt={breakingNews.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              </div>
              <div className="relative h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-end p-6 md:p-8">
                <div className="flex gap-3 mb-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {breakingNews.category}
                  </span>
                  <span className="bg-black/50 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    À LA UNE
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-gray-200 transition-colors">
                  {breakingNews.title}
                </h1>
                <p className="text-gray-300 md:text-lg max-w-3xl line-clamp-2 md:line-clamp-3 mb-6">
                  {breakingNews.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <img src={breakingNews.author.avatar} className="w-6 h-6 rounded-full" alt={breakingNews.author.name} />
                    <span>{breakingNews.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>{breakingNews.readTime} min de lecture</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Top Stories Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">Top Stories</h2>
            </div>
            
            <div className="flex flex-col gap-6 h-full">
              {topStories.map((article, idx) => (
                <div key={article.id} className="group relative flex gap-4 border-b border-border/50 pb-6 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">
                      {article.category}
                    </span>
                    <Link href={`/actualites/${article.slug}`}>
                      <h3 className="text-lg font-serif font-bold leading-snug group-hover:text-primary transition-colors mb-2">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="text-xs text-muted-foreground flex gap-2">
                      <span>{article.readTime} min</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  <Link href={`/actualites/${article.slug}`} className="w-24 h-24 shrink-0 overflow-hidden rounded-md">
                    <img 
                      src={article.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Strip */}
      <section className="bg-card border-y border-border py-6 my-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <h2 className="text-xl font-black italic tracking-tighter shrink-0 flex items-center gap-2">
              <span className="text-primary">#</span> TENDANCES
            </h2>
            <div className="flex flex-wrap gap-3 w-full">
              {MOCK_TRENDING_HASHTAGS.map(t => (
                <Link key={t.tag} href={`/tendances?tag=${t.tag}`} className="bg-background border border-border px-4 py-1.5 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2">
                  #{t.tag}
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">{Math.floor(t.posts/1000)}k</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-wider">Vidéos à la une</h2>
          <Link href="/videos" className="text-sm font-bold text-primary flex items-center hover:underline">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVideos.map(video => (
            <Link key={video.id} href={`/videos?id=${video.id}`} className="group block">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur shadow-lg group-hover:scale-110 transition-transform">
                    <Play fill="currentColor" size={20} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-1 text-xs font-medium text-white rounded">
                  {video.duration}
                </div>
              </div>
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{video.category}</span>
              <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Shows */}
      <section className="bg-secondary/30 border-y border-border py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-wider mb-2">Émissions</h2>
              <p className="text-muted-foreground">Les rendez-vous incontournables de Pulse Africa.</p>
            </div>
            <Link href="/emissions" className="text-sm font-bold text-primary flex items-center hover:underline hidden md:flex">
              Toutes les émissions <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedShows.map(show => (
              <Link key={show.id} href={`/emissions?id=${show.id}`} className="group block relative overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[3/4] relative">
                  <img src={show.coverUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={show.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  <div className="absolute bottom-0 w-full p-5">
                    {show.isLive && (
                      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        En Direct
                      </span>
                    )}
                    <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-primary transition-colors">{show.title}</h3>
                    <p className="text-sm text-gray-300 font-medium mb-3">Avec {show.host}</p>
                    <div className="text-xs text-muted-foreground bg-black/40 backdrop-blur py-1.5 px-3 rounded-md border border-white/10 inline-block">
                      {show.schedule}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-4">L'Afrique premium dans votre boîte mail.</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Rejoignez 250,000+ lecteurs. Analyses approfondies, enquêtes exclusives et éditoriaux, chaque matin.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="flex-1 bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-md transition-colors">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
