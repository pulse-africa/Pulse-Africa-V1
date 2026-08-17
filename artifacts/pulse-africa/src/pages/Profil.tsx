import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Bookmark, Clock, MessageSquare } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/mock';
import ArticleCard from '@/components/content/ArticleCard';
import { Button } from '@/components/ui/button';

export default function Profil() {
  const savedArticles = MOCK_ARTICLES.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="relative">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-card shadow-xl">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">Koffi Diallo</h1>
          <p className="text-muted-foreground text-sm mb-4">Membre depuis Octobre 2023 • Dakar, Sénégal</p>
          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <div className="flex flex-col">
              <span className="font-bold text-xl">142</span>
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Articles lus</span>
            </div>
            <div className="w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">12</span>
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Commentaires</span>
            </div>
            <div className="w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">Premium</span>
              <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Statut</span>
            </div>
          </div>
          <Button variant="outline" className="border-border hover:bg-muted">
            <Settings size={16} className="mr-2" /> Modifier le profil
          </Button>
        </div>
      </div>

      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none p-0 h-auto gap-6">
          <TabsTrigger 
            value="saved" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 data-[state=active]:text-foreground text-muted-foreground"
          >
            <Bookmark size={16} className="mr-2" /> Enregistrés
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 data-[state=active]:text-foreground text-muted-foreground"
          >
            <Clock size={16} className="mr-2" /> Historique
          </TabsTrigger>
          <TabsTrigger 
            value="comments" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 data-[state=active]:text-foreground text-muted-foreground"
          >
            <MessageSquare size={16} className="mr-2" /> Commentaires
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            L'historique de lecture apparaîtra ici.
          </div>
        </TabsContent>

        <TabsContent value="comments" className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            Vos commentaires apparaîtront ici.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
