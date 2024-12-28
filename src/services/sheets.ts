import { GOOGLE_CONFIG } from '../config/google';
import { makeGoogleSheetsRequest } from './api/googleSheets';
import { SheetGame } from '../types/sheet';
import { SheetResponse } from '../types/api';
import { getErrorMessage } from '../utils/errorHandling';

export async function getGamesFromSheet(): Promise<SheetGame[]> {
  try {
    const data = await makeGoogleSheetsRequest<SheetResponse>(
      '/values/Sheet1!A2:I'
    );
    
    if (!data.values?.length) {
      return [];
    }

    return data.values.map((row: any[]) => ({
      id: row[0] || String(Math.random()),
      homeTeam: row[1] || '',
      awayTeam: row[2] || '',
      date: row[3] || new Date().toISOString(),
      isFinished: row[4] === 'TRUE',
      homeScore: row[5] ? parseInt(row[5], 10) : undefined,
      awayScore: row[6] ? parseInt(row[6], 10) : undefined,
      homeVotes: parseInt(row[7], 10) || 0,
      awayVotes: parseInt(row[8], 10) || 0,
    }));
  } catch (error) {
    console.error('Error fetching games:', getErrorMessage(error));
    throw error;
  }
}