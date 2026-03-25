import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;