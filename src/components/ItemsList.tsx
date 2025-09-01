import { ReactNode } from "react";
import Card from "./Card";

type Item = {
  id: number;
  image: string;
  name: string;
};

type ItemsListProps<T extends Item> = {
  items: T[];
  loading: boolean;
  error: string | null;
  onItemClick?: (item: T) => void;
  renderItemContent?: (item: T) => ReactNode;
  loadingText?: string;
  errorText?: string;
};

export default function ItemsList<T extends Item>({
  items,
  loading,
  error,
  onItemClick,
  renderItemContent,
  loadingText = "Загрузка...",
  errorText = "Ошибка"
}: ItemsListProps<T>) {
  if (loading) {
    return <div className="text-center text-white/60">{loadingText}</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{errorText}: {error}</div>;
  }

  return (
    <div className="w-full space-y-4">
      {items.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.name}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        >
          {renderItemContent && renderItemContent(item)}
        </Card>
      ))}
    </div>
  );
}
