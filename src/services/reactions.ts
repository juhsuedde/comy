import type { Reaction } from "@/types";
import { MOCK_REACTIONS } from "@/lib/mock-data";

export async function getReactions(mealId: string): Promise<Reaction[]> {
  return MOCK_REACTIONS[mealId] ?? [];
}

export async function toggleReaction(
  mealId: string,
  userId: string,
  emoji: string,
): Promise<void> {
  console.log("[reactions] toggleReaction", { mealId, userId, emoji });
}
