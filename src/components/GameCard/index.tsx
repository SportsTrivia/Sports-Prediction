import React from 'react';
import { Game } from '../../types/game';
import { GameHeader } from './GameHeader';
import { GameScore } from './GameScore';
import { VoteButtons } from './VoteButtons';
import { VoteChart } from './VoteChart';
import { VotePercentages } from './VotePercentages';
import { GameVoteStats } from '../GameVoteStats';

interface GameCardProps {
  game: Game;
  onVote: (gameId: string, team: 'home' | 'away') => void;
  currentVotes: Game['votes'];
}

export const GameCard: React.FC<GameCardProps> = ({ game, onVote, currentVotes }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <GameHeader game={game} />
    
    {game.isFinished ? (
      <GameScore score={game.finalScore!} />
    ) : (
      <VoteButtons
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        onVoteHome={() => onVote(game.id, 'home')}
        onVoteAway={() => onVote(game.id, 'away')}
      />
    )}

    <VoteChart game={game} currentVotes={currentVotes} />
    <VotePercentages game={game} currentVotes={currentVotes} />
    <GameVoteStats votes={currentVotes} />
  </div>
);