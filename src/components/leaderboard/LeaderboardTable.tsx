import React from 'react';
import { Trophy, Share2 } from 'lucide-react';
import { Player, GameRecord } from '../../types';
import { useLeaderboardStats } from '../../hooks/useLeaderboardStats';
import { useShare } from '../../hooks/useShare';
import { ShareMenu } from '../share/ShareMenu';

interface LeaderboardTableProps {
  players: Player[];
  games: GameRecord[];
}

export function LeaderboardTable({ players, games }: LeaderboardTableProps) {
  const { stats } = useLeaderboardStats(players, games);
  const { showShareMenu, setShowShareMenu, handleCopyToClipboard, handleWhatsAppShare } = useShare();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Rankings</h3>
        <button
          onClick={() => setShowShareMenu(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Share2 size={18} />
          <span className="hidden sm:inline">Share Rankings</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-right">Games</th>
              <th className="px-4 py-2 text-right">Wins</th>
              <th className="px-4 py-2 text-right">Win Rate</th>
              <th className="px-4 py-2 text-right">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr
                key={stat.player.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 flex items-center gap-2">
                  {index < 3 && (
                    <Trophy
                      size={18}
                      className={
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      }
                    />
                  )}
                  {index + 1}
                </td>
                <td className="px-4 py-2">{stat.player.name}</td>
                <td className="px-4 py-2 text-right">{stat.gamesPlayed}</td>
                <td className="px-4 py-2 text-right">{stat.wins}</td>
                <td className="px-4 py-2 text-right">
                  {stat.winRate.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-right font-medium">
                  {stat.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showShareMenu && (
        <ShareMenu
          onClose={() => setShowShareMenu(false)}
          onCopy={() => handleCopyToClipboard(players, games)}
          onWhatsApp={() => handleWhatsAppShare(players, games)}
        />
      )}
    </div>
  );
}