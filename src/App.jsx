
import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { SearchModal } from './components/layout/SearchModal';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';

// Pages
import { Overview } from './pages/Overview';
import { LiveSession } from './pages/LiveSession';
import { Conversations } from './pages/Conversations';
import { EmotionAnalytics } from './pages/EmotionAnalytics';
import { AudioPipeline } from './pages/AudioPipeline';
import { Models } from './pages/Models';
import { Performance } from './pages/Performance';
import { Sessions } from './pages/Sessions';
import { Settings } from './pages/Settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview onNavigate={setCurrentTab} />;
      case 'live-session':
        return <LiveSession />;
      case 'conversations':
        return <Conversations />;
      case 'emotion-analytics':
        return <EmotionAnalytics />;
      case 'audio-pipeline':
        return <AudioPipeline />;
      case 'models':
        return <Models />;
      case 'performance':
        return <Performance />;
      case 'sessions':
        return <Sessions onSelectSession={() => setCurrentTab('conversations')} />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F4F5F7] flex">
      {/* Collapsible Persistent Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Command Center Layout */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
        }`}
      >
        {/* Topbar */}
        <Topbar
          currentTab={currentTab}
          collapsed={sidebarCollapsed}
          onOpenSearch={() => setSearchOpen(true)}
          onToggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
          onNavigateSettings={() => setCurrentTab('settings')}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Global Overlays */}
      <SearchModal
        isOpen={searchOpen}
        onClose={setSearchOpen}
        onNavigate={setCurrentTab}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}


