import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { colors, spacing, shadows, layout } from '../../styles/design-system';

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  width: ${props => props.collapsed ? '80px' : layout.sidebarWidth};
  height: calc(100vh - ${layout.headerHeight});
  background: ${colors.white};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  top: ${layout.headerHeight};
  left: 0;
  z-index: 90;

  /* Large laptops and small external monitors */
  @media (max-width: 1536px) {
    width: ${props => props.collapsed ? '80px' : '300px'};
  }

  /* Standard laptops (MacBook Pro 13", ThinkPad, etc.) */
  @media (max-width: 1440px) {
    width: ${props => props.collapsed ? '80px' : '280px'};
  }

  /* Smaller laptops (MacBook Air, Ultrabooks) */
  @media (max-width: 1280px) {
    width: ${props => props.collapsed ? '80px' : '260px'};
  }

  /* Small laptops and large tablets */
  @media (max-width: 1024px) {
    width: ${props => props.collapsed ? '80px' : '240px'};
  }

  /* Tablets and very small laptops */
  @media (max-width: 768px) {
    width: ${props => props.collapsed ? '80px' : '220px'};
  }
`;

const SidebarHeader = styled.div`
  padding: ${spacing[4]} ${spacing[6]};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarTitle = styled.h3<{ collapsed: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  display: ${props => props.collapsed ? 'none' : 'block'};
  white-space: nowrap;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: ${spacing[2]};
  border-radius: 6px;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
  }
`;

const Navigation = styled.nav`
  flex: 1;
  padding: ${spacing[4]} 0;
`;

const NavSection = styled.div`
  margin-bottom: ${spacing[6]};
`;

const SectionTitle = styled.h4<{ collapsed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 ${spacing[6]};
  margin-bottom: ${spacing[3]};
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

const NavItem = styled(Link)<{ active?: boolean; collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[6]};
  color: ${props => props.active ? colors.everlyOrange : colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.everlyOrange};
  }

  ${props => props.active && `
    background: ${colors.lightGray};
    color: ${colors.everlyOrange};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${colors.everlyOrange};
    }
  `}

  ${props => props.collapsed && `
    justify-content: center;
    padding: ${spacing[3]};
  `}
`;

const NavIcon = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  color: ${props => props.active ? colors.everlyOrange : colors.textSecondary};
`;

const NavLabel = styled.span<{ collapsed: boolean }>`
  display: ${props => props.collapsed ? 'none' : 'block'};
  font-size: 14px;
`;


interface SidebarProps {
  currentPage?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage = 'dashboard',
  collapsed = false,
  onToggle
}) => {
  const location = useLocation();

  // Handle navigation click on small screens - prevent sidebar expansion when minimized
  const handleNavClick = (e: React.MouseEvent) => {
    if (window.innerWidth <= 1536 && collapsed) {
      // On small screens, if sidebar is minimized, prevent it from expanding
      e.preventDefault();
      e.stopPropagation();
      // Navigate directly without expanding sidebar
      const target = e.currentTarget as HTMLAnchorElement;
      if (target.href) {
        window.location.href = target.href;
      }
    }
  };
  
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/clients' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, path: '/communication' },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
  ];

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader>
        <SidebarTitle collapsed={collapsed}>Navigation</SidebarTitle>
        <ToggleButton onClick={onToggle}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </ToggleButton>
      </SidebarHeader>

      <Navigation>
        <NavSection>
          <SectionTitle collapsed={collapsed}>Main</SectionTitle>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.id}
                to={item.path}
                active={location.pathname === item.path}
                collapsed={collapsed}
                onClick={handleNavClick}
              >
                <NavIcon active={location.pathname === item.path}>
                  <Icon size={20} />
                </NavIcon>
                <NavLabel collapsed={collapsed}>{item.label}</NavLabel>
              </NavItem>
            );
          })}
        </NavSection>

        <NavSection>
          <SectionTitle collapsed={collapsed}>Account</SectionTitle>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.id}
                to={item.path}
                active={location.pathname === item.path}
                collapsed={collapsed}
                onClick={handleNavClick}
              >
                <NavIcon active={location.pathname === item.path}>
                  <Icon size={20} />
                </NavIcon>
                <NavLabel collapsed={collapsed}>{item.label}</NavLabel>
              </NavItem>
            );
          })}
        </NavSection>
      </Navigation>
    </SidebarContainer>
  );
};

export default Sidebar;
