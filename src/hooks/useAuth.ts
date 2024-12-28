import { useState, useEffect } from 'react';
import { initializeGoogleAuth, signOut } from '../services/auth/googleAuth';
import { getErrorMessage } from '../utils/errorHandling';

export function useAuth() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        await initializeGoogleAuth();
        if (mounted) {
          setIsInitialized(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload(); // Refresh to reset the app state
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    signOut: handleSignOut
  };
}