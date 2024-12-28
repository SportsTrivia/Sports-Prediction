export interface GameRow {
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