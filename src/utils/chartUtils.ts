import { GameRecord, Player } from '../types';

interface DailyScore {
  date: string;
  [key: string]: string | number;
}

export function calculatePlayerStats(games: GameRecord[], player: Player) {
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

export function getPlayerColor(index: number, totalPlayers: number): string {
  return `hsl(${(index * 360) / totalPlayers}, 70%, 50%)`;
}

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