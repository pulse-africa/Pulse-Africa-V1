import React from 'react';
import { Check, CreditCard, DollarSign, Percent, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, StudioPageHeader } from '@/components/studio/StudioPrimitives';

const plans = [
  { name: 'Gratuit', price: '0 €', description: 'Accès aux contenus essentiels', features: ['Actualités quotidiennes', 'Vidéos sélectionnées', 'Newsletter hebdomadaire'] },
  { name: 'Premium', price: '6,99 €', description: 'L’expérience Pulse complète', features: ['Tous les articles et dossiers', 'Vidéos sans publicité', 'Newsletter premium', 'Commentaires prioritaires'] },
  { name: 'Pro', price: '19,99 €', description: 'Pour les professionnels', features: ['Accès Studio Insights', 'Briefing quotidien', 'Archives intégrales', 'Support prioritaire'] },
];

export default function StudioMonetisation() {
  return (
    <div className="space-y-6">
      <StudioPageHeader title="Monétisation" description="Suivez les abonnements, revenus et offres de Pulse Africa." />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Revenus récurrents" value="14,200 €" detail="+4,3% ce mois" icon={DollarSign} tone="gold" />
        <MetricCard label="Abonnés Premium" value="2,350" detail="+12,1% ce mois" icon={Users} tone="red" />
        <MetricCard label="Taux de conversion" value="6,8%" detail="+0,9 pt ce mois" icon={Percent} tone="green" />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={plan.name} className={`border-border bg-card ${index === 1 ? 'border-primary/70 shadow-lg shadow-primary/10' : ''}`}>
            <CardHeader><div className="flex items-center justify-between"><CardTitle>{plan.name}</CardTitle>{index === 1 && <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase text-white">Populaire</span>}</div><p className="text-3xl font-black">{plan.price}<span className="text-sm font-normal text-muted-foreground"> / mois</span></p><p className="text-sm text-muted-foreground">{plan.description}</p></CardHeader>
            <CardContent className="space-y-3"><div className="space-y-2">{plan.features.map((feature) => <p key={feature} className="flex items-center gap-2 text-sm"><Check size={15} className="text-emerald-400" /> {feature}</p>)}</div><Button variant={index === 1 ? 'default' : 'outline'} className={`mt-3 w-full ${index === 1 ? 'bg-primary hover:bg-primary/90' : 'border-border'}`}>Gérer l’offre</Button></CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border bg-card"><CardHeader><CardTitle>Paiements récents</CardTitle></CardHeader><CardContent><div className="space-y-4">{['Awa Diop', 'David Mwangi', 'Mariam Bah', 'Samir El Fassi'].map((name, index) => <div key={name} className="flex items-center justify-between border-b border-border/70 pb-3 last:border-0 last:pb-0"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{name.split(' ').map((part) => part[0]).join('')}</div><div><p className="text-sm font-semibold">{name}</p><p className="text-xs text-muted-foreground">Abonnement Premium</p></div></div><span className="flex items-center gap-1 text-sm font-bold text-emerald-400"><CreditCard size={14} /> +6,99 €</span></div>)}</div></CardContent></Card>
    </div>
  );
}