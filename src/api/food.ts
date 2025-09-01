export type FoodItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type FoodCategory = {
  id: string;
  name: string;
  icon: string;
};

// Food categories
export const foodCategories: FoodCategory[] = [
  { id: "burgers", name: "Бургеры", icon: "🍔" },
  { id: "pizza", name: "Пицца", icon: "🍕" },
  { id: "drinks", name: "Напитки", icon: "🥤" },
  { id: "snacks", name: "Закуски", icon: "🍟" },
  { id: "soups", name: "Супы", icon: "🍲" },
  { id: "salads", name: "Салаты", icon: "🥗" },
];

// Mock food data organized by categories
export const mockFoodItems: FoodItem[] = [
  // Бургеры
  {
    id: 1,
    name: "Бургер Классический",
    price: 1200,
    image: "/burger.jpg",
    description: "Сочный бургер с говяжьей котлетой",
    category: "burgers"
  },
  {
    id: 2,
    name: "Чизбургер",
    price: 1400,
    image: "/cheeseburger.jpg",
    description: "Бургер с сыром и говяжьей котлетой",
    category: "burgers"
  },
  {
    id: 3,
    name: "Бургер с курицей",
    price: 1000,
    image: "/chicken-burger.jpg",
    description: "Бургер с куриной котлетой",
    category: "burgers"
  },

  // Пицца
  {
    id: 4,
    name: "Пицца Маргарита",
    price: 1800,
    image: "/pizza.jpg",
    description: "Классическая пицца с томатами и моцареллой",
    category: "pizza"
  },
  {
    id: 5,
    name: "Пицца Пепперони",
    price: 2200,
    image: "/pepperoni-pizza.jpg",
    description: "Пицца с пепперони и сыром",
    category: "pizza"
  },
  {
    id: 6,
    name: "Пицца Четыре сыра",
    price: 2400,
    image: "/four-cheese-pizza.jpg",
    description: "Пицца с четырьмя видами сыра",
    category: "pizza"
  },

  // Напитки
  {
    id: 7,
    name: "Кофе Американо",
    price: 300,
    image: "/coffee.jpg",
    description: "Крепкий черный кофе",
    category: "drinks"
  },
  {
    id: 8,
    name: "Кола",
    price: 250,
    image: "/cola.jpg",
    description: "Газированный напиток",
    category: "drinks"
  },
  {
    id: 9,
    name: "Сок апельсиновый",
    price: 200,
    image: "/orange-juice.jpg",
    description: "Свежевыжатый апельсиновый сок",
    category: "drinks"
  },

  // Закуски
  {
    id: 10,
    name: "Наггетсы",
    price: 400,
    image: "/nuggets.jpg",
    description: "Хрустящие куриные наггетсы",
    category: "snacks"
  },
  {
    id: 11,
    name: "Картошка фри",
    price: 350,
    image: "/fries.jpg",
    description: "Хрустящая картошка фри",
    category: "snacks"
  },
  {
    id: 12,
    name: "Чипсы",
    price: 200,
    image: "/chips.jpg",
    description: "Хрустящие чипсы",
    category: "snacks"
  },

  // Супы
  {
    id: 13,
    name: "Суп Борщ",
    price: 800,
    image: "/soup.jpg",
    description: "Традиционный украинский борщ",
    category: "soups"
  },
  {
    id: 14,
    name: "Суп Грибной",
    price: 600,
    image: "/mushroom-soup.jpg",
    description: "Ароматный грибной суп",
    category: "soups"
  },

  // Салаты
  {
    id: 15,
    name: "Салат Цезарь",
    price: 600,
    image: "/salad.jpg",
    description: "Свежий салат с курицей и сыром",
    category: "salads"
  },
  {
    id: 16,
    name: "Греческий салат",
    price: 500,
    image: "/greek-salad.jpg",
    description: "Салат с овощами и сыром фета",
    category: "salads"
  }
];

export async function getFoodItems(): Promise<FoodItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFoodItems;
}

export async function getFoodCategories(): Promise<FoodCategory[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return foodCategories;
}

