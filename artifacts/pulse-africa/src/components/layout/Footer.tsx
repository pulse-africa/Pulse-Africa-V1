import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-primary font-black text-2xl tracking-tighter">PULSE</span>
              <span className="text-foreground font-bold text-xl tracking-tighter">AFRICA</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La référence panafricaine de l'information premium. Une salle de rédaction mondiale avec une âme africaine.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Actualités</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/actualites?cat=Politique" className="hover:text-primary transition-colors">Politique</Link></li>
              <li><Link href="/actualites?cat=Economie" className="hover:text-primary transition-colors">Économie</Link></li>
              <li><Link href="/actualites?cat=Sport" className="hover:text-primary transition-colors">Sport</Link></li>
              <li><Link href="/actualites?cat=Tech" className="hover:text-primary transition-colors">Tech</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Découvrir</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/videos" className="hover:text-primary transition-colors">Vidéos</Link></li>
              <li><Link href="/emissions" className="hover:text-primary transition-colors">Émissions</Link></li>
              <li><Link href="/tendances" className="hover:text-primary transition-colors">Tendances</Link></li>
              <li><Link href="/recherche" className="hover:text-primary transition-colors">Recherche</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">À propos</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pulse Africa. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Twitter</Link>
            <Link href="#" className="hover:text-foreground">LinkedIn</Link>
            <Link href="#" className="hover:text-foreground">Facebook</Link>
            <Link href="#" className="hover:text-foreground">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
