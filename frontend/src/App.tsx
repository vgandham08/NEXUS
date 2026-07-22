import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { CustomersView } from './views/CustomersView';
import { InventoryView } from './views/InventoryView';
import { SalesChallanView } from './views/SalesChallanView';
import { ReportsView } from './views/ReportsView';

const MainContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<NavItemKey>('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const tabTitles: Record<NavItemKey, string> = {
    dashboard: 'Executive Dashboard',
    customers: 'Customer CRM & Pipeline',
    inventory: 'Product Catalog & Inventory',
    challans: 'Sales Challans & Billing',
    reports: 'Reports & Analytics',
  };

  return (
    <div className="flex min-h-screen bg-[#0B1020] text-slate-100 font-sans selection:bg-[#5B5FFF]/30">
      <div className="gradient-orb-1 top-0 left-1/4" />
      <div className="gradient-orb-2 bottom-0 right-10" />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        <Navbar
          activeTabTitle={tabTitles[activeTab]}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenAiAssistant={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveTab}
              onOpenChallanBuilder={() => setActiveTab('challans')}
            />
          )}

          {activeTab === 'customers' && <CustomersView />}

          {activeTab === 'inventory' && <InventoryView />}

          {activeTab === 'challans' && <SalesChallanView />}

          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <MainContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;