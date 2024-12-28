import { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { fetchGames } from '../services/api/gamesApi';
import { transformGameRow } from '../utils/gameTransformers';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await fetchGames();
        const transformedGames = data.map(transformGameRow);
        setGames(transformedGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games');
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return { games, loading, error };
};