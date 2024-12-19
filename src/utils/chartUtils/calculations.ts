import { GameRecord, Player } from '../../types';
import { PlayerStats } from './types';

export function calculatePlayerStats(games: GameRecord[], player: Player): PlayerStats {
  const playerGames = games.filter(game => game.players.includes(player.id));
  const wins = games.filter(game => game.winners.includes(player.id)).length;
  const totalScore = playerGames.reduce(
    (sum, game) => sum + (game.scores[player.id] || 0),
    0
  );
  const gamesPlayed = playerGames.length;
  const winRate = gamesPlayed ? (wins / gamesPlayed) * 100 : 0;
  const averageScore = gamesPlayed ? totalScore / gamesPlayed : 0;

  return {
    wins,
    gamesPlayed,
    totalScore,
    winRate,
    averageScore,
  };
}