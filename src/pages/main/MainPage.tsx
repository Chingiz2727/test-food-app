import { useEffect, useState } from "react";
import { load, save } from "../../storage/storage";
import type { City } from "../../api/cities";
import { getCities } from "../../api/cities";
import CitiesListbox from "./CitiesListbox";

type Props = { goTo: (page: "catalog" | "orders" | "city") => void };

export default function MainPage({ goTo }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(load<City | null>("city", null));

  useEffect(() => {
    getCities().then(setCities);
  }, []);

  useEffect(() => {
    if (selectedCity) save("city", selectedCity);
  }, [selectedCity]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-neutral-900 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
        Food Stadium
      </h1>

      <div className="mb-8 w-full flex justify-center">
        <CitiesListbox label="Город" cities={cities} value={selectedCity} onChange={setSelectedCity} />
      </div>

      {selectedCity && (
        <div className="mb-8 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">
          Текущий город: <span className="font-semibold">{selectedCity.name}</span>
          <button
            className="ml-3 text-blue-400 underline"
            onClick={() => goTo("city")}
          >
            Изменить
          </button>
        </div>
      )}

      <div className="flex flex-col items-stretch w-full max-w-xs space-y-4">
        <button
          type="button"
          className="w-full py-4 rounded-2xl bg-yellow-400 text-white text-lg font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95"
          onClick={() => goTo("catalog")}
        >
          🍔 Сделать заказ
        </button>

        <button
          type="button"
          className="w-full py-4 rounded-2xl bg-green-500 text-white text-lg font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95"
          onClick={() => goTo("orders")}
        >
          🧾 Мои заказы
        </button>
      </div>
    </div>
  );
}
