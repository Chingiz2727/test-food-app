export type Restaurant = {
    id: number;
    name: string;
    cityId: number;
    stadiumIds: number[];
    image: string;
    description: string;
    address: string;
    phone: string;
    deliveryTime: string;
    deliveryFee: string;
    priceRange: string;
    rating: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockRestaurants: Restaurant[] = [
    { 
        id: 1, 
        name: "Saravanaa Bhavan Berlin", 
        cityId: 1, 
        stadiumIds: [1], 
        image: "/stadium.jpeg", 
        description: "Vegetarian South Indian Cuisine", 
        address: "Address 1", 
        phone: "1234567890",
        deliveryTime: "50-60",
        deliveryFee: "3,99 €",
        priceRange: "€€€€€",
        rating: "8,2"
    },
    { 
        id: 2, 
        name: "Kala", 
        cityId: 2, 
        stadiumIds: [2], 
        image: "/futsal.webp", 
        description: "where healthy and delicious meet", 
        address: "Address 2", 
        phone: "1234567890",
        deliveryTime: "35-45",
        deliveryFee: "3,99 €",
        priceRange: "€€€€€",
        rating: "9,0"
    }
]

export async function getRestaurants() {
    await delay(500);
    return mockRestaurants;
}