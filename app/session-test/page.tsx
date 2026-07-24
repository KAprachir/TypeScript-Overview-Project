"use client";
import { useSession } from "@/lib/auth-client";

export default function SessionTest() {
  const { data: session, isPending, error } = useSession();
  console.log("session:", session);
  console.log("isPending:", isPending);
  console.log("error:", error);

  return (
    <div className="p-10">
      <pre>{JSON.stringify({ session, isPending, error }, null, 2)}</pre>
    </div>
  );
}
