import { ArrowUpRight } from 'lucide-react';

const colorStyles = {
    cyan: "bg-cyan-50 text-cyan-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600"
};

const StatsCard = ({ title, value, icon: Icon, color = "cyan" }) => {
    const colorClass = colorStyles[color] || colorStyles.cyan;

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-400">
                <span className="flex items-center text-green-600 mr-2">
                    <ArrowUpRight size={16} className="mr-1" />
                    Live
                </span>
                <span>Updated just now</span>
            </div>
        </div>
    );
};

export default StatsCard;
