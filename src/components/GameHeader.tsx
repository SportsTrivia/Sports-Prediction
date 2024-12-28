import React from 'react';
import { format, isToday, isTomorrow } from 'date-fns';
import { Game } from '../types/game';

interface GameHeaderProps {
  game: Game;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ game }) => {
  const formatGameDate = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    }
    if (isTomorrow(date)) {
      return 'Tomorrow';
    }
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">
        {game.homeTeam} vs {game.awayTeam}
      </h3>
      <span className="text-sm text-gray-500">
        {formatGameDate(game.date)} at {format(game.date, 'h:mm a')}
      </span>
    </div>
  );
};