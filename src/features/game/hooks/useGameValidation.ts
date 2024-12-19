import { toast } from 'sonner';

export function useGameValidation() {
  const validateGame = (selectedPlayers: string[], scores: { [key: string]: number }) => {
    if (![3, 6].includes(selectedPlayers.length)) {
      toast.error('Please select exactly 3 or 6 players');
      return false;
    }

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    if (totalScore !== 0) {
      toast.error('Total score must be 0');
      return false;
    }

    const winners = selectedPlayers.filter((id) => scores[id] > 0);
    if (winners.length === 0) {
      toast.error('There must be at least one winner');
      return false;
    }

    return true;
  };

  return { validateGame };
}