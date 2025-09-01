export type FoodItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Mock food data
export const mockFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Бургер Классический",
    price: 1200,
    image: "/burger.jpg",
    description: "Сочный бургер с говяжьей котлетой",
    category: "burger"
  },
  {
    id: 2,
    name: "Пицца Маргарита",
    price: 1800,
    image: "/pizza.jpg",
    description: "Классическая пицца с томатами и моцареллой",
    category: "pizza"
  },
  {
    id: 3,
    name: "Суп Борщ",
    price: 800,
    image: "/soup.jpg",
    description: "Традиционный украинский борщ",
    category: "soup"
  },
  {
    id: 4,
    name: "Салат Цезарь",
    price: 600,
    image: "/salad.jpg",
    description: "Свежий салат с курицей и сыром",
    category: "salad"
  },
  {
    id: 5,
    name: "Наггетсы",
    price: 400,
    image: "/nuggets.jpg",
    description: "Хрустящие куриные наггетсы",
    category: "snack"
  },
  {
    id: 6,
    name: "Кофе Американо",
    price: 300,
    image: "/coffee.jpg",
    description: "Крепкий черный кофе",
    category: "drink"
  }
];

export async function getFoodItems(): Promise<FoodItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFoodItems;
}
