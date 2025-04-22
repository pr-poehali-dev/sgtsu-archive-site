import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300",
      className
    )}>
      <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-archive-blue mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-archive-darkBlue">{title}</h3>
      <p className="text-archive-gray">{description}</p>
    </div>
  );
};

export default FeatureCard;
