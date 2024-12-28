import { Game } from '../types/game';
import { addDays } from 'date-fns';

export const games: Game[] = [
  {
    id: '1',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    date: addDays(new Date(), 1),
    isFinished: false,
    votes: { home: 45, away: 55 }
  },
  {
    id: '2',
    homeTeam: 'Celtics',
    awayTeam: 'Nets',
    date: new Date(),
    isFinished: true,
    finalScore: { home: 112, away: 98 },
    votes: { home: 70, away: 30 }
  },
  {
    id: '3',
    homeTeam: 'Bucks',
    awayTeam: 'Heat',
    date: addDays(new Date(), 2),
    isFinished: false,
    votes: { home: 60, away: 40 }
  }
];