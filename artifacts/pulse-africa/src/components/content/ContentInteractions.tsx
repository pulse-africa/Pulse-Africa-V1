import React, { useState } from 'react';
import { Bookmark, Check, Heart, Link as LinkIcon, Share2, UserPlus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePulse } from '@/state/PulseProvider';

type ContentInteractionsProps = {
  contentId: string;
  title: string;
  authorName?: string;
  likesCount?: number;
  commentsCount?: number;
  onCommentsClick?: () => void;
  compact?: boolean;
};

export default function ContentInteractions({
  contentId,
  title,
  authorName,
  likesCount = 0,
  commentsCount = 0,
  onCommentsClick,
  compact = false,
}: ContentInteractionsProps) {
  const { likedContent, savedContent, followedPeople, toggleLike, toggleSaved, toggleFollow } = usePulse();
  const [copied, setCopied] = useState(false);
  const isLiked = likedContent.includes(contentId);
  const isSaved = savedContent.includes(contentId);
  const isFollowed = authorName ? followedPeople.includes(authorName) : false;

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard can be unavailable in embedded previews.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`flex items-center gap-1 ${compact ? 'text-xs' : 'text-sm'}`}>
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'icon'}
        className={`${compact ? 'h-8 px-2' : 'rounded-full'} ${isLiked ? 'text-primary' : 'text-muted-foreground'}`}
        onClick={() => toggleLike(contentId, title)}
        aria-label={isLiked ? 'Retirer le J’aime' : 'J’aime'}
      >
        <Heart size={compact ? 15 : 19} className={isLiked ? 'fill-primary' : ''} />
        {likesCount > 0 && <span className="ml-1">{likesCount + (isLiked ? 1 : 0)}</span>}
      </Button>
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'icon'}
        className={`h-8 ${compact ? 'px-2' : 'rounded-full'} text-muted-foreground`}
        onClick={onCommentsClick}
        aria-label="Commentaires"
      >
        <span className="flex items-center gap-1">
          <span className="text-base leading-none">•</span>
          <span>{commentsCount}</span>
        </span>
      </Button>
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'icon'}
        className={`h-8 ${compact ? 'px-2' : 'rounded-full'} ${isSaved ? 'text-primary' : 'text-muted-foreground'}`}
        onClick={() => toggleSaved(contentId, title)}
        aria-label={isSaved ? 'Retirer des contenus enregistrés' : 'Enregistrer'}
      >
        <Bookmark size={compact ? 15 : 19} className={isSaved ? 'fill-primary' : ''} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={compact ? 'sm' : 'icon'}
            className={`h-8 ${compact ? 'px-2' : 'rounded-full'} text-muted-foreground`}
            aria-label="Partager"
          >
            <Share2 size={compact ? 15 : 19} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2" onClick={copyLink}>
            {copied ? <Check size={15} /> : <LinkIcon size={15} />}
            {copied ? 'Lien copié' : 'Copier le lien'}
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer')}>
            Partager sur X
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer')}>
            Partager sur Facebook
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {authorName && (
        <Button
          variant={isFollowed ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8 ml-1 gap-1.5 text-xs"
          onClick={() => toggleFollow(authorName)}
        >
          <UserPlus size={14} />
          {isFollowed ? 'Suivi' : 'Suivre'}
        </Button>
      )}
    </div>
  );
}