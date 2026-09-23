import React from 'react';
import { BarChart3, Globe2, MousePointerClick, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STUDIO_ANALYTICS, STUDIO_TRAFFIC_SOURCES } from '@/data/studio';
import { MetricCard, StudioPageHeader } from '@/components/studio/StudioPrimitives';

const geography = [{ name: 'Nigeria', value: 31 }, { name: 'RDC', value: 19 }, { name: 'Kenya', value: 16 }, { name: 'Sénégal', value: 14 }, { name: 'Autres', value: 20 }];
const COLORS = ['#cc0000', '#b8860b', '#3f8f76', '#477cc4', '#555555'];

export default function StudioAnalytics() {
  return (
    <div className="space-y-6">
      <StudioPageHeader title="Analytics" description="Comprenez l’audience et la performance éditoriale de Pulse Africa." />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Visiteurs uniques" value="184.6k" detail="+18,4% ce mois" icon={Users} tone="red" />
        <MetricCard label="Pages vues" value="1.24M" detail="+14,5% ce mois" icon={BarChart3} tone="gold" />
        <MetricCard label="Durée moyenne" value="04:32" detail="+22 s ce mois" icon={MousePointerClick} tone="green" />
        <MetricCard label="Pays actifs" value="42" detail="+3 depuis janvier" icon={Globe2} tone="default" />
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border bg-card lg:col-span-3"><CardHeader><CardTitle>Audience et pages vues</CardTitle></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={STUDIO_ANALYTICS}><CartesianGrid stroke="#222" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" /><Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} /><Line type="monotone" dataKey="visitors" stroke="#cc0000" strokeWidth={3} /><Line type="monotone" dataKey="views" stroke="#b8860b" strokeWidth={3} /></LineChart></ResponsiveContainer></div></CardContent></Card>
        <Card className="border-border bg-card lg:col-span-2"><CardHeader><CardTitle>Sources de trafic</CardTitle></CardHeader><CardContent><div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={STUDIO_TRAFFIC_SOURCES} dataKey="value" nameKey="label" innerRadius={55} outerRadius={82} paddingAngle={3}>{STUDIO_TRAFFIC_SOURCES.map((entry, index) => <Cell key={entry.label} fill={COLORS[index]} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} /></PieChart></ResponsiveContainer></div><div className="space-y-2">{STUDIO_TRAFFIC_SOURCES.map((source, index) => <div key={source.label} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-muted-foreground"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />{source.label}</span><span className="font-bold">{source.value}%</span></div>)}</div></CardContent></Card>
      </div>
      <Card className="border-border bg-card"><CardHeader><CardTitle>Répartition géographique</CardTitle></CardHeader><CardContent><div className="h-[280px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={geography} layout="vertical" margin={{ left: 20, right: 24 }}><CartesianGrid stroke="#222" horizontal={false} /><XAxis type="number" stroke="#888" unit="%" /><YAxis type="category" dataKey="name" stroke="#888" width={70} /><Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} /><Bar dataKey="value" fill="#cc0000" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div></CardContent></Card>
    </div>
  );
}