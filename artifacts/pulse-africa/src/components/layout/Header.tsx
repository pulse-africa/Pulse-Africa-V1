import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Bell, Menu, X, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePulse } from '@/state/PulseProvider';

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = usePulse();
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Vidéos', path: '/videos' },
    { label: 'Émissions', path: '/emissions' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-black text-2xl tracking-tighter">PULSE</span>
            <span className="text-foreground font-bold text-xl tracking-tighter">AFRICA</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={`text-sm font-medium transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/live" className="flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            LIVE
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/recherche">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search size={20} />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-primary text-[10px] text-white rounded-full border border-background flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-2 p-2">
                {notifications.slice(0, 3).map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.href || '/notifications'}
                    onClick={() => markNotificationRead(notification.id)}
                    className={`flex gap-3 items-start p-2 rounded hover:bg-muted/50 transition-colors ${notification.read ? 'opacity-70' : ''}`}
                  >
                    <div className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${notification.read ? 'bg-transparent' : 'bg-primary'}`} />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="flex items-center justify-between px-2">
                <Link href="/notifications" className="text-xs text-primary p-2 hover:underline">Voir tout</Link>
                <button onClick={markAllNotificationsRead} className="text-xs text-muted-foreground p-2 hover:text-foreground">
                  Tout lire
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border border-border bg-muted">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/profil">Profil</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/profil?tab=saved">Enregistrés</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/studio">Pulse Studio (Admin)</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className="py-3 text-lg font-medium border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/live" 
              className="py-3 text-lg font-bold flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="h-2 w-2 bg-primary rounded-full"></span>
              LIVE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
