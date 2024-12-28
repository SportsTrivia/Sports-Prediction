import React from 'react';
import { Vote } from 'lucide-react';
import { Game } from '../types/game';

interface GameVoteStatsProps {
  votes: Game['votes'];
}

export const GameVoteStats: React.FC<GameVoteStatsProps> = ({ votes }) => {
  const totalVotes = votes.home + votes.away;

  return (
    <div className="flex items-center justify-center mt-4 text-gray-600">
      <Vote className="w-4 h-4 mr-1 text-blue-500" />
      <span className="text-sm font-medium">
        {totalVotes} total vote{totalVotes !== 1 ? 's' : ''}
      </span>
    </div>
  );
};