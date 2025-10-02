import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  CheckCircle, 
  Edit, 
  Eye,
  Calendar,
  FileText,
  Send,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const ReportContainer = styled.div`
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
  align-items: center;
  margin-bottom: ${spacing[6]};
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
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

const HeaderActions = styled.div`
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

const StatusBanner = styled.div<{ status: string }>`
  padding: ${spacing[4]} ${spacing[6]};
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing[6]};
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  font-weight: 500;

  &.generated {
    background: ${colors.info}10;
    border: 1px solid ${colors.info}30;
    color: ${colors.info};
  }

  &.reviewed {
    background: ${colors.warning}10;
    border: 1px solid ${colors.warning}30;
    color: ${colors.warning};
  }

  &.approved {
    background: ${colors.success}10;
    border: 1px solid ${colors.success}30;
    color: ${colors.success};
  }
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${spacing[8]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

const Sidebar = styled.div`
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

const ExecutiveSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[3]} 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const SummaryValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const ChartContainer = styled.div`
  height: 300px;
  margin: ${spacing[4]} 0;
`;

const RecommendationCard = styled.div`
  background: ${colors.lightGray};
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
  border-left: 4px solid ${colors.everlyCherry};
`;

const RecommendationTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[3]} 0;
`;

const RecommendationText = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 ${spacing[4]} 0;
`;

const RecommendationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing[4]};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: ${colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const ApprovalSection = styled.div`
  background: ${colors.lightGray};
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.border};
`;

const ApprovalTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[4]} 0;
`;

const ApprovalActions = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[4]};
`;

const ApprovalButton = styled.button`
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

  &.approve {
    background: ${colors.success};
    color: ${colors.white};

    &:hover {
      background: #059669;
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  }

  &.edit {
    background: ${colors.warning};
    color: ${colors.white};

    &:hover {
      background: #D97706;
      transform: translateY(-1px);
      box-shadow: ${shadows.md};
    }
  }
`;

const NotesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const NotesTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  font-family: ${typography.fontPrimary};
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }

  &::placeholder {
    color: ${colors.textLight};
  }
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[2]} 0;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textPrimary};
`;

const ReportViewer: React.FC = () => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const [reportStatus, setReportStatus] = useState('generated');
  const [agentNotes, setAgentNotes] = useState('');

  // Mock data for charts
  const protectionScoreData = [
    { name: 'Current Coverage', value: 200000, color: colors.error },
    { name: 'Coverage Gap', value: 500000, color: colors.warning },
    { name: 'Recommended Coverage', value: 700000, color: colors.success }
  ];

  const timelineData = [
    { year: '2024', coverage: 200000, need: 700000 },
    { year: '2029', coverage: 200000, need: 750000 },
    { year: '2034', coverage: 200000, need: 800000 },
    { year: '2039', coverage: 200000, need: 850000 },
    { year: '2044', coverage: 0, need: 900000 }
  ];

  const portfolioData = [
    { category: 'Life Insurance', value: 200000, percentage: 20 },
    { category: 'Investments', value: 300000, percentage: 30 },
    { category: 'Savings', value: 200000, percentage: 20 },
    { category: 'Real Estate', value: 300000, percentage: 30 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = () => {
    setReportStatus('approved');
  };

  const handleEdit = () => {
    // Navigate to assessment form to edit the report
    navigate(`/assessment/${clientId || '1'}`);
  };

  return (
    <MainLayout currentPage="reports">
      <ReportContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Client Detail
        </BackButton>

        <PageHeader>
          <HeaderInfo>
            <PageTitle>Life Insurance Report</PageTitle>
            <PageSubtitle>Comprehensive analysis and recommendation for John Smith</PageSubtitle>
          </HeaderInfo>
          <HeaderActions>
            <ActionButton className="tertiary" onClick={handleEdit}>
              <Edit size={16} />
              Edit Report
            </ActionButton>
            <ActionButton className="secondary">
              <Share size={16} />
              Share
            </ActionButton>
            <ActionButton className="primary">
              <Download size={16} />
              Download PDF
            </ActionButton>
          </HeaderActions>
        </PageHeader>

        <StatusBanner status={reportStatus}>
          {reportStatus === 'generated' && (
            <>
              <AlertCircle size={20} />
              Report generated and ready for review
            </>
          )}
          {reportStatus === 'approved' && (
            <>
              <CheckCircle size={20} />
              Report approved and ready for client outreach
            </>
          )}
        </StatusBanner>

        <ReportGrid>
          <MainContent>
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
                <CardSubtitle>Key findings and recommendations</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ExecutiveSummary>
                  <SummaryItem>
                    <SummaryLabel>Current Protection Score</SummaryLabel>
                    <SummaryValue>45%</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Current Coverage</SummaryLabel>
                    <SummaryValue>{formatCurrency(200000)}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Coverage Gap</SummaryLabel>
                    <SummaryValue>{formatCurrency(500000)}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Recommended Coverage</SummaryLabel>
                    <SummaryValue>{formatCurrency(700000)}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Duration Needed</SummaryLabel>
                    <SummaryValue>20 years</SummaryValue>
                  </SummaryItem>
                </ExecutiveSummary>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protection Score Analysis</CardTitle>
                <CardSubtitle>Current coverage vs. recommended coverage</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={protectionScoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {protectionScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Timeline</CardTitle>
                <CardSubtitle>How coverage needs change over time</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="coverage" stroke={colors.error} strokeWidth={3} />
                      <Line type="monotone" dataKey="need" stroke={colors.everlyCherry} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Integration</CardTitle>
                <CardSubtitle>How life insurance fits into overall financial portfolio</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="value" fill={colors.everlyCherry} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
                <CardSubtitle>Personalized life insurance solution</CardSubtitle>
              </CardHeader>
              <CardContent>
                <RecommendationCard>
                  <RecommendationTitle>Term Life Insurance - 20 Years</RecommendationTitle>
                  <RecommendationText>
                    Based on your age, family situation, and financial goals, a 20-year term life insurance 
                    policy with $500,000 coverage would provide adequate protection for your family's needs. 
                    This recommendation takes into account your current income, expenses, and future financial obligations.
                  </RecommendationText>
                  <RecommendationDetails>
                    <DetailItem>
                      <DetailLabel>Product Type</DetailLabel>
                      <DetailValue>Term Life Insurance</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Coverage Amount</DetailLabel>
                      <DetailValue>{formatCurrency(500000)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Term Length</DetailLabel>
                      <DetailValue>20 years</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Estimated Premium</DetailLabel>
                      <DetailValue>$45/month</DetailValue>
                    </DetailItem>
                  </RecommendationDetails>
                </RecommendationCard>
              </CardContent>
            </Card>
          </MainContent>

          <Sidebar>
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardSubtitle>Assessment details</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ClientInfo>
                  <InfoItem>
                    <InfoLabel>Name</InfoLabel>
                    <InfoValue>John Smith</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Age</InfoLabel>
                    <InfoValue>34 years</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Annual Income</InfoLabel>
                    <InfoValue>{formatCurrency(75000)}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Dependents</InfoLabel>
                    <InfoValue>2 children</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Assessment Date</InfoLabel>
                    <InfoValue>Dec 15, 2024</InfoValue>
                  </InfoItem>
                </ClientInfo>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Workflow</CardTitle>
                <CardSubtitle>Review and approve this report</CardSubtitle>
              </CardHeader>
              <CardContent>
                <ApprovalSection>
                  <ApprovalTitle>Agent Review</ApprovalTitle>
                  <ApprovalActions>
                    <ApprovalButton className="approve" onClick={handleApprove}>
                      <CheckCircle size={16} />
                      Approve
                    </ApprovalButton>
                    <ApprovalButton className="edit" onClick={handleEdit}>
                      <Edit size={16} />
                      Edit
                    </ApprovalButton>
                  </ApprovalActions>
                  <NotesSection>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: colors.textPrimary }}>
                      Agent Notes
                    </label>
                    <NotesTextArea
                      value={agentNotes}
                      onChange={(e) => setAgentNotes(e.target.value)}
                      placeholder="Add notes about this report..."
                    />
                  </NotesSection>
                </ApprovalSection>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardSubtitle>Actions after approval</CardSubtitle>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                  <ActionButton className="secondary">
                    <Send size={16} />
                    Send to Client
                  </ActionButton>
                  <ActionButton className="tertiary">
                    <Calendar size={16} />
                    Schedule Call
                  </ActionButton>
                  <ActionButton 
                    className="tertiary"
                    onClick={() => {
                      // In a real application, this would redirect to the sister website
                      // with pre-populated data from the report
                      window.open('https://everlylife.com/apply', '_blank');
                    }}
                  >
                    <FileText size={16} />
                    Continue Application
                  </ActionButton>
                </div>
              </CardContent>
            </Card>
          </Sidebar>
        </ReportGrid>
      </ReportContainer>
    </MainLayout>
  );
};

export default ReportViewer;
