import { useEffect, useState } from "react";
import { getRestaurants, type Restaurant } from "../../api/restaurants";

type Props = {
    onBack: () => void;
};

export default function Restaurants({ onBack }: Props) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = [
        { id: "all", name: "Все", count: restaurants.length, image: "🍽️" },
        { id: "asian", name: "Азиатская", count: 251, image: "🥢" },
        { id: "american", name: "Американская", count: 161, image: "🍔" },
        { id: "burger", name: "Бургеры", count: 198, image: "🍟" },
        { id: "pizza", name: "Пицца", count: 145, image: "🍕" },
        { id: "sushi", name: "Суши", count: 89, image: "🍣" },
    ];

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        getRestaurants()
        .then(list => { if (!cancelled) setRestaurants(list); })
        .catch(error => !cancelled && setError(String(error)))
        .finally(() => !cancelled && setLoading(false));

        return () => { cancelled = true; };
    }, []);

    if (loading) return <div className="text-center text-white/60 py-8">Загрузка ресторанов...</div>;
    if (error) return <div className="text-center text-red-400 py-8">Ошибка: {error}</div>;

    return (
        <div className="min-h-screen bg-neutral-900 text-white px-4 pb-20">
            {/* Header */}
            <header className="pt-6 pb-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/15"
                    >
                        <span className="text-white">←</span>
                    </button>
                    <h1 className="text-2xl font-bold">Рестораны</h1>
                    <div className="w-10"></div>
                </div>
            </header>

            {/* Category Filters */}
            <div className="mb-6">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl min-w-[100px] bg-white/10 text-white/90 ${
                                selectedCategory === category.id 
                                    ? 'ring-2 ring-yellow-400' 
                                    : ''
                            }`}
                        >
                            <span className="text-3xl">{category.image}</span>
                            <div className="text-center">
                                <div className="text-sm font-medium">{category.name}</div>
                                <div className="text-xs opacity-75">{category.count} мест</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Restaurants List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white/90 mb-3">Все рестораны</h2>
                
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-neutral-800 rounded-xl overflow-hidden">
                        <div className="relative">
                            <img 
                                src={restaurant.image} 
                                alt={restaurant.name} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                {restaurant.deliveryTime} мин
                            </div>
                            <button className="absolute top-3 left-3 p-2 rounded-full bg-black/30">
                                <span className="text-white">❤️</span>
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-white mb-1">{restaurant.name}</h3>
                            <p className="text-white/70 text-sm mb-3">{restaurant.description}</p>
                            
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-white/80">{restaurant.deliveryFee}</span>
                                    <span className="text-white/60">{restaurant.priceRange}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">😊</span>
                                    <span className="text-white/90">{restaurant.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}