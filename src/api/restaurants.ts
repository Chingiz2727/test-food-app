export type Restaurant = {
    id: number;
    name: string;
    cityId: number;
    image: string;
    description: string;
    address: string;
    phone: string;
    website: string;
    email: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    pinterest: string;
    linkedin: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

