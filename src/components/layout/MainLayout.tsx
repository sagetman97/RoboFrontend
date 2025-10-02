import React, { useState } from 'react';
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

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <LayoutContainer>
      <Header
        userName={userName}
        userRole={userRole}
        notificationCount={notificationCount}
      />
      
      <ContentWrapper sidebarCollapsed={sidebarCollapsed}>
        <Sidebar
          currentPage={currentPage}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
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
