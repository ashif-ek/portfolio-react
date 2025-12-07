import { ArrowUpRight } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color = "cyan" }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
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
