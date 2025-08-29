import { useEffect, useState } from "react";
import { load, save } from "../../storage/storage";
import type { City } from "../../api/cities";
import { getCities } from "../../api/cities";
import CitiesListbox from "./CitiesListbox";

export default function MainPage() {
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

      {/* Контент главной страницы без локального нижнего бара */}
    </div>
  );
}
