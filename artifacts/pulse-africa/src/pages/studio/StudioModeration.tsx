import React, { useState } from 'react';
import { CheckCircle2, Flag, ShieldAlert, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STUDIO_REPORTS } from '@/data/studio';
import { MetricCard, StudioPageHeader, StudioTable, StatusBadge } from '@/components/studio/StudioPrimitives';

export default function StudioModeration() {
  const [reports, setReports] = useState(STUDIO_REPORTS);
  const resolve = (id: string, status: string) => setReports((current) => current.map((report) => report.id === id ? { ...report, status } : report));

  return (
    <div className="space-y-6">
      <StudioPageHeader title="Modération" description="Traitez les signalements et protégez la qualité éditoriale." />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="En attente" value={String(reports.filter((report) => report.status === 'En attente').length)} detail="À examiner maintenant" icon={Flag} tone="gold" />
        <MetricCard label="Résolus aujourd’hui" value="31" detail="+6 par rapport à hier" icon={CheckCircle2} tone="green" />
        <MetricCard label="Priorité haute" value="4" detail="Action recommandée" icon={ShieldAlert} tone="red" />
      </div>
      <StudioTable headers={['Type', 'Contenu signalé', 'Motif', 'Signalé par', 'Statut', 'Décision']}>
        {reports.map((report) => (
          <tr key={report.id} className="hover:bg-muted/20">
            <td className="px-5 py-4 font-semibold">{report.type}</td>
            <td className="px-5 py-4">{report.subject}</td>
            <td className="px-5 py-4 text-muted-foreground">{report.reason}</td>
            <td className="px-5 py-4 text-muted-foreground">{report.reporter}</td>
            <td className="px-5 py-4"><StatusBadge status={report.status} /></td>
            <td className="px-5 py-4"><div className="flex gap-2"><Button size="sm" variant="outline" className="border-border text-emerald-400" onClick={() => resolve(report.id, 'Approuvé')}><CheckCircle2 size={14} className="mr-1" /> Garder</Button><Button size="sm" variant="outline" className="border-border text-primary" onClick={() => resolve(report.id, 'Rejeté')}><XCircle size={14} className="mr-1" /> Retirer</Button></div></td>
          </tr>
        ))}
      </StudioTable>
    </div>
  );
}