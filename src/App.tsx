import React from 'react';
import { GameCard } from './components/GameCard';
import { useGames } from './hooks/useGames';
import { useVotes } from './hooks/useVotes';
import { Trophy } from 'lucide-react';

export default function App() {
  const { games, loading, error } = useGames();
  const { vote, getUpdatedVotes } = useVotes();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const upcomingGames = games?.filter(game => !game.isFinished) || [];
  const completedGames = games?.filter(game => game.isFinished) || [];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Game Predictions</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Games</h2>
          {upcomingGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onVote={vote}
              getUpdatedVotes={getUpdatedVotes}
            />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Games</h2>
          {completedGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onVote={vote}
              getUpdatedVotes={getUpdatedVotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}