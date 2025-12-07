import { useState, useEffect, useMemo, useCallback } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { LayoutDashboard, FileText, Briefcase, Award, Settings, Inbox, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Api from '../components/Api';
import Sidebar from '../components/admin/Sidebar';
import StatsCard from '../components/admin/StatsCard';
import ImageUploader from '../components/admin/ImageUploader';

// --- Configuration ---
const dashboardConfig = {
    profile: {
        title: "Manage Profile",
        endpoint: "/profile",
        singularName: "Profile",
        isArray: false,
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'avatar', label: 'Profile Photo', type: 'image' },
        ],
    },
    skills: {
        title: "Manage Skills",
        endpoint: "/skills",
        singularName: "Skill",
        isArray: true,
        fields: [
            { name: 'name', label: 'Skill Name', type: 'text' },
            { name: 'level', label: 'Level (%)', type: 'number' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'icon', label: 'Icon Name', type: 'text' },
        ],
    },
    projects: {
        title: "Manage Projects",
        endpoint: "/projects",
        singularName: "Project",
        isArray: true,
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'tags', label: 'Tags', type: 'text' },
            { name: 'link', label: 'Demo Link', type: 'text' },
            { name: 'image', label: 'Project Image', type: 'image' }, // Checked in renderFormFields
        ],
    },
    certificates: {
        title: "Manage Certificates",
        endpoint: "/certificates",
        singularName: "Certificate",
        isArray: true,
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'issuer', label: 'Issuer', type: 'text' },
            { name: 'date', label: 'Date', type: 'text' },
            { name: 'image', label: 'Certificate Image', type: 'image' },
        ],
    },
    blogs: {
        title: "Manage Blogs",
        endpoint: "/blogs",
        singularName: "Blog",
        isArray: true,
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug', type: 'text' },
            { name: 'date', label: 'Date', type: 'text' },
            { name: 'summary', label: 'Summary', type: 'textarea' },
            { name: 'imageUrl', label: 'Cover Image', type: 'image' },
            { name: 'content', label: 'Content (Markdown)', type: 'textarea' },
        ],
    },
};

// --- Form Field Component with specialized Image Uploader ---
const FormField = ({ field, value, onChange, onImageUpload }) => (
    <div key={field.name} className="mb-5">
        <label htmlFor={field.name} className="block text-gray-700 text-sm font-semibold mb-2">{field.label}</label>
        {field.type === 'textarea' ? (
            <textarea
                id={field.name} name={field.name} value={value} onChange={onChange}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 h-32 transition-colors"
            />
        ) : field.type === 'image' ? (
            <ImageUploader initialImage={value} onUploadSuccess={(filename) => onImageUpload(field.name, filename)} />
        ) : (
            <input
                type={field.type} id={field.name} name={field.name} value={value} onChange={onChange}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            />
        )}
    </div>
);

// --- Edit Modal ---
const EditModal = ({ item, config, onSave, onClose, error }) => {
    const [editingItem, setEditingItem] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpdate = (fieldName, filename) => {
        setEditingItem(prev => ({ ...prev, [fieldName]: filename }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800">{item?.id ? 'Edit' : 'Add'} {config.singularName}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
                </div>
                
                <form onSubmit={(e) => onSave(e, editingItem)} className="flex-grow overflow-y-auto p-6 space-y-4">
                    {error && <div className="text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}
                    {config.fields.map(field => {
                         let value = editingItem[field.name];
                         // Handle arrays (tags) conversion for display if needed, but existing logic handled it in save.
                         // Simple display here:
                         if (Array.isArray(value)) value = value.join(', ');
                         return <FormField key={field.name} field={field} value={value || ''} onChange={handleChange} onImageUpload={handleImageUpdate} />;
                    })}
                </form>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                    <button onClick={(e) => onSave(e, editingItem)} className="px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 font-medium shadow-sm shadow-cyan-200">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard ---
const AdminDashboard = () => {
    const { logout } = useAuth();
    const [data, setData] = useState({ profile: {}, projects: [], certificates: [], skills: [], blogs: [], settings: {}, messages: [] });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({ type: null, item: null });
    const [settingsState, setSettingsState] = useState({}); // For local edits

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Initial Fetch
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const endpoints = [
                ...Object.entries(dashboardConfig).map(([k, c]) => ({ key: k, url: c.endpoint })),
                { key: 'settings', url: '/settings' },
                { key: 'messages', url: '/messages' }
            ];
            
            const results = await Promise.all(endpoints.map(ep => Api.get(ep.url).then(r => ({ [ep.key]: r.data })).catch(() => ({ [ep.key]: [] }))));
            const merged = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setData(merged);
            setSettingsState(merged.settings);
        } catch (err) {
            console.error("Fetch error", err);
            setError("Could not load backend data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // --- Actions ---
    const handleSave = async (e, itemToSave) => {
        e.preventDefault();
        const config = dashboardConfig[activeTab];
        let payload = { ...itemToSave };
        
        // Array conversions
        if (payload.tags && typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(t => t.trim()).filter(Boolean);

        const isNew = config.isArray && !itemToSave.id;
        const method = isNew ? 'post' : 'put';
        const url = config.isArray ? `${config.endpoint}${isNew ? '' : `/${itemToSave.id}`}` : config.endpoint;

        try {
            await Api[method](url, payload);
            fetchData(); // Refresh all
            setModalState({ type: null, item: null });
        } catch (err) {
            console.error(err);
            setError("Save failed.");
        }
    };

    const handleDelete = async (item) => {
        if (!window.confirm("Delete this item?")) return;
        const config = dashboardConfig[activeTab];
        try {
            await Api.delete(`${config.endpoint}/${item.id}`);
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleSettingsSave = async () => {
        try {
            await Api.put('/settings', settingsState);
            alert("Settings saved!");
            fetchData();
        } catch(err) { alert("Failed to save settings"); }
    };
    
    // --- Renderers ---

    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Projects" value={data.projects?.length || 0} icon={Briefcase} color="blue" />
            <StatsCard title="Published Blogs" value={data.blogs?.length || 0} icon={FileText} color="purple" />
            <StatsCard title="Skills Listed" value={data.skills?.length || 0} icon={Award} color="green" />
            <StatsCard title="Messages" value={data.messages?.length || 0} icon={Inbox} color="orange" />
        </div>
    );

    const renderInbox = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Messages</h3>
            </div>
            {(!data.messages || data.messages.length === 0) ? (
                <div className="p-8 text-center text-gray-500">No messages yet.</div>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {data.messages.map(msg => (
                        <li key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{msg.name} <span className="text-gray-400 font-normal text-sm">({msg.email})</span></h4>
                                <button onClick={async () => { await Api.delete(`/messages/${msg.id}`); fetchData(); }} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                            </div>
                            <p className="text-gray-600 mt-2">{msg.message}</p>
                            <span className="text-xs text-gray-400 mt-4 block">{new Date(msg.date).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Global Configuration</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                    <input 
                        type="text" 
                        value={settingsState.siteTitle || ''} 
                        onChange={e => setSettingsState({...settingsState, siteTitle: e.target.value})}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 block mt-4">Section Visibility</h4>
                    {['showBlog', 'showProjects', 'showSkills', 'showCertificates', 'maintenanceMode'].map(key => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <button 
                                onClick={() => setSettingsState({...settingsState, [key]: !settingsState[key]})}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settingsState[key] ? 'bg-cyan-600' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settingsState[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button onClick={handleSettingsSave} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );

    const renderMainContent = () => {
        if (activeTab === 'dashboard') return renderDashboard();
        if (activeTab === 'inbox') return renderInbox();
        if (activeTab === 'settings') return renderSettings();

        // Generic List View for standard CRUD tabs
        const config = dashboardConfig[activeTab];
        if (!config || !data[activeTab]) return <div>Starting up...</div>;

        return (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
                        <p className="text-sm text-gray-500">Manage your {config.singularName.toLowerCase()}s here</p>
                    </div>
                    <button 
                        onClick={() => {
                            const emptyItem = config.fields.reduce((acc, f) => ({...acc, [f.name]: f.name.includes('Link') ? '[]' : ''}), {});
                            setModalState({ type: 'edit', item: emptyItem });
                        }}
                        className={`flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${!config.isArray ? 'hidden' : ''}`}
                    >
                        <FiPlus size={18} /> Add New
                    </button>
                </div>

                {config.isArray ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="hidden md:table-row">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 block md:table-row-group">
                                {data[activeTab].map(item => (
                                    <tr key={item.id} className="block md:table-row hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 block md:table-cell">
                                            <div className="flex items-center">
                                                {item.image || item.imageUrl || item.icon ? (
                                                     <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 border border-gray-200">
                                                       {/* Simple preview logic */}
                                                        <span className="text-xs text-gray-500">Img</span>
                                                     </div>
                                                ) : null}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{item.title || item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.category || item.date}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3 block md:table-cell border-t md:border-t-0 border-gray-100">
                                            <button onClick={() => setModalState({ type: 'edit', item })} className="text-cyan-600 hover:text-cyan-800 font-medium text-sm transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(item)} className="text-red-400 hover:text-red-600 font-medium text-sm transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <div className="inline-block p-4 rounded-full bg-cyan-50 text-cyan-500 mb-4 overflow-hidden relative w-32 h-32">
                             {data[activeTab].avatar ? (
                                <img src={`http://localhost:5000/uploads/${data[activeTab].avatar}`} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                                <User size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                             )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{data[activeTab].name}</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">{data[activeTab].title}</p>
                        <button onClick={() => setModalState({ type: 'edit', item: data[activeTab] })} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                            Edit Profile Details
                        </button>
                    </div>
                )}
             </div>
        );
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse text-cyan-600 font-bold text-xl">Loading Command Center...</div></div>;

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="flex-1 md:ml-64 ml-0 p-4 md:p-8 overflow-y-auto h-screen transition-all duration-300">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900">
                            <FiMenu size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                {activeTab === 'dashboard' ? `Welcome back, Admin` : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm md:text-base hidden sm:block">Here's what's happening with your portfolio today.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">v2.1.0</span>
                    </div>
                </header>

                {renderMainContent()}
            </main>

            {modalState.type === 'edit' && (
                <EditModal 
                    item={modalState.item} 
                    config={dashboardConfig[activeTab]} 
                    onSave={handleSave} 
                    onClose={() => setModalState({ type: null, item: null })}
                    error={error}
                />
            )}
        </div>
    );
};

export default AdminDashboard;






