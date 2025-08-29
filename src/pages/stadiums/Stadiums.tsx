import { useEffect, useState } from "react";
import { getStadiums, type Stadium } from "../../api/stadiums";

export default function Stadiums() {
    const [stadiums, setStadiums] = useState<Stadium[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        getStadiums()
        .then(list => { if (!cancelled) setStadiums(list); })
        .catch(error => !cancelled && setError(String(error)))
        .finally(() => !cancelled && setLoading(false));

        return () => { cancelled = true; };
    }, []);

    if (loading) return <div className="text-center text-white/60">Загрузка стадионов...</div>;
    if (error) return <div className="text-center text-red-400">Ошибка: {error}</div>;

    return (
        <div className="w-full space-y-4">
            {stadiums.map(stadium => (  
                <div key={stadium.id} className="w-full bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
                    <img src={stadium.image} alt={stadium.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <div className="text-lg font-bold text-white mb-2">{stadium.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}