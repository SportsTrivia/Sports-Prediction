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

export function calculateVotePercentages(votes: Game['votes']) {
  const totalVotes = votes.home + votes.away;
  return {
    home: Math.round((votes.home / totalVotes) * 100) || 0,
    away: Math.round((votes.away / totalVotes) * 100) || 0,
    total: totalVotes
  };
}