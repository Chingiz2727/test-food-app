import { useEffect, useState } from "react";
import { getCities, type City } from "../../api/cities";
import { save } from "../../storage/storage";
import CitiesListbox from "../main/CitiesListbox";
type Props = {
    onSaved: () => void;
}

export default function CitySelect({ onSaved }: Props) {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        getCities()
        .then(list => { if (!cancelled) setCities(list); })
        .catch(error => !cancelled && setError(String(error)))
        .finally(() => !cancelled && setLoading(false));

        return () => { cancelled = true; };
    }, []);

    const onSave = () => {
        if (selectedCity) {
            save("city", selectedCity);
            onSaved();
        }
    }


return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Выберите ваш город</h1>

      <div className="w-full max-w-sm rounded-2xl p-5 bg-white/10">
        {loading && <div className="text-white/80">Загрузка списка городов…</div>}

        {error && (
          <div className="text-red-400 space-y-4">
            <div>Не удалось загрузить список городов: {error}</div>
            <button
              className="px-3 py-2 rounded-xl bg-blue-600 text-white"
              onClick={() => {
                setLoading(true); setError(null);
                getCities()
                  .then(setCities)
                  .catch(e => setError(String(e)))
                  .finally(() => setLoading(false));
              }}
            >
              Повторить
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
              <CitiesListbox label="Город" cities={cities} value={selectedCity} onChange={setSelectedCity} />

            <button
              className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
              disabled={!selectedCity}
              onClick={onSave}
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 