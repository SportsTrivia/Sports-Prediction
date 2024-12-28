export interface SheetGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  isFinished: boolean;
  homeScore?: number;
  awayScore?: number;
  homeVotes: number;
  awayVotes: number;
}