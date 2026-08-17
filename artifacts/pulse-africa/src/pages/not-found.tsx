import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full min-h-[50vh] flex-col text-center">
      <h1 className="text-6xl font-black text-muted-foreground/30 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page introuvable</h2>
      <p className="text-muted-foreground max-w-md">La page que vous recherchez n'existe pas ou a été déplacée.</p>
    </div>
  );
}
