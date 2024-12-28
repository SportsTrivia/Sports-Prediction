import { Game } from '../types/game';

export function calculateUpdatedVotes(
  baseVotes: Game['votes'],
  localVotes: Game['votes']
): Game['votes'] {
  return {
    home: baseVotes.home + (localVotes.home || 0),
    away: baseVotes.away + (localVotes.away || 0)
  };
}