import { useEffect, useState } from "react";
import CitySelectPage from "./pages/cities/CitySelect";
import MainPage from "./pages/main/MainPage";
import { load } from "./storage/storage";
import type { City } from "./api/cities";
import BottomTabBar from "./pages/main/BottomTabBar";

type Page = "city" | "catalog" | "orders";

export default function App() {
  const [page, setPage] = useState<Page>("city");

  useEffect(() => {
    const saved = load<City | null>("city", null);
    setPage(saved ? "catalog" : "city");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 pb-16" style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px))" }}>
      {page === "city" && <CitySelectPage onSaved={() => setPage("catalog")} />}
      {page === "catalog" && <MainPage />}
      {page === "orders" && <div className="p-6 text-white">🧾 Мои заказы (скоро)</div>}

      {page !== "city" && (
        <BottomTabBar
          active={page as "catalog" | "orders"}
          onNavigate={(tab) => setPage(tab)}
        />
      )}
    </div>
  );
}
