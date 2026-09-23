import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Eye, CreditCard, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_ARTICLES } from '@/data/mock';
import SafeImage from '@/components/content/SafeImage';

const data = [
  { name: '1 Oct', views: 4000 },
  { name: '5 Oct', views: 3000 },
  { name: '10 Oct', views: 5000 },
  { name: '15 Oct', views: 8000 },
  { name: '20 Oct', views: 6000 },
  { name: '24 Oct', views: 9000 },
];

export default function StudioDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vue d'ensemble</h1>
        <p className="text-muted-foreground">Bienvenue dans Pulse Studio. Voici les métriques du jour.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues Totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" /> +14.5% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés Premium</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" /> +12.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Publiés</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">Ce mois-ci</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus MRR</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,200</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight size={12} className="mr-1" /> +4.3% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart */}
        <Card className="col-span-4 bg-card border-border">
          <CardHeader>
            <CardTitle>Trafic (30 derniers jours)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#222', color: '#fff' }}
                    itemStyle={{ color: '#CC0000' }}
                  />
                  <Line type="monotone" dataKey="views" stroke="#CC0000" strokeWidth={3} dot={{ r: 4, fill: '#CC0000' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity / Top Articles */}
        <Card className="col-span-3 bg-card border-border">
          <CardHeader>
            <CardTitle>Top Articles Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_ARTICLES.slice(0, 4).map((article) => (
                <div key={article.id} className="flex items-center">
                  <div className="w-12 h-12 rounded bg-muted overflow-hidden mr-4 shrink-0">
                    <SafeImage src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 space-y-1 flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {article.category} • {article.views.toLocaleString()} vues
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
