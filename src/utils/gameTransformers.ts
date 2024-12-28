import { Game } from '../types/game';
import { GameRow } from '../types/database';

export function transformGameRow(game: GameRow): Game {
  return {
    id: game.id,
    homeTeam: game.home_team,
    awayTeam: game.away_team,
    date: new Date(game.date),
    isFinished: game.is_finished,
    finalScore: game.is_finished ? {
      home: game.home_score!,
      away: game.away_score!
    } : undefined,
    votes: {
      home: game.home_votes,
      away: game.away_votes
    }
  };
}