import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type PulseNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
};

type PulseContextValue = {
  likedContent: string[];
  savedContent: string[];
  followedPeople: string[];
  notifications: PulseNotification[];
  toggleLike: (contentId: string, title?: string) => void;
  toggleSaved: (contentId: string, title?: string) => void;
  toggleFollow: (person: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

const PulseContext = createContext<PulseContextValue | null>(null);

const defaultNotifications: PulseNotification[] = [
  {
    id: 'live-grand-journal',
    title: 'Le Grand Journal est en direct',
    body: 'Rejoignez la conversation depuis Addis-Abeba.',
    time: 'Il y a 5 min',
    read: false,
    href: '/live',
  },
  {
    id: 'recommended-story',
    title: 'Une nouvelle analyse est disponible',
    body: 'Découvrez les dernières tendances de la tech africaine.',
    time: 'Il y a 1 h',
    read: false,
    href: '/actualites',
  },
  {
    id: 'studio-update',
    title: 'Votre sélection a été mise à jour',
    body: '3 contenus enregistrés sont prêts à être lus.',
    time: 'Hier',
    read: true,
    href: '/profil?tab=saved',
  },
];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Local persistence is an enhancement for this mock-first V1.
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export function PulseProvider({ children }: { children: React.ReactNode }) {
  const [likedContent, setLikedContent] = useStoredState<string[]>('pulse-liked', []);
  const [savedContent, setSavedContent] = useStoredState<string[]>('pulse-saved', []);
  const [followedPeople, setFollowedPeople] = useStoredState<string[]>('pulse-followed', []);
  const [notifications, setNotifications] = useStoredState<PulseNotification[]>(
    'pulse-notifications',
    defaultNotifications,
  );

  const value = useMemo<PulseContextValue>(
    () => ({
      likedContent,
      savedContent,
      followedPeople,
      notifications,
      toggleLike: (contentId, title) => {
        const isLiked = likedContent.includes(contentId);
        setLikedContent((current) =>
          isLiked ? current.filter((id) => id !== contentId) : [...current, contentId],
        );
        if (!isLiked) {
          setNotifications((current) => [
            {
              id: `like-${contentId}-${Date.now()}`,
              title: 'Contenu enregistré dans vos préférences',
              body: title || 'Votre réaction a bien été prise en compte.',
              time: 'À l’instant',
              read: false,
            },
            ...current,
          ]);
        }
      },
      toggleSaved: (contentId, title) => {
        const isSaved = savedContent.includes(contentId);
        setSavedContent((current) =>
          isSaved ? current.filter((id) => id !== contentId) : [...current, contentId],
        );
        if (!isSaved) {
          setNotifications((current) => [
            {
              id: `save-${contentId}-${Date.now()}`,
              title: 'Article enregistré',
              body: title || 'Vous retrouverez ce contenu dans votre profil.',
              time: 'À l’instant',
              read: false,
              href: '/profil?tab=saved',
            },
            ...current,
          ]);
        }
      },
      toggleFollow: (person) =>
        setFollowedPeople((current) =>
          current.includes(person)
            ? current.filter((name) => name !== person)
            : [...current, person],
        ),
      markNotificationRead: (id) =>
        setNotifications((current) =>
          current.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        ),
      markAllNotificationsRead: () =>
        setNotifications((current) => current.map((notification) => ({ ...notification, read: true }))),
    }),
    [
      followedPeople,
      likedContent,
      notifications,
      savedContent,
      setFollowedPeople,
      setLikedContent,
      setNotifications,
      setSavedContent,
    ],
  );

  return <PulseContext.Provider value={value}>{children}</PulseContext.Provider>;
}

export function usePulse() {
  const context = useContext(PulseContext);
  if (!context) throw new Error('usePulse must be used inside PulseProvider');
  return context;
}