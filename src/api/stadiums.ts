

export type Stadium = {
    id: number;
    name: string;
    cityId: number;
    image: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockStadiums: Stadium[] = [
    { id: 1, name: "Estadio de Semey Bernebau", cityId: 1, image: "/stadium.jpeg" },
    { id: 2, name: "Futsal Semey Iduna Park", cityId: 2, image: "/futsal.webp" }
]

export async function getStadiums() {
    await delay(500);
    return mockStadiums;
}

export async function getStadium(id: number) {
    await delay(500);
    return mockStadiums.find(stadium => stadium.id === id);
}