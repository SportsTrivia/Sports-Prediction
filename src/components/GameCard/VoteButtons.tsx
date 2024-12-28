import React from 'react';

interface VoteButtonsProps {
  homeTeam: string;
  awayTeam: string;
  onVoteHome: () => void;
  onVoteAway: () => void;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({
  homeTeam,
  awayTeam,
  onVoteHome,
  onVoteAway
}) => (
  <div className="flex justify-center space-x-4 mb-4">
    <button
      onClick={onVoteHome}
      className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
    >
      Vote {homeTeam}
    </button>
    <button
      onClick={onVoteAway}
      className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
    >
      Vote {awayTeam}
    </button>
  </div>
);