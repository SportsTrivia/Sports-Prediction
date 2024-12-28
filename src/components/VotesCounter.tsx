import React from 'react';
import { Vote } from 'lucide-react';
import { Game } from '../types/game';

interface VotesCounterProps {
  games: Game[];
}

export const VotesCounter: React.FC<VotesCounterProps> = ({ games }) => {
  const totalVotes = games.reduce((sum, game) => 
    sum + game.votes.home + game.votes.away, 0
  );

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-md py-3 px-6 mb-8">
      <Vote className="w-5 h-5 text-blue-500 mr-2" />
      <span className="text-lg font-semibold">Total Votes: {totalVotes}</span>
    </div>
  );
};