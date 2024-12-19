import { GameRecord, Player } from '../../types';
import { DailyScore } from './types';

export function getDailyScores(games: GameRecord[], players: Player[]): DailyScore[] {
  const playerScores: { [playerId: string]: number } = {};
  players.forEach(player => {
    playerScores[player.id] = 0;
  });

  const sortedGames = [...games].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dailyScores: DailyScore[] = [];

  sortedGames.forEach(game => {
    players.forEach(player => {
      if (game.players.includes(player.id)) {
        playerScores[player.id] += game.scores[player.id] || 0;
      }
    });

    dailyScores.push({
      date: game.date,
      ...playerScores,
    });
  });

  return dailyScores;
}