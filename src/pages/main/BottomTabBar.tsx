type Tab = "catalog" | "orders";

type Props = {
    active: Tab
    onNavigate: (tab: Tab) => void
}

export default function BottomTabBar({ active, onNavigate }: Props) {
    const item = (key: Tab, label: string, emoji: string) => (
        <button
            type="button"
            className={`flex-1 py-3 text-center transition-colors duration-200 ${
                active === key 
                    ? "text-secondary font-semibold" 
                    : "text-text-secondary hover:text-text-primary"
            }`}
            onClick={() => onNavigate(key)}
        >
            <span className="mr-1">{emoji}</span>
            {label}
        </button>
    );

    return (
        <div
            className="fixed inset-x-0 border-t border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/60"
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