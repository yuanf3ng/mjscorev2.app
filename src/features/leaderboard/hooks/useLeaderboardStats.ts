import { useMemo } from 'react';
import { Player, GameRecord } from '../../../types';
import { calculatePlayerStats } from '../../../utils/chartUtils';

export function useLeaderboardStats(players: Player[], games: GameRecord[]) {
  const stats = useMemo(() => {
    return players
      .map((player) => ({
        player,
        ...calculatePlayerStats(games, player),
      }))
      .filter(stat => stat.totalScore !== 0 || stat.gamesPlayed > 0)
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [players, games]);

  return { stats };
}