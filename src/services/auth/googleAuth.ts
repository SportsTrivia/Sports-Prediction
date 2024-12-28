import { GOOGLE_CONFIG } from '../../config/google';
import { ApiError } from '../../utils/errorHandling';

let tokenData: { access_token: string; expires_at: number } | null = null;
let authInitialized = false;

export async function initializeGoogleAuth() {
  if (authInitialized) return;

  try {
    // Load the Google API client library
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API'));
      document.body.appendChild(script);
    });

    await new Promise<void>((resolve, reject) => {
      gapi.load('client:auth2', {
        callback: resolve,
        onerror: () => reject(new Error('Failed to load auth2'))
      });
    });

    await gapi.client.init({
      clientId: GOOGLE_CONFIG.clientId,
      scope: GOOGLE_CONFIG.scopes.join(' ')
    });

    authInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
    throw new ApiError('Failed to initialize Google authentication');
  }
}

export async function getAccessToken(): Promise<string> {
  if (!authInitialized) {
    await initializeGoogleAuth();
  }

  try {
    if (tokenData && tokenData.expires_at > Date.now()) {
      return tokenData.access_token;
    }

    const googleAuth = gapi.auth2.getAuthInstance();
    if (!googleAuth.isSignedIn.get()) {
      await googleAuth.signIn();
    }

    const currentUser = googleAuth.currentUser.get();
    const authResponse = currentUser.getAuthResponse();

    tokenData = {
      access_token: authResponse.access_token,
      expires_at: authResponse.expires_at
    };

    return tokenData.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw new ApiError('Authentication failed');
  }
}

export async function signOut() {
  if (!authInitialized) return;

  try {
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
    tokenData = null;
  } catch (error) {
    console.error('Failed to sign out:', error);
    throw new ApiError('Failed to sign out');
  }
}