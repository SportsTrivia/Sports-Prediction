import React from 'react';
import { Game } from '../../types/game';
import { calculateVotePercentages } from '../../utils/voteUtils';

interface VotePercentagesProps {
  game: Game;
  currentVotes: Game['votes'];
}

export const VotePercentages: React.FC<VotePercentagesProps> = ({ game, currentVotes }) => {
  const { home, away } = calculateVotePercentages(currentVotes);
  
  return (
    <div className="flex justify-between text-sm text-gray-600 mt-4">
      <span>{game.homeTeam}: {home}%</span>
      <span>{game.awayTeam}: {away}%</span>
    </div>
  );
};