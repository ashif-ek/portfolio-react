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

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, onClose }) => {
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
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-gray-300 flex flex-col border-r border-gray-800 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
            `}>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Admin<span className="text-cyan-500">Panel</span></h2>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    onClose(); // Close sidebar on mobile selection
                                }}
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
        </>
    );
};

export default Sidebar;
