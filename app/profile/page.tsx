import { IUser } from "@/types/user";

type ProfileUpdateData = Partial<Pick<IUser, "name" | "email">>;

function updateProfile(userId: string, data: ProfileUpdateData) {
  console.log(`Updating user ${userId} with:`, data);
}

updateProfile("123", { name: "Prachir Updated" });
