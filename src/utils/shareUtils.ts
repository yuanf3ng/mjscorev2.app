import { Player, GameRecord } from '../types';
import { calculatePlayerStats } from './chartUtils';

export function generateShareText(players: Player[], games: GameRecord[]): string {
  const stats = players
    .map((player) => ({
      player,
      ...calculatePlayerStats(games, player),
    }))
    .filter(stat => stat.totalScore !== 0 || stat.gamesPlayed > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  const header = '🀄️ Mahjong Rankings 🎲\n\n';
  
  const rows = stats.map((stat, index) => {
    const position = index + 1;
    const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '▫️';
    
    return `${medal} ${stat.player.name}\n` +
           `   Points: ${stat.totalScore} | Games: ${stat.gamesPlayed} | Wins: ${stat.wins} (${stat.winRate.toFixed(1)}%)`;
  }).join('\n\n');
  
  const footer = '\n\nTracked with Mahjong Score Tracker 🎮';
  
  return header + rows + footer;
}