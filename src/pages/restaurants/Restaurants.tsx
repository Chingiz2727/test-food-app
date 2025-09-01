import { useEffect, useState } from "react";
import { getRestaurants, type Restaurant } from "../../api/restaurants";
import { ItemsList, PageHeader, CategoryFilters } from "../../components";

type Props = {
    onBack: () => void;
    onRestaurantSelect: (restaurantId: number) => void;
};

export default function Restaurants({ onBack, onRestaurantSelect }: Props) {
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

    return (
        <div className="w-full">
            <PageHeader title="Рестораны" onBack={onBack} />

            <CategoryFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />

            {/* Restaurants List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white/90 mb-3">Все рестораны</h2>
                
                <ItemsList
                    items={restaurants}
                    loading={loading}
                    error={error}
                    onItemClick={(restaurant) => onRestaurantSelect(restaurant.id)}
                    loadingText="Загрузка ресторанов..."
                    errorText="Ошибка загрузки ресторанов"
                />
            </div>
        </div>
    );
}