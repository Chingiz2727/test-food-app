// export type Restaurant = {
//     id: number;
//     name: string;
//     cityId: number;
//     stadiumIds: number[];
//     image: string;
//     description: string;
//     address: string;
//     phone: string;
// }

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const mockRestaurants: Restaurant[] = [
//     { id: 1, name: "Restaurant 1", cityId: 1, stadiumIds: [1], image: "/restaurant1.jpg", description: "Description 1", address: "Address 1", phone: "1234567890" },
//     { id: 2, name: "Restaurant 2", cityId: 2, stadiumIds: [2], image: "/restaurant2.jpg", description: "Description 2", address: "Address 2", phone: "1234567890" },
// ]

// export async function getRestaurants() {
//     await delay(500);
//     return mockRestaurants;
// }