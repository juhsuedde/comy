import type { Meal } from "@/types";
import { MOCK_MEALS } from "@/lib/mock-data";

export async function getFeedMeals(userId: string): Promise<Meal[]> {
  return MOCK_MEALS.filter((m) => m.user_id !== userId);
}

export async function getMealById(id: string): Promise<Meal | null> {
  return MOCK_MEALS.find((m) => m.id === id) ?? null;
}

export async function createMeal(
  data: Omit<Meal, "id" | "created_at">,
): Promise<Meal> {
  console.log("[meals] createMeal called with", data);

  const meal: Meal = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  return meal;
}
