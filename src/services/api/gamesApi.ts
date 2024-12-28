import { supabase } from '../../lib/supabase';
import { GameRow } from '../../types/database';

export async function fetchGames(): Promise<GameRow[]> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
}