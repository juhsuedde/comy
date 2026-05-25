export interface User {
  id: string
  username: string
  email: string
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export interface Meal {
  id: string
  user_id: string
  photo_url: string
  title: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'other'
  description: string | null
  tags: string[]
  created_at: string
  author?: User
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

export interface Reaction {
  id: string
  meal_id: string
  user_id: string
  emoji: string
  created_at: string
}

export interface Comment {
  id: string
  meal_id: string
  user_id: string
  text: string
  created_at: string
  author?: User
}

export const REACTION_EMOJIS = ['😋', '🤤', '🔥', '🥗', '💛'] as const

export const MEAL_CATEGORIES = [
  { value: 'breakfast', label: 'Café da manhã', icon: '🌅' },
  { value: 'lunch', label: 'Almoço', icon: '☀️' },
  { value: 'dinner', label: 'Jantar', icon: '🌙' },
  { value: 'snack', label: 'Lanche', icon: '🍿' },
  { value: 'other', label: 'Outro', icon: '🍽️' },
] as const
