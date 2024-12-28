import { Game } from '../types/game';
import { SheetGame } from '../types/sheet';

export function mapSheetGameToGame(sheetGame: SheetGame): Game {
  return {
    id: sheetGame.id,
    homeTeam: sheetGame.homeTeam,
    awayTeam: sheetGame.awayTeam,
    date: new Date(sheetGame.date),
    isFinished: sheetGame.isFinished,
    finalScore: sheetGame.isFinished ? {
      home: sheetGame.homeScore!,
      away: sheetGame.awayScore!
    } : undefined,
    votes: {
      home: sheetGame.homeVotes,
      away: sheetGame.awayVotes
    }
  };
}