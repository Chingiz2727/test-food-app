import { useEffect, useState } from "react";
import { getStadiums, type Stadium } from "../../api/stadiums";
import { ItemsList } from "../../components";

type Props = {
    onStadiumSelect: (stadiumId: number) => void;
};

export default function Stadiums({ onStadiumSelect }: Props) {
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

    return (
        <ItemsList
            items={stadiums}
            loading={loading}
            error={error}
            onItemClick={(stadium) => onStadiumSelect(stadium.id)}
            loadingText="Загрузка стадионов..."
            errorText="Ошибка загрузки стадионов"
        />
    );
}