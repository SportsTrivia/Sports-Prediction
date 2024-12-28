import { ApiError } from '../../utils/errorHandling';
import { GOOGLE_CONFIG } from '../../config/google';
import { ApiError as ApiErrorType } from '../../types/api';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export async function makeGoogleSheetsRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${BASE_URL}/${GOOGLE_CONFIG.spreadsheetId}${endpoint}?key=${GOOGLE_CONFIG.apiKey}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData: ApiErrorType = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error?.message || `Request failed with status ${response.status}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to connect to Google Sheets API');
  }
}