import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Game } from '../../types/game';

interface VoteChartProps {
  game: Game;
  currentVotes: Game['votes'];
}

const COLORS = ['#3b82f6', '#ef4444'];

export const VoteChart: React.FC<VoteChartProps> = ({ game, currentVotes }) => {
  const data = [
    { name: game.homeTeam, value: currentVotes.home },
    { name: game.awayTeam, value: currentVotes.away }
  ];

  return (
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
  );
};