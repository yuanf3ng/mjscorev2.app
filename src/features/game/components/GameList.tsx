import React from 'react';
import { GameRecord, Player } from '../../../types';
import { GameListItem } from './GameListItem';

interface GameListProps {
  games: GameRecord[];
  players: Player[];
  onEdit: (game: GameRecord) => void;
  onDelete: (id: string) => void;
  onEditPlayer: (player: Player) => void;
}

export function GameList({ games, players, onEdit, onDelete, onEditPlayer }: GameListProps) {
  const sortedGames = [...games].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedGames.map((game) => (
        <GameListItem
          key={game.id}
          game={game}
          players={players}
          onEdit={() => onEdit(game)}
          onDelete={() => onDelete(game.id)}
          onEditPlayer={onEditPlayer}
        />
      ))}
    </div>
  );
}