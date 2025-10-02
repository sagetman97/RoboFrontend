import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import { colors, layout } from '../../styles/design-system';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div<{ sidebarCollapsed: boolean }>`
  display: flex;
  flex: 1;
  margin-top: ${layout.headerHeight};
`;

const MainContent = styled.main<{ sidebarCollapsed: boolean }>`
  flex: 1;
  padding: 24px;
  overflow-x: auto;
  transition: margin-left 0.3s ease;

  /* Adjust content when sidebar is open on smaller screens */
  @media (max-width: 1440px) {
    margin-left: ${props => props.sidebarCollapsed ? '0' : '280px'};
  }

  @media (max-width: 1280px) {
    margin-left: ${props => props.sidebarCollapsed ? '0' : '260px'};
  }

  @media (max-width: 1024px) {
    margin-left: ${props => props.sidebarCollapsed ? '0' : '240px'};
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentPage = 'dashboard',
  userName = 'John Agent',
  userRole = 'Life Insurance Agent',
  notificationCount = 3
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-collapse/expand sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse on MacBook screens and smaller laptops
      if (window.innerWidth <= 1440) {
        setSidebarCollapsed(true);
      } else {
        // Auto-expand on larger screens (external monitors)
        setSidebarCollapsed(false);
      }
    };

    // Check initial screen size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside to close sidebar on smaller screens for better UX
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Only auto-close on smaller laptop screens
      if (window.innerWidth <= 1440 && !sidebarCollapsed) {
        // Check if click is outside sidebar
        if (!target.closest('[data-sidebar]') && !target.closest('[data-menu-button]')) {
          setSidebarCollapsed(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarCollapsed]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <LayoutContainer>
      <Header
        userName={userName}
        userRole={userRole}
        notificationCount={notificationCount}
        onMobileMenuToggle={handleSidebarToggle}
      />
      
      <ContentWrapper sidebarCollapsed={sidebarCollapsed}>
        <Sidebar
          currentPage={currentPage}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          data-sidebar="true"
        />
        
        <MainContent sidebarCollapsed={sidebarCollapsed}>
          <PageContainer>
            {children}
          </PageContainer>
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default MainLayout;
