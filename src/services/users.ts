import type { User } from "@/types";
import { MOCK_USERS } from "@/lib/mock-data";

export async function getUserById(id: string): Promise<User | null> {
  return MOCK_USERS.find((u) => u.id === id) ?? null;
}

export async function searchUsers(query: string): Promise<User[]> {
  const q = query.toLowerCase();
  return MOCK_USERS.filter((u) => u.username.toLowerCase().includes(q));
}

export async function getFollowing(userId: string): Promise<User[]> {
  return [];
}

export async function getFollowers(userId: string): Promise<User[]> {
  return [];
}
