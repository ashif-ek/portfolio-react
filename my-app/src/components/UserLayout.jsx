import { Outlet } from 'react-router-dom';
import Header from './Header'; // Your regular user header
import Footer from './Footer'; // Your regular user footer

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Child routes will render here (e.g., Home page) */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;