





// import { useState, useEffect, useMemo } from 'react';
// import { FiEdit, FiTrash2, FiPlus, FiLogOut } from 'react-icons/fi';
// import { useAuth } from '../context/AuthContext';
// import Api from '../components/Api';

// // --- Central Configuration (UPDATED) ---
// const dashboardConfig = {
//     profile: {
//         title: "Manage Profile",
//         endpoint: "/profile",
//         singularName: "Profile",
//         isArray: false,
//         fields: [
//             { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
//             { name: 'title', label: 'Title', type: 'text', placeholder: 'e.g., Software Engineer' },
//             { name: 'description', label: 'Description', type: 'textarea' },
//             { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
//             { name: 'socialLinks', label: 'Social Links (JSON format)', type: 'textarea' },
//         ],
//     },
//     // ✅ ADDED SKILLS SECTION
//     skills: {
//         title: "Manage Skills",
//         endpoint: "/skills",
//         singularName: "Skill",
//         isArray: true,
//         fields: [
//             { name: 'name', label: 'Skill Name', type: 'text', placeholder: 'e.g., Django' },
//             { name: 'level', label: 'Proficiency Level (0-100)', type: 'number', placeholder: '95' },
//             { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g., Technology' },
//             { name: 'color', label: 'Color Hex Code', type: 'text', placeholder: '#44B78B' },
//             { name: 'icon', label: 'Icon Name', type: 'text', placeholder: 'e.g., PythonIcon' },
//         ],
//     },
//     projects: {
//         title: "Manage Projects",
//         endpoint: "/projects",
//         singularName: "Project",
//         isArray: true,
//         fields: [
//             { name: 'title', label: 'Title', type: 'text', placeholder: 'Project Name' },
//             { name: 'description', label: 'Description', type: 'textarea' },
//             { name: 'tags', label: 'Tags (comma-separated)', type: 'text', placeholder: 'React, Django, API' },
//             { name: 'image', label: 'Image Filename', type: 'text', placeholder: 'e.g., project.jpg' },
//             { name: 'link', label: 'Live Demo URL', type: 'text', placeholder: 'https://...' },
//             { name: 'github', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/...' },
//         ],
//     },
//     certificates: {
//         title: "Manage Certificates",
//         endpoint: "/certificates",
//         singularName: "Certificate",
//         isArray: true,
//         fields: [
//             { name: 'title', label: 'Title', type: 'text', placeholder: 'Certificate Name' },
//             { name: 'issuer', label: 'Issuer', type: 'text', placeholder: 'e.g., Google' },
//             { name: 'date', label: 'Date', type: 'text', placeholder: 'e.g., 2024-2025' },
//             { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g., Cybersecurity' },
//             { name: 'image', label: 'Image Filename', type: 'text', placeholder: 'e.g., bca.jpg' },
//             { name: 'description', label: 'Description', type: 'textarea' },
//             { name: 'credentialLink', label: 'Credential URL', type: 'text', placeholder: 'https://...' },
//         ],
//     },
// };


// // --- Helper Components (Unchanged) ---

// const FormField = ({ field, value, onChange }) => (
//     <div key={field.name} className="mb-4">
//         <label htmlFor={field.name} className="block text-gray-700 text-sm font-semibold mb-2">{field.label}</label>
//         {field.type === 'textarea' ? (
//             <textarea
//                 id={field.name} name={field.name} value={value} onChange={onChange}
//                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28"
//             />
//         ) : (
//             <input
//                 type={field.type} id={field.name} name={field.name} value={value} onChange={onChange}
//                 placeholder={field.placeholder}
//                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//         )}
//     </div>
// );

// const EditModal = ({ item, config, onSave, onClose, error }) => {
//     const [editingItem, setEditingItem] = useState(item);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditingItem(prev => ({ ...prev, [name]: value }));
//     };

//     const renderFormFields = () => {
//         return config.fields.map(field => {
//             let value = editingItem[field.name] || '';
//             if (typeof value === 'object' && value !== null) {
//                 value = JSON.stringify(value, null, 2);
//             }
//             if (Array.isArray(value)) {
//                 value = value.join(', ');
//             }
//             return <FormField key={field.name} field={field} value={value} onChange={handleChange} />;
//         });
//     };
    
//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
//                 <form onSubmit={(e) => onSave(e, editingItem)} className="flex-grow overflow-y-auto p-6">
//                     <h2 className="text-2xl font-bold mb-6 text-gray-900">{item?.id ? 'Edit' : 'Add'} {config.singularName}</h2>
//                     {error && <div className="text-sm text-red-700 bg-red-50 p-3 rounded-md mb-4">{error}</div>}
//                     {renderFormFields()}
//                     <div className="flex justify-end gap-4 pt-4 bg-white border-t border-gray-200 -mx-6 -mb-6 px-6 pb-4 mt-6 sticky bottom-0">
//                         <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md border border-gray-300">Cancel</button>
//                         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// const DeleteModal = ({ item, onConfirm, onClose }) => (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
//             <h2 className="text-xl font-bold mb-4 text-gray-900">Confirm Deletion</h2>
//             <p className="text-gray-600 mb-6">Are you sure you want to delete "<strong>{item?.title || item?.name}</strong>"? This action cannot be undone.</p>
//             <div className="flex justify-end gap-4">
//                 <button onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md border border-gray-300">Cancel</button>
//                 <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Delete</button>
//             </div>
//         </div>
//     </div>
// );


// // --- Main Component ---

// const AdminDashboard = () => {
//     const { logout } = useAuth();
//     // ✅ UPDATED initial state to include skills
//     const [data, setData] = useState({ profile: {}, projects: [], certificates: [], skills: [] });
//     const [activeTab, setActiveTab] = useState('profile');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [modalState, setModalState] = useState({ type: null, item: null });

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const requests = Object.entries(dashboardConfig).map(([key, config]) =>
//                     Api.get(config.endpoint).then(res => [key, res.data])
//                 );
//                 const results = await Promise.all(requests);
//                 setData(Object.fromEntries(results));
//             } catch (err) {
//                 setError("Failed to fetch data. Please ensure the JSON server is running.");
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     // ✅ FIXED PROFILE EDITING LOGIC
//     const handleSave = async (e, itemToSave) => {
//         e.preventDefault();
//         setError(null);
//         const config = dashboardConfig[activeTab];
        
//         let payload = { ...itemToSave };
//         // --- Data cleaning ---
//         if (payload.tags && typeof payload.tags === 'string') {
//             payload.tags = payload.tags.split(',').map(tag => tag.trim()).filter(Boolean);
//         }
//         if (payload.socialLinks && typeof payload.socialLinks === 'string') {
//             try {
//                 payload.socialLinks = JSON.parse(payload.socialLinks);
//             } catch {
//                 setError("Invalid JSON format for Social Links.");
//                 return;
//             }
//         }

//         // --- Determine API method and URL ---
//         const isNew = config.isArray && !itemToSave.id;
//         let url;
//         let method;

//         if (config.isArray) {
//             // Logic for array items (Projects, Certificates, Skills)
//             url = `${config.endpoint}${isNew ? '' : `/${itemToSave.id}`}`;
//             method = isNew ? 'post' : 'put';
//         } else {
//             // Logic for single object items (Profile)
//             url = config.endpoint; // e.g., '/profile'
//             method = 'put';        // Always update the single object
//         }

//         try {
//             const { data: savedItem } = await Api[method](url, payload);
//             setData(prev => {
//                 const updatedSection = config.isArray
//                     ? (isNew ? [...prev[activeTab], savedItem] : prev[activeTab].map(item => item.id === savedItem.id ? savedItem : item))
//                     : savedItem; // For profile, just replace the object
//                 return { ...prev, [activeTab]: updatedSection };
//             });
//             setModalState({ type: null, item: null });
//         } catch (err) {
//             setError(`Failed to save ${config.singularName}.`);
//             console.error("Save error:", err);
//         }
//     };
    
//     const handleDelete = async () => {
//         const { item } = modalState;
//         const config = dashboardConfig[item.type];
//         try {
//             await Api.delete(`${config.endpoint}/${item.id}`);
//             setData(prev => ({
//                 ...prev,
//                 [item.type]: prev[item.type].filter(i => i.id !== item.id)
//             }));
//             setModalState({ type: null, item: null });
//         } catch (err) {
//             setError(`Failed to delete ${config.singularName}.`);
//             console.error("Delete error:", err);
//         }
//     };
    
//     const openModal = (type, item = null) => {
//         setError(null);
//         if (type === 'edit' && !item) {
//             const config = dashboardConfig[activeTab];
//             item = config.fields.reduce((acc, field) => {
//                 acc[field.name] = field.name === 'socialLinks' ? '[]' : '';
//                 return acc;
//             }, {});
//         }
//         setModalState({ type, item });
//     };

//     const renderContent = useMemo(() => {
//         if (isLoading) return <div className="text-center p-10 text-gray-500">Loading...</div>;
//         if (error && !modalState.type) return <div className="text-center p-6 text-red-700 bg-red-50 rounded-lg border border-red-200">{error}</div>;

//         const config = dashboardConfig[activeTab];
//         const currentData = data[activeTab];

//         if (!currentData) return null;

//         return (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-200">
//                     <h3 className="text-xl font-semibold text-gray-800">{config.title}</h3>
//                     <button onClick={() => openModal('edit', config.isArray ? null : currentData)} className={`flex items-center gap-2 font-bold py-2 px-4 rounded-md transition-colors shadow-sm ${config.isArray ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'}`}>
//                         {config.isArray ? <><FiPlus /> Add New</> : <><FiEdit /> Edit Profile</>}
//                     </button>
//                 </div>
                
//                 {config.isArray ? (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead className="bg-gray-50 border-b border-gray-200">
//                                 <tr>
//                                     <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                                     <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Title/Name</th>
//                                     <th className="p-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentData.map(item => (
//                                     <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
//                                         <td className="p-4 font-mono text-sm text-gray-600">{item.id}</td>
//                                         <td className="p-4 text-gray-800 font-medium">{item.title || item.name}</td>
//                                         <td className="p-4 flex justify-end gap-4">
//                                             <button onClick={() => openModal('edit', item)} className="text-blue-600 hover:text-blue-800" title="Edit"><FiEdit size={18} /></button>
//                                             <button onClick={() => openModal('delete', { ...item, type: activeTab })} className="text-red-600 hover:text-red-800" title="Delete"><FiTrash2 size={18} /></button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <div className="p-6 space-y-2">
//                         <h4 className="font-bold text-lg text-gray-900">{currentData.name}</h4>
//                         <p className="text-gray-600">{currentData.title}</p>
//                         <p className="text-sm text-gray-500 pt-2">{currentData.description}</p>
//                     </div>
//                 )}
//             </div>
//         );
//     }, [isLoading, error, activeTab, data, modalState.type]);

//     return (
//         <div className="bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
//             <div className="max-w-7xl mx-auto">
//                 <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//                     <button onClick={logout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-sm">
//                         <FiLogOut />
//                         <span>Logout</span>
//                     </button>
//                 </header>

//                 <nav className="flex border-b border-gray-200 mb-6 overflow-x-auto">
//                     {Object.keys(dashboardConfig).map(key => (
//                         <button key={key} onClick={() => setActiveTab(key)}
//                             className={`py-3 px-4 -mb-px text-sm sm:text-base font-medium transition-colors capitalize whitespace-nowrap ${activeTab === key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'}`}
//                         >
//                             {key}
//                         </button>
//                     ))}
//                 </nav>

//                 <main>
//                     {renderContent}
//                 </main>
//             </div>

//             {modalState.type === 'edit' && (
//                 <EditModal
//                     item={modalState.item}
//                     config={dashboardConfig[activeTab]}
//                     onSave={handleSave}
//                     onClose={() => setModalState({ type: null, item: null })}
//                     error={error}
//                 />
//             )}
            
//             {modalState.type === 'delete' && (
//                 <DeleteModal
//                     item={modalState.item}
//                     onConfirm={handleDelete}
//                     onClose={() => setModalState({ type: null, item: null })}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;












































import { useState, useEffect, useMemo, useCallback } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Api from '../components/Api';

// --- Central Configuration for the Dashboard ---
const dashboardConfig = {
    profile: {
        title: "Manage Profile",
        endpoint: "/profile",
        singularName: "Profile",
        isArray: false,
        fields: [
            { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
            { name: 'title', label: 'Title', type: 'text', placeholder: 'e.g., Software Engineer' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            { name: 'socialLinks', label: 'Social Links (JSON format)', type: 'textarea' },
        ],
    },
    skills: {
        title: "Manage Skills",
        endpoint: "/skills",
        singularName: "Skill",
        isArray: true,
        fields: [
            { name: 'name', label: 'Skill Name', type: 'text', placeholder: 'e.g., Django' },
            { name: 'level', label: 'Proficiency Level (0-100)', type: 'number', placeholder: '95' },
            { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g., Technology' },
            { name: 'color', label: 'Color Hex Code', type: 'text', placeholder: '#44B78B' },
            { name: 'icon', label: 'Icon Name', type: 'text', placeholder: 'e.g., PythonIcon' },
        ],
    },
    projects: {
        title: "Manage Projects",
        endpoint: "/projects",
        singularName: "Project",
        isArray: true,
        fields: [
            { name: 'title', label: 'Title', type: 'text', placeholder: 'Project Name' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'tags', label: 'Tags (comma-separated)', type: 'text', placeholder: 'React, Django, API' },
            { name: 'image', label: 'Image Filename', type: 'text', placeholder: 'e.g., project.jpg' },
            { name: 'link', label: 'Live Demo URL', type: 'text', placeholder: 'https://...' },
            { name: 'github', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/...' },
        ],
    },
    certificates: {
        title: "Manage Certificates",
        endpoint: "/certificates",
        singularName: "Certificate",
        isArray: true,
        fields: [
            { name: 'title', label: 'Title', type: 'text', placeholder: 'Certificate Name' },
            { name: 'issuer', label: 'Issuer', type: 'text', placeholder: 'e.g., Google' },
            { name: 'date', label: 'Date', type: 'text', placeholder: 'e.g., 2024-2025' },
            { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g., Cybersecurity' },
            { name: 'image', label: 'Image Filename', type: 'text', placeholder: 'e.g., bca.jpg' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'credentialLink', label: 'Credential URL', type: 'text', placeholder: 'https://...' },
        ],
    },
};


// --- Reusable UI Components ---

const FormField = ({ field, value, onChange }) => (
    <div key={field.name} className="mb-4">
        <label htmlFor={field.name} className="block text-gray-700 text-sm font-semibold mb-2">{field.label}</label>
        {field.type === 'textarea' ? (
            <textarea
                id={field.name} name={field.name} value={value} onChange={onChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28"
            />
        ) : (
            <input
                type={field.type} id={field.name} name={field.name} value={value} onChange={onChange}
                placeholder={field.placeholder}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        )}
    </div>
);

const EditModal = ({ item, config, onSave, onClose, error }) => {
    const [editingItem, setEditingItem] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prev => ({ ...prev, [name]: value }));
    };

    const renderFormFields = () => {
        return config.fields.map(field => {
            let value = editingItem[field.name] || '';
            if (typeof value === 'object' && value !== null) {
                value = JSON.stringify(value, null, 2);
            }
            if (Array.isArray(value)) {
                value = value.join(', ');
            }
            return <FormField key={field.name} field={field} value={value} onChange={handleChange} />;
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                <form onSubmit={(e) => onSave(e, editingItem)} className="flex-grow overflow-y-auto p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">{item?.id ? 'Edit' : 'Add'} {config.singularName}</h2>
                    {error && <div className="text-sm text-red-700 bg-red-50 p-3 rounded-md mb-4">{error}</div>}
                    {renderFormFields()}
                    <div className="flex justify-end gap-4 pt-4 bg-white border-t border-gray-200 -mx-6 -mb-6 px-6 pb-4 mt-6 sticky bottom-0">
                        <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md border border-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const DeleteModal = ({ item, onConfirm, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "<strong>{item?.title || item?.name}</strong>"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
                <button onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md border border-gray-300">Cancel</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Delete</button>
            </div>
        </div>
    </div>
);


// --- Main AdminDashboard Component ---

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [data, setData] = useState({ profile: {}, projects: [], certificates: [], skills: [] });
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({ type: null, item: null });

    // Fetch initial data for all sections from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const requests = Object.entries(dashboardConfig).map(([key, config]) =>
                    Api.get(config.endpoint).then(res => [key, res.data])
                );
                const results = await Promise.all(requests);
                setData(Object.fromEntries(results));
            } catch (err) {
                setError("Failed to fetch data. Please ensure the API server is running.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handles saving both new and existing items
    const handleSave = async (e, itemToSave) => {
        e.preventDefault();
        setError(null);
        const config = dashboardConfig[activeTab];
        
        let payload = { ...itemToSave };
        
        // Clean up data before sending to API
        if (payload.tags && typeof payload.tags === 'string') {
            payload.tags = payload.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        }
        if (payload.socialLinks && typeof payload.socialLinks === 'string') {
            try {
                payload.socialLinks = JSON.parse(payload.socialLinks);
            } catch {
                setError("Invalid JSON format for Social Links.");
                return;
            }
        }

        const isNew = config.isArray && !itemToSave.id;
        const method = isNew ? 'post' : 'put';
        const url = config.isArray
            ? `${config.endpoint}${isNew ? '' : `/${itemToSave.id}`}`
            : config.endpoint; // For single objects like profile

        try {
            const { data: savedItem } = await Api[method](url, payload);
            setData(prev => {
                const updatedSection = config.isArray
                    ? (isNew ? [...prev[activeTab], savedItem] : prev[activeTab].map(item => item.id === savedItem.id ? savedItem : item))
                    : savedItem;
                return { ...prev, [activeTab]: updatedSection };
            });
            setModalState({ type: null, item: null });
        } catch (err) {
            setError(`Failed to save ${config.singularName}.`);
            console.error("Save error:", err);
        }
    };
    
    // Handles deleting an item
    const handleDelete = async () => {
        const { item } = modalState;
        const config = dashboardConfig[item.type];
        try {
            await Api.delete(`${config.endpoint}/${item.id}`);
            setData(prev => ({
                ...prev,
                [item.type]: prev[item.type].filter(i => i.id !== item.id)
            }));
            setModalState({ type: null, item: null });
        } catch (err) {
            setError(`Failed to delete ${config.singularName}.`);
            console.error("Delete error:", err);
        }
    };
    
    // Opens a modal for editing, adding, or deleting
    const openModal = useCallback((type, item = null) => {
        setError(null);
        if (type === 'edit' && !item) {
            const config = dashboardConfig[activeTab];
            // Create a blank item based on config fields for "Add New"
            item = config.fields.reduce((acc, field) => {
                acc[field.name] = field.name === 'socialLinks' ? '[]' : '';
                return acc;
            }, {});
        }
        setModalState({ type, item });
    }, [activeTab]); // Dependency for useCallback

    // Memoized content rendering to improve performance
    const renderContent = useMemo(() => {
        if (isLoading) return <div className="text-center p-10 text-gray-500">Loading...</div>;
        if (error && !modalState.type) return <div className="text-center p-6 text-red-700 bg-red-50 rounded-lg border border-red-200">{error}</div>;

        const config = dashboardConfig[activeTab];
        const currentData = data[activeTab];

        if (!currentData) return null;

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">{config.title}</h3>
                    <button onClick={() => openModal('edit', config.isArray ? null : currentData)} className={`flex items-center gap-2 font-bold py-2 px-4 rounded-md transition-colors shadow-sm ${config.isArray ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'}`}>
                        {config.isArray ? <><FiPlus /> Add New</> : <><FiEdit /> Edit Profile</>}
                    </button>
                </div>
                
                {config.isArray ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Title/Name</th>
                                    <th className="p-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map(item => (
                                    <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm text-gray-600">{item.id}</td>
                                        <td className="p-4 text-gray-800 font-medium">{item.title || item.name}</td>
                                        <td className="p-4 flex justify-end gap-4">
                                            <button onClick={() => openModal('edit', item)} className="text-blue-600 hover:text-blue-800" title="Edit"><FiEdit size={18} /></button>
                                            <button onClick={() => openModal('delete', { ...item, type: activeTab })} className="text-red-600 hover:text-red-800" title="Delete"><FiTrash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-6 space-y-2">
                        <h4 className="font-bold text-lg text-gray-900">{currentData.name}</h4>
                        <p className="text-gray-600">{currentData.title}</p>
                        <p className="text-sm text-gray-500 pt-2">{currentData.description}</p>
                    </div>
                )}
            </div>
        );
    }, [isLoading, error, activeTab, data, modalState.type, openModal]); // Dependencies for useMemo

    return (
        <div className="bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={logout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-sm">
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </header>

                <nav className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                    {Object.keys(dashboardConfig).map(key => (
                        <button key={key} onClick={() => setActiveTab(key)}
                            className={`py-3 px-4 -mb-px text-sm sm:text-base font-medium transition-colors capitalize whitespace-nowrap ${activeTab === key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'}`}
                        >
                            {key}
                        </button>
                    ))}
                </nav>

                <main>
                    {renderContent}
                </main>
            </div>

            {modalState.type === 'edit' && (
                <EditModal
                    item={modalState.item}
                    config={dashboardConfig[activeTab]}
                    onSave={handleSave}
                    onClose={() => setModalState({ type: null, item: null })}
                    error={error}
                />
            )}
            
            {modalState.type === 'delete' && (
                <DeleteModal
                    item={modalState.item}
                    onConfirm={handleDelete}
                    onClose={() => setModalState({ type: null, item: null })}
                />
            )}
        </div>
    );
};

export default AdminDashboard;