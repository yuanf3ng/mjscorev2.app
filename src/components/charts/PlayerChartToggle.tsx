import React from 'react';
import { Player } from '../../types';
import { getPlayerColor } from '../../utils/chartUtils';

interface PlayerChartToggleProps {
  players: Player[];
  selectedPlayers: string[];
  onTogglePlayer: (playerId: string) => void;
}

export function PlayerChartToggle({ 
  players, 
  selectedPlayers, 
  onTogglePlayer 
}: PlayerChartToggleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map((player, index) => (
        <button
          key={player.id}
          onClick={() => onTogglePlayer(player.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedPlayers.includes(player.id)
              ? 'bg-white shadow-sm border border-gray-200'
              : 'bg-gray-100 text-gray-500'
          }`}
          style={{
            color: selectedPlayers.includes(player.id) 
              ? getPlayerColor(index, players.length)
              : undefined
          }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: getPlayerColor(index, players.length),
              opacity: selectedPlayers.includes(player.id) ? 1 : 0.5
            }} 
          />
          {player.name}
        </button>
      ))}
    </div>
  );
}