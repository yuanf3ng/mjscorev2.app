import { useState } from 'react';
import { toast } from 'sonner';
import { Player, GameRecord } from '../types';
import { generateShareText } from '../utils/shareUtils';

export function useShare() {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyToClipboard = async (players: Player[], games: GameRecord[]) => {
    try {
      const text = generateShareText(players, games);
      await navigator.clipboard.writeText(text);
      toast.success('Rankings copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy rankings');
    }
  };

  const handleWhatsAppShare = (players: Player[], games: GameRecord[]) => {
    const text = encodeURIComponent(generateShareText(players, games));
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return {
    showShareMenu,
    setShowShareMenu,
    handleCopyToClipboard,
    handleWhatsAppShare,
  };
}