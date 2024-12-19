import { Player } from '../../types';

export interface DailyScore {
  date: string;
  [playerId: string]: string | number;
}

export interface PlayerStats {
  wins: number;
  gamesPlayed: number;
  totalScore: number;
  winRate: number;
  averageScore: number;
}

export interface ChartColors {
  primary: string;
  secondary: string;
  background: string;
}