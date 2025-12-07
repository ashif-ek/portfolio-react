import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    FileText, 
    Briefcase, 
    Award, 
    Settings, 
    Inbox, 
    LogOut,
    User
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'skills', label: 'Skills', icon: Award },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'certificates', label: 'Certificates', icon: FileText },
        { id: 'blogs', label: 'Blogs', icon: FileText },
        { id: 'inbox', label: 'Inbox', icon: Inbox },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white tracking-tight">Admin<span className="text-cyan-500">Panel</span></h2>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                                ${isActive 
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                                    : 'hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon size={20} className={`${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
