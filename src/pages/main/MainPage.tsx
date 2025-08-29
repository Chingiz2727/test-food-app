import { useEffect, useState } from "react";
import { load, save } from "../../storage/storage";
import type { City } from "../../api/cities";
import { getCities } from "../../api/cities";
import Stadiums from "../stadiums/Stadiums";

export default function MainPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(load<City | null>("city", null));
  const [showCityPicker, setShowCityPicker] = useState(false);

  // mock user data
  const user = { name: "Гость" };

  useEffect(() => {
    getCities().then(setCities);
  }, []);

  useEffect(() => {
    if (selectedCity) save("city", selectedCity);
  }, [selectedCity]);

  function chooseCity(city: City) {
    setSelectedCity(city);
    setShowCityPicker(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-6 bg-neutral-900 text-white">
      {/* Header */}
      <header className="w-full max-w-3xl flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="leading-tight">
            <div className="text-sm text-white/60">Пользователь</div>
            <div className="text-base font-semibold">{user.name}</div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 focus:outline-none"
            onClick={() => setShowCityPicker(v => !v)}
          >
            <span className="text-sm text-white/60">Город</span>
            <span className="font-semibold">{selectedCity?.name ?? "Не выбран"}</span>
            <span className="text-white/50">▾</span>
          </button>

          {showCityPicker && (
            <div className="absolute right-0 mt-2 w-56 max-h-60 overflow-auto rounded-xl bg-neutral-800 ring-1 ring-white/10 shadow-lg z-10">
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  className={`w-full text-left px-4 py-2 ${selectedCity?.id === city.id ? "bg-yellow-400/20 text-yellow-300" : "text-gray-200 hover:bg-neutral-700 hover:text-white"}`}
                  onClick={() => chooseCity(city)}
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Title / Brand */}
      <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-6">Food Stadium</h3>

      {/* Основной контент каталога (позже добавим карточки) */}
      <div className="w-full max-w-3xl text-white/70 text-center">
        <Stadiums /> 
      </div>
    </div>
  );
}
