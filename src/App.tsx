import { useEffect, useState } from "react";
import CitySelectPage from "./pages/cities/CitySelect";
import MainPage from "./pages/main/MainPage";
import { load } from "./storage/storage";
import type { City } from "./api/cities";

type Page = "city" | "home" | "catalog" | "orders";

export default function App() {
  const [page, setPage] = useState<Page>("city");

  useEffect(() => {
    const saved = load<City | null>("city", null);
    setPage(saved ? "home" : "city");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900">
      {page === "city" && <CitySelectPage onSaved={() => setPage("home")} />}
      {page === "home" && <MainPage goTo={setPage} />}
      {page === "catalog" && <div className="p-6 text-white">📦 Catalog page (next)</div>}
      {page === "orders" && <div className="p-6 text-white">🧾 My Orders page (next)</div>}
    </div>
  );
}
