import type { ReactNode } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Mobile Navigation */}
      <MobileNavbar />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 