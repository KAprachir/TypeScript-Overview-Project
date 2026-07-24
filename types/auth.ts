interface AuthenticatedState {
  status: "authenticated";
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface UnauthenticatedState {
  status: "unauthenticated";
}

interface LoadingState {
  status: "loading";
}

// Eitai discriminated union — "status" field ta discriminator
export type AuthState = AuthenticatedState | UnauthenticatedState | LoadingState;