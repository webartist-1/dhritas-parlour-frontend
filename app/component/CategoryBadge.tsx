import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent } from "react";

type CategoryBadgeProps = {
    category: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    count: number;
};

const CategoryBadge: FC<CategoryBadgeProps> = ({ category, icon: Icon, count }) => {
    return (
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 hover:border-rose-300 transition-colors duration-200">
            <Icon className="h-5 w-5 text-rose-500" />
            <span className="font-medium text-gray-700">{category}</span>
            <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded-full font-medium">{count}</span>
        </div>
    );
};

export default CategoryBadge;