import { IUser } from "@/types/user";

type ProfileUpdateData = Partial<Pick<IUser, "name" | "email">>;

function updateProfile(userId: string, data: ProfileUpdateData) {
  console.log(`Updating user ${userId} with:`, data);
}

// Test call (console এ দেখার জন্য, পরে UI বানাবা)
updateProfile("123", { name: "Prachir Updated" });

export default function ProfilePage() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Profile (utility types test)</h1>
      <p>Check console/network for updateProfile test call</p>
    </div>
  );
}
