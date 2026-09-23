import React from 'react';
import { MoreHorizontal, Plus, Search, UserCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STUDIO_USERS } from '@/data/studio';
import { MetricCard, StudioPageHeader, StudioTable, StatusBadge } from '@/components/studio/StudioPrimitives';

export default function StudioUtilisateurs() {
  return (
    <div className="space-y-6">
      <StudioPageHeader title="Utilisateurs" description="Gérez les comptes, rôles et accès à la plateforme." action={<Button className="bg-primary hover:bg-primary/90"><Plus size={15} className="mr-2" /> Inviter un membre</Button>} />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Utilisateurs totaux" value="24,892" detail="+6,2% ce mois" icon={Users} tone="red" />
        <MetricCard label="Actifs aujourd’hui" value="8,431" detail="34% de la base" icon={UserCheck} tone="green" />
        <MetricCard label="Nouveaux comptes" value="426" detail="+18% cette semaine" icon={Plus} tone="gold" />
      </div>
      <div className="flex max-w-md items-center gap-2"><Search size={16} className="text-muted-foreground" /><Input placeholder="Rechercher un utilisateur..." className="bg-card" /></div>
      <StudioTable headers={['Utilisateur', 'Rôle', 'Statut', 'Inscription', 'Actions']}>
        {STUDIO_USERS.map((user) => (
          <tr key={user.id} className="hover:bg-muted/20">
            <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><p className="font-semibold">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div></div></td>
            <td className="px-5 py-4 text-muted-foreground">{user.role}</td>
            <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
            <td className="px-5 py-4 text-muted-foreground">{user.joined}</td>
            <td className="px-5 py-4 text-right"><Button variant="ghost" size="icon"><MoreHorizontal size={17} /></Button></td>
          </tr>
        ))}
      </StudioTable>
    </div>
  );
}