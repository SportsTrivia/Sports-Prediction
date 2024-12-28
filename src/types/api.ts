export interface ApiError {
  error?: {
    message: string;
    status?: number;
  };
}

export interface SheetResponse {
  values?: any[][];
}

export interface VoteUpdateResponse {
  spreadsheetId: string;
  updatedRange: string;
}