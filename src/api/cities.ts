export type City = {
    id: number;
    name: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockCities: City[] = [
    { id: 1, name: "Семей" },
    { id: 2, name: "Алматы" },
    { id: 3, name: "Кентау" },
    { id: 4, name: "Астана" },
    { id: 5, name: "Шымкент" },
]

export async function getCities() {
    await delay(500);
    return mockCities;
}