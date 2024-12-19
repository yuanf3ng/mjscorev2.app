import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Player, GameRecord } from '../../types';
import { getDailyScores, getPlayerColor } from '../../utils/chartUtils';
import { CustomTooltip } from './ChartComponents';
import { PlayerChartToggle } from './PlayerChartToggle';

interface DailyScoreChartProps {
  games: GameRecord[];
  players: Player[];
}

export function DailyScoreChart({ games, players }: DailyScoreChartProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(
    players.map(p => p.id)
  );

  const handleTogglePlayer = (playerId: string) => {
    setSelectedPlayers(current => 
      current.includes(playerId)
        ? current.filter(id => id !== playerId)
        : [...current, playerId]
    );
  };

  const dailyData = getDailyScores(
    games,
    players.filter(p => selectedPlayers.includes(p.id))
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
      <h3 className="text-lg font-semibold">Score Trends</h3>
      
      <PlayerChartToggle
        players={players}
        selectedPlayers={selectedPlayers}
        onTogglePlayer={handleTogglePlayer}
      />

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {players
              .filter(player => selectedPlayers.includes(player.id))
              .map((player, index) => (
                <Line
                  key={player.id}
                  type="monotone"
                  dataKey={player.id}
                  name={player.name}
                  stroke={getPlayerColor(index, players.length)}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}