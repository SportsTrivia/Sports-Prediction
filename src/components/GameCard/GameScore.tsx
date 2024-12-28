import React from 'react';
import { Trophy } from 'lucide-react';
import { Game } from '../../types/game';

interface GameScoreProps {
  score: NonNullable<Game['finalScore']>;
}

export const GameScore: React.FC<GameScoreProps> = ({ score }) => (
  <div className="mb-4 flex items-center justify-center space-x-4">
    <span className="text-2xl font-bold">{score.home}</span>
    <Trophy className="text-yellow-500" />
    <span className="text-2xl font-bold">{score.away}</span>
  </div>
);