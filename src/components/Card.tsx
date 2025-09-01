import { ReactNode } from "react";

type CardProps = {
  image: string;
  title: string;
  onClick?: () => void;
  children?: ReactNode;
};

export default function Card({ image, title, onClick, children }: CardProps) {
  const CardWrapper = onClick ? "button" : "div";
  
  return (
    <CardWrapper
      onClick={onClick}
      className={`w-full bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:bg-neutral-700 transition-colors text-left ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="text-lg font-bold text-white mb-2">{title}</div>
        {children}
      </div>
    </CardWrapper>
  );
}
