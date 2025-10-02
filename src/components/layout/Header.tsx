import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, CheckCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import { colors, spacing, shadows, layout } from '../../styles/design-system';

const HeaderContainer = styled.header`
  height: ${layout.headerHeight};
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing[6]};
  box-shadow: ${shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  height: 40px;
  object-fit: contain;
  border: none;
  outline: none;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: ${spacing[2]};
  border-radius: 6px;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.everlyOrange};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: ${colors.error};
  border-radius: 50%;
  border: 2px solid ${colors.white};
`;

const NotificationDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: ${shadows.lg};
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const NotificationHeader = styled.div`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NotificationTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: ${colors.everlyCherry};
  font-size: 12px;
  cursor: pointer;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div<{ isUnread: boolean }>`
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isUnread ? colors.lightGray : 'transparent'};

  &:hover {
    background: ${colors.lightGray};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
`;

const NotificationIcon = styled.div<{ type: 'assessment' | 'report' | 'contact' | 'urgent' }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => {
    switch (props.type) {
      case 'assessment': return colors.everlyOrange;
      case 'report': return colors.everlyCherry;
      case 'contact': return colors.everlyBlue;
      case 'urgent': return colors.error;
      default: return colors.everlyGray;
    }
  }};
  color: ${colors.white};
`;

const NotificationText = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.div`
  font-size: 14px;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[1]};
  line-height: 1.4;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const NotificationActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
  margin-top: ${spacing[2]};
`;

const NotificationActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: ${colors.everlyCherry};
    color: ${colors.white};
    
    &:hover {
      background: ${colors.everlyCherry};
      opacity: 0.9;
    }
  ` : `
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
    
    &:hover {
      background: ${colors.everlyGray};
    }
  `}
`;

const EmptyNotifications = styled.div`
  padding: ${spacing[6]};
  text-align: center;
  color: ${colors.textSecondary};
  font-size: 14px;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing[1]};
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

const UserRole = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.everlyOrange} 0%, ${colors.everlyCherry} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${shadows.md};
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: ${shadows.lg};
  padding: ${spacing[2]};
  min-width: 200px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: ${colors.textPrimary};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.everlyCherry};
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${colors.border};
  margin: ${spacing[2]} 0;
`;

interface Notification {
  id: string;
  type: 'assessment' | 'report' | 'contact' | 'urgent';
  message: string;
  time: string;
  isUnread: boolean;
  clientName: string;
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary';
    onClick: () => void;
  }>;
}

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'John Agent',
  userRole = 'Life Insurance Agent',
  notificationCount = 3
}) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'assessment',
      message: 'completed the assessment form - ready for you to review the report',
      time: '2 hours ago',
      isUnread: true,
      clientName: 'Jessica Jones',
      actions: [
        {
          label: 'Review Report',
          variant: 'primary' as const,
          onClick: () => console.log('Navigate to report')
        },
        {
          label: 'View Client',
          variant: 'secondary' as const,
          onClick: () => console.log('Navigate to client')
        }
      ]
    },
    {
      id: '2',
      type: 'contact',
      message: 'life insurance report has been reviewed and accepted - ready for you to contact him',
      time: '5 days ago',
      isUnread: true,
      clientName: 'Dwight Schrute',
      actions: [
        {
          label: 'Contact Client',
          variant: 'primary' as const,
          onClick: () => console.log('Navigate to communication')
        },
        {
          label: 'View Report',
          variant: 'secondary' as const,
          onClick: () => console.log('Navigate to report')
        }
      ]
    },
    {
      id: '3',
      type: 'report',
      message: 'assessment form has been completed and report is ready for your review',
      time: '1 day ago',
      isUnread: true,
      clientName: 'Michael Scott',
      actions: [
        {
          label: 'Review Report',
          variant: 'primary' as const,
          onClick: () => console.log('Navigate to report')
        }
      ]
    },
    {
      id: '4',
      type: 'urgent',
      message: 'has been waiting for follow-up for over 7 days - please contact soon',
      time: '3 days ago',
      isUnread: false,
      clientName: 'Pam Beesly',
      actions: [
        {
          label: 'Contact Now',
          variant: 'primary' as const,
          onClick: () => console.log('Navigate to communication')
        }
      ]
    },
    {
      id: '5',
      type: 'assessment',
      message: 'assessment form was sent 3 days ago but not yet completed - consider follow-up',
      time: '3 days ago',
      isUnread: false,
      clientName: 'Jim Halpert',
      actions: [
        {
          label: 'Send Reminder',
          variant: 'primary' as const,
          onClick: () => console.log('Send reminder')
        },
        {
          label: 'View Client',
          variant: 'secondary' as const,
          onClick: () => console.log('Navigate to client')
        }
      ]
    }
  ]);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleNotificationClick = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isUnread: false } : n
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isUnread: false }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assessment': return <FileText size={16} />;
      case 'report': return <CheckCircle size={16} />;
      case 'contact': return <MessageSquare size={16} />;
      case 'urgent': return <AlertCircle size={16} />;
      default: return <Bell size={16} />;
    }
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setIsUserMenuOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon src="/Everly_HorizontalLogo.png" alt="Everly Logo" />
      </Logo>

      <RightSection>
        <div style={{ position: 'relative' }} data-dropdown>
          <NotificationButton onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
            <Bell size={20} />
            {unreadCount > 0 && <NotificationBadge />}
          </NotificationButton>
          
          <NotificationDropdown isOpen={isNotificationOpen}>
            <NotificationHeader>
              <NotificationTitle>Notifications</NotificationTitle>
              {unreadCount > 0 && (
                <MarkAllReadButton onClick={handleMarkAllRead}>
                  Mark all read
                </MarkAllReadButton>
              )}
            </NotificationHeader>
            
            <NotificationList>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    isUnread={notification.isUnread}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <NotificationContent>
                      <NotificationIcon type={notification.type}>
                        {getNotificationIcon(notification.type)}
                      </NotificationIcon>
                      <NotificationText>
                        <NotificationMessage>
                          <strong>{notification.clientName}</strong> {notification.message}
                        </NotificationMessage>
                        <NotificationTime>{notification.time}</NotificationTime>
                        {notification.actions && (
                          <NotificationActions>
                            {notification.actions.map((action, index) => (
                              <NotificationActionButton
                                key={index}
                                variant={action.variant}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick();
                                }}
                              >
                                {action.label}
                              </NotificationActionButton>
                            ))}
                          </NotificationActions>
                        )}
                      </NotificationText>
                    </NotificationContent>
                  </NotificationItem>
                ))
              ) : (
                <EmptyNotifications>
                  No notifications at this time
                </EmptyNotifications>
              )}
            </NotificationList>
          </NotificationDropdown>
        </div>

        <UserMenu data-dropdown>
          <UserInfo>
            <UserName>{userName}</UserName>
            <UserRole>{userRole}</UserRole>
          </UserInfo>
          <UserAvatar onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            {userName.split(' ').map(n => n[0]).join('')}
          </UserAvatar>
          
          <DropdownMenu isOpen={isUserMenuOpen}>
            <DropdownItem onClick={() => navigate('/settings')}>
              <User size={16} />
              Profile Settings
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/settings?section=notifications')}>
              <Settings size={16} />
              Preferences
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/login')}>
              <LogOut size={16} />
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </UserMenu>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
