import React from 'react';
import { Bell, CheckCheck, Radio, Bookmark, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { usePulse } from '@/state/PulseProvider';

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = usePulse();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Pulse Africa</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Notifications</h1>
          <p className="mt-2 text-muted-foreground">Retrouvez les dernières nouvelles de votre sélection.</p>
        </div>
        <Button variant="outline" className="border-border gap-2" onClick={markAllNotificationsRead}>
          <CheckCheck size={16} /> Tout marquer comme lu
        </Button>
      </div>
      <div className="mt-8 space-y-3">
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            href={notification.href || '#'}
            onClick={() => markNotificationRead(notification.id)}
            className={`flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 ${notification.read ? 'opacity-70' : ''}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {notification.title.toLowerCase().includes('direct') ? <Radio size={18} /> : notification.title.toLowerCase().includes('enregistr') ? <Bookmark size={18} /> : <Bell size={18} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{notification.title}</h2>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.body}</p>
            </div>
            <ArrowUpRight size={17} className="mt-1 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}