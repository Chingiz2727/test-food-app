type PageHeaderProps = {
  title: string;
  onBack?: () => void;
};

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <header className="pb-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/15"
          >
            <span className="text-white">←</span>
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="w-10"></div>
      </div>
    </header>
  );
}
