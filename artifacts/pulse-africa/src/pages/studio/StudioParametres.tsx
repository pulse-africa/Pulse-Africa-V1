import React, { useState } from 'react';
import { Check, Globe2, Mail, Save, Shield, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StudioPageHeader } from '@/components/studio/StudioPrimitives';

export default function StudioParametres() {
  const [saved, setSaved] = useState(false);
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="space-y-6">
      <StudioPageHeader title="Paramètres" description="Configurez l’identité, les notifications et les accès de la plateforme." />
      <form onSubmit={save} className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="border-border bg-card"><CardHeader><CardTitle className="flex items-center gap-2"><Globe2 size={18} className="text-primary" /> Identité du site</CardTitle></CardHeader><CardContent className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Nom de la plateforme<Input defaultValue="Pulse Africa" className="bg-background" /></label><label className="space-y-2 text-sm font-medium">Langue principale<Input defaultValue="Français" className="bg-background" /></label></div><label className="space-y-2 text-sm font-medium">Description courte<Input defaultValue="L'Afrique, en profondeur." className="bg-background" /></label><label className="space-y-2 text-sm font-medium">Email éditorial<Input type="email" defaultValue="redaction@pulse.africa" className="bg-background" /></label></CardContent></Card>
        <div className="space-y-6">
          <Card className="border-border bg-card"><CardHeader><CardTitle className="flex items-center gap-2"><Mail size={18} className="text-primary" /> Notifications</CardTitle></CardHeader><CardContent className="space-y-4 text-sm"><label className="flex items-center justify-between gap-3"><span>Résumé quotidien</span><input type="checkbox" defaultChecked className="accent-red-700" /></label><label className="flex items-center justify-between gap-3"><span>Alertes de modération</span><input type="checkbox" defaultChecked className="accent-red-700" /></label><label className="flex items-center justify-between gap-3"><span>Rapport analytics hebdo</span><input type="checkbox" className="accent-red-700" /></label></CardContent></Card>
          <Card className="border-border bg-card"><CardHeader><CardTitle className="flex items-center gap-2"><Shield size={18} className="text-primary" /> Sécurité</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">Les accès sensibles seront protégés par l’authentification d’équipe lors de la prochaine phase.</p><Button type="button" variant="outline" className="w-full border-border gap-2"><SlidersHorizontal size={15} /> Gérer les rôles</Button></CardContent></Card>
        </div>
        <div className="flex items-center gap-3"><Button type="submit" className="bg-primary hover:bg-primary/90 gap-2"><Save size={15} /> Enregistrer les modifications</Button>{saved && <span className="flex items-center gap-1 text-sm text-emerald-400"><Check size={15} /> Enregistré</span>}</div>
      </form>
    </div>
  );
}