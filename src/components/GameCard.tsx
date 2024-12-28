import React from 'react';
import { Game } from '../types/game';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy } from 'lucide-react';
import { format } from 'date-fns';
import { GameVoteStats } from './GameVoteStats';

interface GameCardProps {
  game: Game;
  onVote: (gameId: string, team: 'home' | 'away') => void;
  getUpdatedVotes: (game: Game) => Game['votes'];
}

const COLORS = ['#3b82f6', '#ef4444'];

export const GameCard: React.FC<GameCardProps> = ({ game, onVote, getUpdatedVotes }) => {
  const votes = getUpdatedVotes(game);
  const totalVotes = votes.home + votes.away;
  const homePercentage = Math.round((votes.home / totalVotes) * 100) || 0;
  const awayPercentage = Math.round((votes.away / totalVotes) * 100) || 0;

  const data = [
    { name: game.homeTeam, value: votes.home },
    { name: game.awayTeam, value: votes.away }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {game.homeTeam} vs {game.awayTeam}
        </h3>
        <span className="text-sm text-gray-500">
          {format(game.date, 'MMM d, yyyy')}
        </span>
      </div>

      {game.isFinished ? (
        <div className="mb-4 flex items-center justify-center space-x-4">
          <span className="text-2xl font-bold">{game.finalScore?.home}</span>
          <Trophy className="text-yellow-500" />
          <span className="text-2xl font-bold">{game.finalScore?.away}</span>
        </div>
      ) : (
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => onVote(game.id, 'home')}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Vote {game.homeTeam}
          </button>
          <button
            onClick={() => onVote(game.id, 'away')}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Vote {game.awayTeam}
          </button>
        </div>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <span>{game.homeTeam}: {homePercentage}%</span>
        <span>{game.awayTeam}: {awayPercentage}%</span>
      </div>

      <GameVoteStats votes={votes} />
    </div>
  );
}