import type { User, Meal, Comment, Reaction } from "@/types";
import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";
import avatarMe from "@/assets/avatar-me.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

export const MOCK_USERS: User[] = [
  {
    id: "user_sofia",
    username: "Sofia",
    email: "sofia@comy.app",
    avatar_url: avatarMe,
    bio: "I eat everything and post most of it. Based in São Paulo.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user_lucas",
    username: "Lucas",
    email: "lucas@comy.app",
    avatar_url: avatar1,
    bio: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user_marina",
    username: "Marina",
    email: "marina@comy.app",
    avatar_url: avatar2,
    bio: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "user_pedro",
    username: "Pedro",
    email: "pedro@comy.app",
    avatar_url: avatar3,
    bio: null,
    created_at: "2024-01-01T00:00:00Z",
  },
];

export const CURRENT_USER = MOCK_USERS[0];

const lucas = MOCK_USERS[1];
const marina = MOCK_USERS[2];
const pedro = MOCK_USERS[3];

export const MOCK_MEALS: Meal[] = [
  {
    id: "1",
    user_id: lucas.id,
    photo_url: meal1,
    title: "Miojo com ovo e queijo",
    category: "snack",
    description:
      "Aquele miojo de domingo à noite que salva a alma. Ovo mexido na hora e muito queijo derretido por cima.",
    tags: ["comfortfood", "domingo", "rápido", "homemade"],
    created_at: "2024-11-20T18:00:00Z",
    author: lucas,
  },
  {
    id: "2",
    user_id: marina.id,
    photo_url: meal2,
    title: "Salada com frango grelhado e abacate",
    category: "lunch",
    description: "Almoço leve antes do treino. Tempero simples, azeite e limão.",
    tags: ["fitfood", "almoço", "vegan-friendly"],
    created_at: "2024-11-20T12:00:00Z",
    author: marina,
  },
  {
    id: "3",
    user_id: pedro.id,
    photo_url: meal3,
    title: "Hambúrguer caseiro com fritas",
    category: "dinner",
    description:
      "Sexta à noite pede um burger feito em casa. Pão brioche, cheddar e bacon crocante.",
    tags: ["burger", "sextou", "homemade", "comfortfood"],
    created_at: "2024-11-20T20:00:00Z",
    author: pedro,
  },
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      meal_id: "1",
      user_id: marina.id,
      text: "Que delícia, agora deu fome!",
      created_at: "2024-11-20T19:00:00Z",
      author: marina,
    },
    {
      id: "c2",
      meal_id: "1",
      user_id: pedro.id,
      text: "Clássico imbatível 🔥",
      created_at: "2024-11-20T19:15:00Z",
      author: pedro,
    },
    {
      id: "c3",
      meal_id: "1",
      user_id: CURRENT_USER.id,
      text: "Manda a receita do ovo!",
      created_at: "2024-11-20T19:40:00Z",
      author: CURRENT_USER,
    },
  ],
  "2": [
    {
      id: "c4",
      meal_id: "2",
      user_id: lucas.id,
      text: "Que linda essa salada!",
      created_at: "2024-11-20T13:00:00Z",
      author: lucas,
    },
    {
      id: "c5",
      meal_id: "2",
      user_id: CURRENT_USER.id,
      text: "Vou copiar segunda 🙌",
      created_at: "2024-11-20T14:00:00Z",
      author: CURRENT_USER,
    },
    {
      id: "c6",
      meal_id: "2",
      user_id: pedro.id,
      text: "Abacate é vida",
      created_at: "2024-11-20T15:00:00Z",
      author: pedro,
    },
  ],
  "3": [
    {
      id: "c7",
      meal_id: "3",
      user_id: marina.id,
      text: "Tá com cara de profissional!",
      created_at: "2024-11-20T21:00:00Z",
      author: marina,
    },
    {
      id: "c8",
      meal_id: "3",
      user_id: lucas.id,
      text: "Quero um agora 🤤",
      created_at: "2024-11-20T22:00:00Z",
      author: lucas,
    },
    {
      id: "c9",
      meal_id: "3",
      user_id: CURRENT_USER.id,
      text: "Receita do pão?",
      created_at: "2024-11-20T22:30:00Z",
      author: CURRENT_USER,
    },
  ],
};

export const MOCK_REACTIONS: Record<string, Reaction[]> = {
  "1": [
    { id: "r1", meal_id: "1", user_id: "user_anon_1", emoji: "😋", created_at: "2024-11-20T18:30:00Z" },
    { id: "r2", meal_id: "1", user_id: "user_anon_2", emoji: "😋", created_at: "2024-11-20T18:35:00Z" },
    { id: "r3", meal_id: "1", user_id: "user_anon_3", emoji: "🤤", created_at: "2024-11-20T18:40:00Z" },
    { id: "r4", meal_id: "1", user_id: "user_anon_4", emoji: "🔥", created_at: "2024-11-20T18:45:00Z" },
    { id: "r5", meal_id: "1", user_id: "user_anon_5", emoji: "💛", created_at: "2024-11-20T18:50:00Z" },
  ],
  "2": [
    { id: "r6", meal_id: "2", user_id: "user_anon_1", emoji: "😋", created_at: "2024-11-20T12:30:00Z" },
    { id: "r7", meal_id: "2", user_id: "user_anon_2", emoji: "🥗", created_at: "2024-11-20T12:35:00Z" },
    { id: "r8", meal_id: "2", user_id: "user_anon_3", emoji: "🥗", created_at: "2024-11-20T12:40:00Z" },
    { id: "r9", meal_id: "2", user_id: "user_anon_4", emoji: "🔥", created_at: "2024-11-20T12:45:00Z" },
    { id: "r10", meal_id: "2", user_id: "user_anon_5", emoji: "💛", created_at: "2024-11-20T12:50:00Z" },
  ],
  "3": [
    { id: "r11", meal_id: "3", user_id: "user_anon_1", emoji: "😋", created_at: "2024-11-20T20:30:00Z" },
    { id: "r12", meal_id: "3", user_id: "user_anon_2", emoji: "😋", created_at: "2024-11-20T20:35:00Z" },
    { id: "r13", meal_id: "3", user_id: "user_anon_3", emoji: "🤤", created_at: "2024-11-20T20:40:00Z" },
    { id: "r14", meal_id: "3", user_id: "user_anon_4", emoji: "🔥", created_at: "2024-11-20T20:45:00Z" },
    { id: "r15", meal_id: "3", user_id: "user_anon_5", emoji: "💛", created_at: "2024-11-20T20:50:00Z" },
  ],
};

export const feedItems = [
  {
    id: "1",
    image: meal1,
    title: "Miojo com ovo e queijo",
    authorName: "Lucas",
    authorAvatar: avatar1,
    timeAgo: "2h ago",
    reactions: [
      { emoji: "😋", count: 12 },
      { emoji: "🤤", count: 5 },
      { emoji: "🔥", count: 3 },
      { emoji: "🥗", count: 1 },
      { emoji: "💛", count: 8 },
    ],
  },
  {
    id: "2",
    image: meal2,
    title: "Salada com frango grelhado e abacate",
    authorName: "Marina",
    authorAvatar: avatar2,
    timeAgo: "4h ago",
    reactions: [
      { emoji: "😋", count: 7 },
      { emoji: "🤤", count: 2 },
      { emoji: "🔥", count: 4 },
      { emoji: "🥗", count: 15 },
      { emoji: "💛", count: 6 },
    ],
  },
  {
    id: "3",
    image: meal3,
    title: "Hambúrguer caseiro com fritas",
    authorName: "Pedro",
    authorAvatar: avatar3,
    timeAgo: "6h ago",
    reactions: [
      { emoji: "😋", count: 21 },
      { emoji: "🤤", count: 14 },
      { emoji: "🔥", count: 18 },
      { emoji: "🥗", count: 0 },
      { emoji: "💛", count: 9 },
    ],
  },
];

export const mealDetailItems: Record<
  string,
  {
    image: string;
    title: string;
    authorName: string;
    authorAvatar: string;
    timeAgo: string;
    category: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Drink" | "Other";
    description?: string;
    hashtags: string[];
    reactions: { emoji: string; count: number }[];
    comments: { name: string; avatar: string; text: string; timeAgo: string }[];
  }
> = {
  "1": {
    image: meal1,
    title: "Miojo com ovo e queijo",
    authorName: "Lucas",
    authorAvatar: avatar1,
    timeAgo: "2h ago",
    category: "Snack",
    description:
      "Aquele miojo de domingo à noite que salva a alma. Ovo mexido na hora e muito queijo derretido por cima.",
    hashtags: ["comfortfood", "domingo", "rápido", "homemade"],
    reactions: [
      { emoji: "😋", count: 12 },
      { emoji: "🤤", count: 5 },
      { emoji: "🔥", count: 3 },
      { emoji: "🥗", count: 1 },
      { emoji: "💛", count: 8 },
    ],
    comments: [
      { name: "Marina", avatar: avatar2, text: "Que delícia, agora deu fome!", timeAgo: "1h ago" },
      { name: "Pedro", avatar: avatar3, text: "Clássico imbatível 🔥", timeAgo: "45m ago" },
      { name: "Sofia", avatar: avatarMe, text: "Manda a receita do ovo!", timeAgo: "20m ago" },
    ],
  },
  "2": {
    image: meal2,
    title: "Salada com frango grelhado e abacate",
    authorName: "Marina",
    authorAvatar: avatar2,
    timeAgo: "4h ago",
    category: "Lunch",
    description: "Almoço leve antes do treino. Tempero simples, azeite e limão.",
    hashtags: ["fitfood", "almoço", "vegan-friendly"],
    reactions: [
      { emoji: "😋", count: 7 },
      { emoji: "🤤", count: 2 },
      { emoji: "🔥", count: 4 },
      { emoji: "🥗", count: 15 },
      { emoji: "💛", count: 6 },
    ],
    comments: [
      { name: "Lucas", avatar: avatar1, text: "Que linda essa salada!", timeAgo: "3h ago" },
      { name: "Sofia", avatar: avatarMe, text: "Vou copiar segunda 🙌", timeAgo: "2h ago" },
      { name: "Pedro", avatar: avatar3, text: "Abacate é vida", timeAgo: "1h ago" },
    ],
  },
  "3": {
    image: meal3,
    title: "Hambúrguer caseiro com fritas",
    authorName: "Pedro",
    authorAvatar: avatar3,
    timeAgo: "6h ago",
    category: "Dinner",
    description:
      "Sexta à noite pede um burger feito em casa. Pão brioche, cheddar e bacon crocante.",
    hashtags: ["burger", "sextou", "homemade", "comfortfood"],
    reactions: [
      { emoji: "😋", count: 21 },
      { emoji: "🤤", count: 14 },
      { emoji: "🔥", count: 18 },
      { emoji: "🥗", count: 0 },
      { emoji: "💛", count: 9 },
    ],
    comments: [
      { name: "Marina", avatar: avatar2, text: "Tá com cara de profissional!", timeAgo: "5h ago" },
      { name: "Lucas", avatar: avatar1, text: "Quero um agora 🤤", timeAgo: "4h ago" },
      { name: "Sofia", avatar: avatarMe, text: "Receita do pão?", timeAgo: "2h ago" },
    ],
  },
};

export const profileGrid = [meal1, meal2, meal3, meal2, meal3, meal1, meal3, meal1, meal2];
