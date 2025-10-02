import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  DollarSign,
  Target,
  MessageSquare,
  Plus,
  Edit,
  MoreVertical,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const ClientDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  background: none;
  border: none;
  color: ${colors.everlyCherry};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: ${spacing[4]};
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.everlyOrange};
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing[6]};
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[6]};
`;

const ClientAvatar = styled.div<{ score: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-weight: 600;
  font-size: 24px;
  background: ${props => {
    if (props.score >= 80) return colors.success;
    if (props.score >= 60) return colors.warning;
    return colors.error;
  }};
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const ClientName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0;
`;

const ClientEmail = styled.div`
  font-size: 16px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing[1]};
`;

const ClientPhone = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const QuickActions = styled.div`
  display: flex;
  gap: ${spacing[3]};
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

  &.tertiary {
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
    border: 1px solid ${colors.border};

    &:hover {
      background: ${colors.border};
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[8]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const Card = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: ${spacing[6]} ${spacing[6]} ${spacing[4]} ${spacing[6]};
  border-bottom: 1px solid ${colors.border};
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0;
`;

const CardContent = styled.div`
  padding: ${spacing[6]};
`;

const ProtectionScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${spacing[4]};
`;

const ScoreDisplay = styled.div<{ score: number }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 32px;
  font-weight: 700;
  background: ${props => {
    if (props.score >= 80) return colors.success;
    if (props.score >= 60) return colors.warning;
    return colors.error;
  }};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 3px solid ${props => {
      if (props.score >= 80) return colors.success;
      if (props.score >= 60) return colors.warning;
      return colors.error;
    }}20;
  }
`;

const ScoreLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const ScoreDescription = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  text-align: center;
`;

const CoverageGapSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const GapItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[3]} 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const GapLabel = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const GapValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const RecommendationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const RecommendationCard = styled.div`
  background: ${colors.lightGray};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.base};
  border-left: 4px solid ${colors.everlyCherry};
`;

const RecommendationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[2]};
`;

const RecommendationText = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};
  padding: ${spacing[4]};
  background: ${colors.lightGray};
  border-radius: ${borderRadius.base};
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.border};
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

const CommunicationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
`;

const CommunicationItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]};
  background: ${colors.lightGray};
  border-radius: ${borderRadius.base};
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.border};
  }
`;

const CommunicationIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  background: ${props => props.color}20;
  border-radius: ${borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  flex-shrink: 0;
`;

const CommunicationContent = styled.div`
  flex: 1;
`;

const CommunicationTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[1]};
`;

const CommunicationTime = styled.div`
  font-size: 12px;
  color: ${colors.textLight};
`;

const CommunicationStatus = styled.div<{ status: string }>`
  font-size: 12px;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.full};
  font-weight: 500;

  &.sent {
    background: ${colors.info}20;
    color: ${colors.info};
  }

  &.delivered {
    background: ${colors.success}20;
    color: ${colors.success};
  }

  &.opened {
    background: ${colors.warning}20;
    color: ${colors.warning};
  }
`;

const NotesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const NoteItem = styled.div`
  padding: ${spacing[4]};
  background: ${colors.lightGray};
  border-radius: ${borderRadius.base};
  border-left: 4px solid ${colors.everlyOrange};
`;

const NoteText = styled.div`
  font-size: 14px;
  color: ${colors.textPrimary};
  line-height: 1.5;
  margin-bottom: ${spacing[2]};
`;

const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.textLight};
`;

const AddNoteButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.everlyCherry}10;
  border: 1px dashed ${colors.everlyCherry};
  border-radius: ${borderRadius.base};
  color: ${colors.everlyCherry};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.everlyCherry}20;
  }
`;

// Send Assessment Popup Components
const AssessmentPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AssessmentPopupContent = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.xl};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const AssessmentPopupHeader = styled.div`
  padding: ${spacing[6]} ${spacing[6]} ${spacing[4]};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssessmentPopupTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: ${spacing[2]};
  border-radius: 6px;
  color: ${colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.textPrimary};
  }
`;

const AssessmentPopupBody = styled.div`
  padding: ${spacing[2]} ${spacing[6]} ${spacing[6]} ${spacing[6]};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const AssessmentLinkLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[3]};
  display: block;
`;

const AssessmentLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[4]} ${spacing[6]};
  background: ${colors.lightGray};
  border-radius: ${borderRadius.base};
  border: 1px solid ${colors.border};
  margin-bottom: ${spacing[6]};
  width: 100%;
  box-sizing: border-box;
`;

const AssessmentLink = styled.input`
  flex: 1;
  background: none;
  border: none;
  font-size: 14px;
  color: ${colors.textPrimary};
  font-family: monospace;
  
  &:focus {
    outline: none;
  }
`;

const CopyButton = styled.button`
  background: ${colors.everlyOrange};
  color: ${colors.white};
  border: none;
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${borderRadius.base};
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${spacing[1]};

  &:hover {
    background: ${colors.everlyOrange}dd;
  }
`;

const AssessmentDescription = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const AssessmentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  width: 100%;
`;

const AssessmentActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.base};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${colors.white};
  color: ${colors.textPrimary};
  width: 100%;
  box-sizing: border-box;

  ${props => props.variant === 'primary' ? `
    border: 2px solid ${colors.everlyOrange};

    &:hover {
      background: ${colors.everlyOrange};
      color: ${colors.white};
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  ` : `
    border: 2px solid ${colors.everlyCherry};

    &:hover {
      background: ${colors.everlyCherry};
      color: ${colors.white};
    }
  `}
`;

const ClientDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [assessmentPopupOpen, setAssessmentPopupOpen] = useState(false);

  // Mock data
  const client = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    protectionScore: 45,
    coverageGap: 500000,
    status: 'new',
    lastContact: '2 days ago',
    address: '123 Main St, Anytown, ST 12345',
    occupation: 'Software Engineer',
    age: 34,
    familyStatus: 'Married with 2 children'
  };

  const assessmentHistory = [
    {
      id: '1',
      type: 'assessment',
      title: 'Assessment sent',
      description: 'Life insurance needs assessment form delivered via email',
      time: '2 days ago',
      icon: Send,
      color: colors.everlyCherry
    },
    {
      id: '2',
      type: 'report',
      title: 'Report generated',
      description: 'Comprehensive life insurance analysis completed',
      time: '1 day ago',
      icon: FileText,
      color: colors.everlyOrange
    },
    {
      id: '3',
      type: 'call',
      title: 'Phone call scheduled',
      description: 'Follow-up call scheduled for tomorrow at 2:00 PM',
      time: '3 hours ago',
      icon: Calendar,
      color: colors.info
    }
  ];

  const communicationHistory = [
    {
      id: '1',
      type: 'email',
      title: 'Assessment form sent',
      time: '2 days ago',
      status: 'delivered',
      icon: Mail,
      color: colors.everlyCherry
    },
    {
      id: '2',
      type: 'call',
      title: 'Initial consultation call',
      time: '1 week ago',
      status: 'completed',
      icon: Phone,
      color: colors.success
    },
    {
      id: '3',
      type: 'email',
      title: 'Welcome email',
      time: '1 week ago',
      status: 'opened',
      icon: Mail,
      color: colors.info
    }
  ];

  const notes = [
    {
      id: '1',
      text: 'Client expressed interest in term life insurance. Has two young children and wants to ensure their education is covered.',
      author: 'John Agent',
      time: '2 days ago'
    },
    {
      id: '2',
      text: 'Follow up on assessment form completion. Client mentioned they might need help filling it out.',
      author: 'John Agent',
      time: '1 day ago'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Assessment popup handlers
  const handleSendAssessmentClick = () => {
    setAssessmentPopupOpen(true);
  };

  const handleCloseAssessmentPopup = () => {
    setAssessmentPopupOpen(false);
  };

  const handleCopyLink = () => {
    const assessmentLink = `https://everly-agent-platform.com/assessment/${client.id}`;
    navigator.clipboard.writeText(assessmentLink);
    // You could add a toast notification here
  };

  const handleEmailAssessment = () => {
    setAssessmentPopupOpen(false);
    // Navigate to communication page with assessment template
    navigate('/communication?template=assessment&clientId=' + client.id);
  };

  const handleCompleteAssessment = () => {
    setAssessmentPopupOpen(false);
    // Navigate to assessment form
    navigate(`/assessment/${client.id}`);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assessmentPopupOpen && event.target === event.currentTarget) {
        setAssessmentPopupOpen(false);
      }
    };

    if (assessmentPopupOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [assessmentPopupOpen]);

  return (
    <MainLayout currentPage="clients">
      <ClientDetailContainer>
        <BackButton onClick={() => navigate('/clients')}>
          <ArrowLeft size={16} />
          Back to Clients
        </BackButton>

        <PageHeader>
          <ClientInfo>
            <ClientAvatar score={client.protectionScore}>
              {client.name.split(' ').map(n => n[0]).join('')}
            </ClientAvatar>
            <ClientDetails>
              <ClientName>{client.name}</ClientName>
              <ClientEmail>{client.email}</ClientEmail>
              <ClientPhone>{client.phone}</ClientPhone>
            </ClientDetails>
          </ClientInfo>
          <QuickActions>
            <ActionButton className="tertiary">
              <Edit size={16} />
              Edit
            </ActionButton>
            <ActionButton className="secondary">
              <Calendar size={16} />
              Schedule Call
            </ActionButton>
            <ActionButton 
              className="primary"
              onClick={handleSendAssessmentClick}
            >
              <Send size={16} />
              Send Assessment
            </ActionButton>
          </QuickActions>
        </PageHeader>

        <ContentGrid>
          <LeftColumn>
            <Card>
              <CardHeader>
                <CardTitle>Protection Score</CardTitle>
                <CardSubtitle>Current life insurance coverage analysis</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ProtectionScoreSection>
                  <ScoreDisplay score={client.protectionScore}>
                    {client.protectionScore}%
                  </ScoreDisplay>
                  <ScoreLabel>Protection Score</ScoreLabel>
                  <ScoreDescription>
                    {client.protectionScore < 60 
                      ? 'High need for additional coverage'
                      : client.protectionScore < 80 
                      ? 'Moderate need for additional coverage'
                      : 'Adequate coverage level'
                    }
                  </ScoreDescription>
                </ProtectionScoreSection>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Analysis</CardTitle>
                <CardSubtitle>Detailed coverage gap breakdown</CardSubtitle>
              </CardHeader>
              <CardContent>
                <CoverageGapSection>
                  <GapItem>
                    <GapLabel>Current Coverage</GapLabel>
                    <GapValue>{formatCurrency(200000)}</GapValue>
                  </GapItem>
                  <GapItem>
                    <GapLabel>Recommended Coverage</GapLabel>
                    <GapValue>{formatCurrency(700000)}</GapValue>
                  </GapItem>
                  <GapItem>
                    <GapLabel>Coverage Gap</GapLabel>
                    <GapValue>{formatCurrency(client.coverageGap)}</GapValue>
                  </GapItem>
                  <GapItem>
                    <GapLabel>Duration Needed</GapLabel>
                    <GapValue>20 years</GapValue>
                  </GapItem>
                </CoverageGapSection>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
                <CardSubtitle>Suggested life insurance solution</CardSubtitle>
              </CardHeader>
              <CardContent>
                <RecommendationSection>
                  <RecommendationCard>
                    <RecommendationTitle>Term Life Insurance</RecommendationTitle>
                    <RecommendationText>
                      Based on the client's age, family situation, and financial goals, 
                      a 20-year term life insurance policy with $500,000 coverage would 
                      provide adequate protection for their family's needs.
                    </RecommendationText>
                  </RecommendationCard>
                </RecommendationSection>
              </CardContent>
            </Card>
          </LeftColumn>

          <RightColumn>
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardSubtitle>Timeline of client interactions</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ActivityList>
                  {assessmentHistory.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <ActivityItem key={activity.id}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Log</CardTitle>
                <CardSubtitle>Email and call history</CardSubtitle>
              </CardHeader>
              <CardContent>
                <CommunicationList>
                  {communicationHistory.map((comm) => {
                    const Icon = comm.icon;
                    return (
                      <CommunicationItem key={comm.id}>
                        <CommunicationIcon color={comm.color}>
                          <Icon size={16} />
                        </CommunicationIcon>
                        <CommunicationContent>
                          <CommunicationTitle>{comm.title}</CommunicationTitle>
                          <CommunicationTime>{comm.time}</CommunicationTime>
                        </CommunicationContent>
                        <CommunicationStatus status={comm.status}>
                          {comm.status}
                        </CommunicationStatus>
                      </CommunicationItem>
                    );
                  })}
                </CommunicationList>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardSubtitle>Agent notes and observations</CardSubtitle>
              </CardHeader>
              <CardContent>
                <NotesSection>
                  {notes.map((note) => (
                    <NoteItem key={note.id}>
                      <NoteText>{note.text}</NoteText>
                      <NoteMeta>
                        <span>{note.author}</span>
                        <span>{note.time}</span>
                      </NoteMeta>
                    </NoteItem>
                  ))}
                  <AddNoteButton>
                    <Plus size={16} />
                    Add Note
                  </AddNoteButton>
                </NotesSection>
              </CardContent>
            </Card>
          </RightColumn>
        </ContentGrid>
      </ClientDetailContainer>

      {/* Send Assessment Popup */}
      {assessmentPopupOpen && (
        <AssessmentPopup onClick={handleCloseAssessmentPopup}>
          <AssessmentPopupContent onClick={(e) => e.stopPropagation()}>
            <AssessmentPopupHeader>
              <AssessmentPopupTitle>Send Assessment</AssessmentPopupTitle>
              <CloseButton onClick={handleCloseAssessmentPopup}>
                <X size={20} />
              </CloseButton>
            </AssessmentPopupHeader>
            
            <AssessmentPopupBody>
              <div>
                <AssessmentLinkLabel>Shareable Assessment Link</AssessmentLinkLabel>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', paddingLeft: '16px' }}>
                  <input 
                    type="text" 
                    value={`https://everly-agent-platform.com/assessment/${client.id}`}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '12px 0 12px 0',
                      background: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <button 
                    onClick={handleCopyLink}
                    style={{
                      background: '#FF6E1E',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
              </div>

              <AssessmentDescription>
                <strong>Email Assessment:</strong> Send this link to {client.name} so they can complete their life insurance needs assessment themselves. This allows them to fill out the form at their own pace and convenience.
                <br /><br />
                <strong>Complete Assessment:</strong> Fill out the assessment form yourself on behalf of {client.name} if you feel comfortable and confident with their information. This is helpful when clients prefer guidance or have complex situations.
              </AssessmentDescription>

              <AssessmentActions>
                <AssessmentActionButton variant="secondary" onClick={handleEmailAssessment}>
                  <Mail size={18} />
                  Email Assessment
                </AssessmentActionButton>
                <AssessmentActionButton variant="primary" onClick={handleCompleteAssessment}>
                  <ExternalLink size={18} />
                  Complete Assessment
                </AssessmentActionButton>
              </AssessmentActions>
            </AssessmentPopupBody>
          </AssessmentPopupContent>
        </AssessmentPopup>
      )}
    </MainLayout>
  );
};

export default ClientDetail;
