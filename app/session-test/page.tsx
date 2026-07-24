"use client";

import { useSession } from "@/lib/auth-client";
import { AuthState } from "@/types/auth";

function getAuthState(session: any, isPending: boolean): AuthState {
  if (isPending) {
    return { status: "loading" };
  }
  if (session?.user) {
    return {
      status: "authenticated",
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
    };
  }
  return { status: "unauthenticated" };
}

export default function SessionTest() {
  const { data: session, isPending } = useSession();
  const authState = getAuthState(session, isPending);

  // Eikhane magic — TypeScript "status" check korar por
  // automatically bujhe jay kon field available
  if (authState.status === "loading") {
    return <p>Loading...</p>;
  }

  if (authState.status === "unauthenticated") {
    return <p>Please log in</p>;
  }

  // Ei point e TypeScript nijei jane authState.user exist kore,
  // karon status === "authenticated" hole ai variant e user field thakei
  if (authState.status === "authenticated") {
    return <p>Welcome, {authState.user.name}!</p>;
  }
}
