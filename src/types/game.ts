export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  isFinished: boolean;
  finalScore?: {
    home: number;
    away: number;
  };
  votes: {
    home: number;
    away: number;
  };
}