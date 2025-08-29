type Tab = "catalog" | "orders";

type Props = {
    active: Tab
    onNavigate: (tab: Tab) => void
}

export default function BottomTabBar({ active, onNavigate }: Props) {
    const item = (key: Tab, label: string, emoji: string) => (
        <button
            type="button"
            className={`flex-1 py-3 text-center ${active === key ? "text-yellow-300" : "text-white/90 hover:text-white"}`}
            onClick={() => onNavigate(key)}
        >
            <span className="mr-1">{emoji}</span>
            {label}
        </button>
    );

    return (
        <div
            className="fixed inset-x-0 border-t border-white/10 bg-neutral-900/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60"
            style={{ bottom: 0, paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
        >
            <div className="mx-auto max-w-md">
                <nav className="flex">
                    {item("catalog", "Каталог", "🍔")}
                    {item("orders", "Заказы", "🧾")}
                </nav>
            </div>
        </div>
    );
} 