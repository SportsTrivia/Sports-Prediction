import { supabase } from '../lib/supabase';

interface GameRow {
  id: string;
  home_team: string;
  away_team: string;
  date: string;
  is_finished: boolean;
  home_score: number | null;
  away_score: number | null;
  home_votes: number;
  away_votes: number;
}

export async function fetchGames(): Promise<GameRow[]> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function submitVote(gameId: string, team: 'home' | 'away') {
  const { error } = await supabase.rpc('increment_vote', {
    game_id: gameId,
    team_vote: team
  });
  
  if (error) throw error;
}