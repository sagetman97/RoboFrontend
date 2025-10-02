import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const PageHeader = styled.div`
  margin-bottom: 0;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
  font-family: ${typography.fontSerif};
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: ${colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${spacing[8]};
  margin-top: ${spacing[4]};
  margin-bottom: ${spacing[4]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsNav = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const NavItem = styled.button<{ active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[4]} ${spacing[6]};
  background: ${props => props.active ? colors.lightGray : 'transparent'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${colors.border};

  &:hover {
    background: ${colors.lightGray};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NavIcon = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? colors.everlyCherry : colors.textSecondary};
`;

const NavLabel = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? colors.everlyCherry : colors.textPrimary};
`;

const SettingsContent = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: ${spacing[6]};
  border-bottom: 1px solid ${colors.border};
`;

const ContentTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const ContentBody = styled.div`
  padding: ${spacing[6]};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[6]};
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[2]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  background: ${colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  cursor: pointer;
  font-size: 14px;
  color: ${colors.textPrimary};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${colors.everlyCherry};
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  background: ${colors.everlyCherry};
  color: ${colors.white};
  border: none;
  border-radius: ${borderRadius.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: #A0005A;
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

const Settings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Agent',
    email: 'john.agent@everly.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    theme: 'light',
    language: 'en'
  });

  // Handle URL parameters for section navigation
  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam === 'notifications') {
      setActiveTab('notifications');
    }
  }, [searchParams]);

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </FormGroup>
          </>
        );

      case 'notifications':
        return (
          <>
            <FormGroup>
              <Label>Notification Preferences</Label>
              <CheckboxGroup>
                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                  />
                  Email notifications
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    checked={formData.notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                  />
                  SMS notifications
                </CheckboxItem>
                <CheckboxItem>
                  <Checkbox
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                  />
                  Push notifications
                </CheckboxItem>
              </CheckboxGroup>
            </FormGroup>
          </>
        );

      case 'security':
        return (
          <>
            <FormGroup>
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" />
            </FormGroup>
            <FormGroup>
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </FormGroup>
            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </FormGroup>
          </>
        );

      case 'appearance':
        return (
          <>
            <FormGroup>
              <Label>Theme</Label>
              <Select
                value={formData.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Language</Label>
              <Select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Select>
            </FormGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout currentPage="settings">
      <SettingsContainer>
        <PageHeader>
          <PageTitle>Settings</PageTitle>
          <PageSubtitle>Manage your account preferences and settings</PageSubtitle>
        </PageHeader>

        <SettingsGrid>
          <SettingsNav>
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavItem
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <NavIcon active={activeTab === tab.id}>
                    <Icon size={16} />
                  </NavIcon>
                  <NavLabel active={activeTab === tab.id}>{tab.label}</NavLabel>
                </NavItem>
              );
            })}
          </SettingsNav>

          <SettingsContent>
            <ContentHeader>
              <ContentTitle>
                {settingsTabs.find(tab => tab.id === activeTab)?.label}
              </ContentTitle>
            </ContentHeader>
            <ContentBody>
              {renderContent()}
              <SaveButton>
                <Save size={16} />
                Save Changes
              </SaveButton>
            </ContentBody>
          </SettingsContent>
        </SettingsGrid>
      </SettingsContainer>
    </MainLayout>
  );
};

export default Settings;
