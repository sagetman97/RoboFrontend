import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Send,
  Eye,
  Activity,
  Plus,
  MessageSquare,
  FileEdit
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const QuickActions = styled.div`
  display: flex;
  gap: ${spacing[4]};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[6]};
  border: none;
  border-radius: ${borderRadius.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &.primary {
    background: ${colors.everlyCherry};
    color: ${colors.white};

    &:hover {
      background: #A0005A;
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  }

  &.secondary {
    background: ${colors.white};
    color: ${colors.everlyCherry};
    border: 1px solid ${colors.everlyCherry};

    &:hover {
      background: ${colors.everlyCherry};
      color: ${colors.white};
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing[6]};
  margin-bottom: 0;
`;

const StatCard = styled.div`
  background: ${colors.white};
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
    border-color: ${colors.everlyCherry};
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing[4]};
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.color}20;
  border-radius: ${borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const StatTrend = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.positive ? colors.success : colors.error};
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[2]};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing[4]};
`;

const StatDescription = styled.div`
  font-size: 12px;
  color: ${colors.textLight};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${spacing[8]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ActivitySection = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${spacing[6]} ${spacing[6]} ${spacing[4]} ${spacing[6]};
  border-bottom: 1px solid ${colors.border};
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const ActivityList = styled.div`
  padding: ${spacing[4]} 0;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};
  padding: ${spacing[4]} ${spacing[6]};
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
  }
`;

const ActivityIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.color}20;
  border-radius: ${borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[1]};
`;

const ActivityDescription = styled.div`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing[2]};
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: ${colors.textLight};
`;

const QuickActionsSection = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  gap: ${spacing[4]};
`;

const QuickActionItem = styled.button`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};
  padding: ${spacing[4]} ${spacing[6]};
  background: ${colors.lightGray};
  border: none;
  border-radius: ${borderRadius.base};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${colors.everlyCherry}10;
    transform: translateX(4px);
  }
`;

const QuickActionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${colors.everlyCherry};
  border-radius: ${borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  flex-shrink: 0;
`;

const QuickActionContent = styled.div`
  flex: 1;
`;

const QuickActionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[1]};
`;

const QuickActionDescription = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing[2]};
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: Users,
      color: colors.everlyCherry,
      value: '247',
      label: 'Total Clients',
      description: 'Active clients in your portfolio',
      trend: { value: '+12%', positive: true },
      filter: null // No filter - show all clients
    },
    {
      icon: Users,
      color: colors.everlyBlue,
      value: '45',
      label: 'New Leads',
      description: 'Clients awaiting assessment form sent to them',
      trend: { value: '+8%', positive: true },
      filter: 'new-lead'
    },
    {
      icon: FileText,
      color: colors.everlyOrange,
      value: '89',
      label: 'Pending Assessments',
      description: 'Clients awaiting assessment completion',
      trend: { value: '+5%', positive: true },
      filter: 'assessment-sent'
    },
    {
      icon: TrendingUp,
      color: colors.success,
      value: '156',
      label: 'Completed Reports',
      description: 'Reports generated this month',
      trend: { value: '+23%', positive: true },
      filter: ['report-ready', 'follow-up-needed', 'application-started']
    },
    {
      icon: Clock,
      color: colors.info,
      value: '34',
      label: 'Follow-ups Due',
      description: 'Clients requiring follow-up contact',
      trend: { value: '-8%', positive: true },
      filter: 'follow-up-needed'
    }
  ];

  const recentActivity = [
    {
      icon: Send,
      color: colors.everlyCherry,
      title: 'Assessment sent to Sarah Johnson',
      description: 'Life insurance needs assessment form delivered',
      time: '2 hours ago'
    },
    {
      icon: FileText,
      color: colors.everlyOrange,
      title: 'Report generated for Mike Chen',
      description: 'Comprehensive life insurance analysis completed',
      time: '4 hours ago'
    },
    {
      icon: Eye,
      color: colors.info,
      title: 'Client viewed report',
      description: 'John Smith reviewed his protection score report',
      time: '6 hours ago'
    },
    {
      icon: Users,
      color: colors.success,
      title: 'New client added',
      description: 'Emily Davis added to your client portfolio',
      time: '1 day ago'
    }
  ];

  const quickActions = [
    {
      icon: Eye,
      title: 'View Reports',
      description: 'Review generated client reports',
      action: () => {
        const filterParams = new URLSearchParams();
        filterParams.set('status', 'report-ready,follow-up-needed,application-started');
        navigate(`/clients?${filterParams.toString()}`);
      }
    },
    {
      icon: FileEdit,
      title: 'Review Sales Scripts',
      description: 'Review and update sales conversation scripts',
      action: () => {
        // No destination yet - placeholder
        console.log('Review Sales Scripts clicked');
      }
    },
    {
      icon: Plus,
      title: 'Add Client',
      description: 'Add new client to your portfolio',
      action: () => {
        navigate('/clients');
      }
    },
    {
      icon: MessageSquare,
      title: 'Create Communication Templates',
      description: 'Create email and message templates for clients',
      action: () => {
        navigate('/communication');
      }
    }
  ];

  return (
    <MainLayout currentPage="dashboard">
      <DashboardContainer>
        <PageHeader>
          <div>
            <PageTitle>Dashboard</PageTitle>
            <PageSubtitle>Welcome back! Here's what's happening with your clients.</PageSubtitle>
          </div>
        </PageHeader>

        <StatsGrid>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const handleCardClick = () => {
              if (stat.filter) {
                // Navigate to clients page with filters applied
                const filterParams = new URLSearchParams();
                if (Array.isArray(stat.filter)) {
                  filterParams.set('status', stat.filter.join(','));
                } else {
                  filterParams.set('status', stat.filter);
                }
                navigate(`/clients?${filterParams.toString()}`);
              } else {
                // Navigate to clients page without filters
                navigate('/clients');
              }
            };

            return (
              <StatCard key={index} onClick={handleCardClick}>
                <StatHeader>
                  <StatIcon color={stat.color}>
                    <Icon size={24} />
                  </StatIcon>
                  <StatTrend positive={stat.trend.positive}>
                    {stat.trend.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {stat.trend.value}
                  </StatTrend>
                </StatHeader>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
                <StatDescription>{stat.description}</StatDescription>
              </StatCard>
            );
          })}
        </StatsGrid>

        <ContentGrid>
          <ActivitySection>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
              <SectionSubtitle>Latest updates from your client portfolio</SectionSubtitle>
            </SectionHeader>
            <ActivityList>
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <ActivityItem key={index}>
                    <ActivityIcon color={activity.color}>
                      <Icon size={20} />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityDescription>{activity.description}</ActivityDescription>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                );
              })}
            </ActivityList>
          </ActivitySection>

          <QuickActionsSection>
            <SectionHeader>
              <SectionTitle>Quick Actions</SectionTitle>
              <SectionSubtitle>Common tasks and shortcuts</SectionSubtitle>
            </SectionHeader>
            <div style={{ padding: `${spacing[4]} 0` }}>
              <QuickActionsGrid>
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <QuickActionItem key={index} onClick={action.action}>
                      <QuickActionIcon>
                        <Icon size={20} />
                      </QuickActionIcon>
                      <QuickActionContent>
                        <QuickActionTitle>{action.title}</QuickActionTitle>
                        <QuickActionDescription>{action.description}</QuickActionDescription>
                      </QuickActionContent>
                    </QuickActionItem>
                  );
                })}
              </QuickActionsGrid>
            </div>
          </QuickActionsSection>
        </ContentGrid>
      </DashboardContainer>
    </MainLayout>
  );
};

export default Dashboard;
