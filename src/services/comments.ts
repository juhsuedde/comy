import type { Comment } from "@/types";
import { MOCK_COMMENTS, CURRENT_USER } from "@/lib/mock-data";

export async function getComments(mealId: string): Promise<Comment[]> {
  return MOCK_COMMENTS[mealId] ?? [];
}

export async function addComment(
  mealId: string,
  userId: string,
  text: string,
): Promise<Comment> {
  console.log("[comments] addComment", { mealId, userId, text });

  const comment: Comment = {
    id: crypto.randomUUID(),
    meal_id: mealId,
    user_id: userId,
    text,
    created_at: new Date().toISOString(),
    author: CURRENT_USER,
  };

  return comment;
}
