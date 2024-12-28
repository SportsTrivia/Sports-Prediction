declare namespace gapi {
  namespace auth2 {
    interface GoogleAuth {
      isSignedIn: {
        get(): boolean;
        listen(callback: (signedIn: boolean) => void): void;
      };
      signIn(): Promise<GoogleUser>;
      signOut(): Promise<void>;
      currentUser: {
        get(): GoogleUser;
        listen(callback: (user: GoogleUser) => void): void;
      };
    }

    interface GoogleUser {
      getAuthResponse(includeAuthorizationData?: boolean): {
        access_token: string;
        id_token: string;
        scope: string;
        expires_in: number;
        expires_at: number;
      };
    }

    function getAuthInstance(): GoogleAuth;
    function init(params: {
      client_id: string;
      scope: string;
    }): Promise<void>;
  }

  function load(api: string, callback: () => void): void;

  namespace client {
    function init(config: {
      clientId: string;
      scope: string;
    }): Promise<void>;
  }
}