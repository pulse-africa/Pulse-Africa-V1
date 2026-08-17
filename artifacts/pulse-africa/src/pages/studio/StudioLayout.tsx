import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, FileText, Video, Radio, MonitorPlay, Users, MessageSquare, ShieldAlert, BarChart3, CreditCard, Settings, LogOut, Search, Bell } from 'lucide-react';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const menu = [
    { label: 'Tableau de bord', path: '/studio', icon: LayoutDashboard },
    { label: 'Articles', path: '/studio/articles', icon: FileText },
    { label: 'Vidéos', path: '/studio/videos', icon: Video },
    { label: 'Live', path: '/studio/live', icon: Radio },
    { label: 'Émissions', path: '/studio/emissions', icon: MonitorPlay },
    { label: 'Utilisateurs', path: '/studio/utilisateurs', icon: Users },
    { label: 'Commentaires', path: '/studio/commentaires', icon: MessageSquare },
    { label: 'Modération', path: '/studio/moderation', icon: ShieldAlert },
    { label: 'Analytics', path: '/studio/analytics', icon: BarChart3 },
    { label: 'Monétisation', path: '/studio/monetisation', icon: CreditCard },
    { label: 'Paramètres', path: '/studio/parametres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-black text-xl tracking-tighter">PULSE</span>
            <span className="text-foreground font-bold text-lg tracking-tighter">STUDIO</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menu.map(item => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location === item.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <LogOut size={18} />
            Quitter le Studio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-background">
        {/* Studio Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-96 relative">
            <Search size={16} className="absolute left-3 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher dans le studio..." 
              className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-card"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-sm font-bold text-primary">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
