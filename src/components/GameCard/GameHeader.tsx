import React from 'react';
import { format } from 'date-fns';
import { Game } from '../../types/game';

interface GameHeaderProps {
  game: Game;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ game }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">
      {game.homeTeam} vs {game.awayTeam}
    </h3>
    <span className="text-sm text-gray-500">
      {format(game.date, 'MMM d, yyyy')}
    </span>
  </div>
);