import { useState } from 'react';
import { Game } from '../types/game';
import { submitVote } from '../services/api/votesApi';
import { calculateUpdatedVotes } from '../utils/voteCalculator';

export const useVotes = () => {
  const [gameVotes, setGameVotes] = useState<Record<string, Game['votes']>>({});

  const vote = async (gameId: string, team: 'home' | 'away') => {
    try {
      await submitVote(gameId, team);
      setGameVotes(prev => {
        const currentVotes = prev[gameId] || { home: 0, away: 0 };
        return {
          ...prev,
          [gameId]: {
            ...currentVotes,
            [team]: (currentVotes[team] || 0) + 1
          }
        };
      });
    } catch (error) {
      console.error('Failed to submit vote:', error);
    }
  };

  const getUpdatedVotes = (game: Game): Game['votes'] => {
    if (!game?.votes) {
      return { home: 0, away: 0 };
    }
    return calculateUpdatedVotes(game.votes, gameVotes[game.id] || { home: 0, away: 0 });
  };

  return { vote, getUpdatedVotes };
};