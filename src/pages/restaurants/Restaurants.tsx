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
        { id: "all", name: "Все", count: restaurants.length },
        { id: "asian", name: "Азиатская", count: 251 },
        { id: "american", name: "Американская", count: 161 },
        { id: "burger", name: "Бургеры", count: 198 },
        { id: "pizza", name: "Пицца", count: 145 },
        { id: "sushi", name: "Суши", count: 89 },
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
                <div className="flex justify-center">
                    <div className="inline-flex gap-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] pb-4 px-1 max-w-full">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 category-btn ${
                                    selectedCategory === category.id 
                                        ? "selected" 
                                        : ""
                                }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
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