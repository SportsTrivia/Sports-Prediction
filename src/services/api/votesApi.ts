import { supabase } from '../../lib/supabase';

export async function submitVote(gameId: string, team: 'home' | 'away') {
  const { error } = await supabase.rpc('increment_vote', {
    game_id: gameId,
    team_vote: team
  });
  
  if (error) throw error;
}