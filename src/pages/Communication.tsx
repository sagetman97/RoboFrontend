import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Send, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Copy,
  ChevronDown
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const CommunicationContainer = styled.div`
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
  background: ${colors.everlyCherry};
  color: ${colors.white};

  &:hover {
    background: #A0005A;
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

const TabsContainer = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
  margin-top: ${spacing[4]};
  margin-bottom: ${spacing[4]};
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.border};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${spacing[4]} ${spacing[6]};
  background: ${props => props.active ? colors.lightGray : 'transparent'};
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.active ? colors.everlyCherry : colors.textSecondary};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};

  &:first-child {
    border-top-left-radius: ${borderRadius.lg};
  }

  &:last-child {
    border-top-right-radius: ${borderRadius.lg};
  }

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.everlyCherry};
    border-color: ${colors.everlyCherry};
  }
`;

const TabContent = styled.div`
  padding: ${spacing[6]};
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing[6]};
  margin-bottom: ${spacing[6]};
`;

const TemplateCard = styled.div`
  background: ${colors.lightGray};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  border: 1px solid ${colors.border};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing[4]};
`;

const TemplateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: ${spacing[2]};
`;

const TemplateAction = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${borderRadius.base};
  background: ${colors.white};
  color: ${colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.everlyCherry};
    color: ${colors.white};
  }
`;

const TemplateContent = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${spacing[4]};
`;

const TemplateMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.textLight};
`;

const TemplateSelect = styled.select`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  background: ${colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const EmailForm = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  border: 1px solid ${colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[4]};
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const Communication: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  const emailTemplates = [
    {
      id: '1',
      title: 'Assessment Invitation',
      subject: 'Life Insurance Needs Assessment - Next Steps',
      content: 'Dear [Client Name],\n\nI hope this email finds you well. I wanted to reach out regarding your life insurance needs assessment.\n\nBased on our initial conversation, I believe you would benefit from a comprehensive analysis of your current coverage and future needs. I\'ve prepared a personalized assessment form that will help us determine the right coverage amount and type for your situation.\n\nPlease take a few minutes to complete the assessment at your convenience. Once you\'ve finished, I\'ll review your responses and prepare a detailed report with my recommendations.\n\nIf you have any questions or would prefer to discuss this over the phone, please don\'t hesitate to reach out.\n\nBest regards,\n[Your Name]',
      lastUsed: '2 days ago',
      usage: 15
    },
    {
      id: '2',
      title: 'Report Delivery',
      subject: 'Your Life Insurance Analysis Report is Ready',
      content: 'Dear [Client Name],\n\nI\'m pleased to share your personalized life insurance analysis report. After reviewing your assessment responses and current financial situation, I\'ve prepared comprehensive recommendations tailored specifically to your needs.\n\nThe report includes:\n• Current coverage analysis\n• Recommended coverage amount\n• Product recommendations\n• Premium estimates\n• Next steps\n\nI\'d love to schedule a brief call to walk through the findings and answer any questions you might have. Please let me know what time works best for you.\n\nBest regards,\n[Your Name]',
      lastUsed: '1 week ago',
      usage: 8
    },
    {
      id: '3',
      title: 'Follow-up Reminder',
      subject: 'Following up on your life insurance needs',
      content: 'Dear [Client Name],\n\nI wanted to follow up on our recent discussion about your life insurance needs. I know this is an important decision, and I\'m here to help guide you through the process.\n\nIf you\'ve had a chance to review the report I sent, I\'d love to hear your thoughts and address any questions or concerns you might have. If you haven\'t had a chance to look it over yet, no worries - I\'m happy to schedule a call to discuss it together.\n\nPlease let me know if there\'s anything I can clarify or if you\'d like to move forward with the application process.\n\nBest regards,\n[Your Name]',
      lastUsed: '3 days ago',
      usage: 12
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailSubject(template.subject);
      setEmailContent(template.content);
    }
  };

  // Handle URL parameters for assessment and follow-up-reminder templates
  useEffect(() => {
    const templateParam = searchParams.get('template');
    const clientIdParam = searchParams.get('clientId');
    
    if ((templateParam === 'assessment' || templateParam === 'follow-up-reminder') && clientIdParam) {
      // Switch to compose email tab
      setActiveTab('compose');
      
      if (templateParam === 'assessment') {
        // Select assessment template and add the link
        const assessmentTemplate = emailTemplates.find(t => t.id === '1');
        if (assessmentTemplate) {
          setSelectedTemplate('1');
          setEmailSubject(assessmentTemplate.subject);
          
          // Add the assessment link to the content
          const assessmentLink = `https://everly-agent-platform.com/assessment/${clientIdParam}`;
          const contentWithLink = assessmentTemplate.content + `\n\nAssessment Link: ${assessmentLink}`;
          setEmailContent(contentWithLink);
        }
      } else if (templateParam === 'follow-up-reminder') {
        // Select follow-up reminder template and add the link
        const followUpTemplate = emailTemplates.find(t => t.id === '3');
        if (followUpTemplate) {
          setSelectedTemplate('3');
          setEmailSubject(followUpTemplate.subject);
          
          // Add the assessment link to the content
          const assessmentLink = `https://everly-agent-platform.com/assessment/${clientIdParam}`;
          const contentWithLink = followUpTemplate.content + `\n\nAssessment Link: ${assessmentLink}`;
          setEmailContent(contentWithLink);
        }
      }
    }
  }, [searchParams]);

  return (
    <MainLayout currentPage="communication">
      <CommunicationContainer>
        <PageHeader>
          <div>
            <PageTitle>Communication</PageTitle>
            <PageSubtitle>Manage email templates and track client communications</PageSubtitle>
          </div>
          <ActionButton>
            <Plus size={16} />
            New Template
          </ActionButton>
        </PageHeader>

        <TabsContainer>
          <TabsHeader>
            <Tab active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
              <Mail size={16} />
              Email Templates
            </Tab>
            <Tab active={activeTab === 'compose'} onClick={() => setActiveTab('compose')}>
              <Send size={16} />
              Compose Email
            </Tab>
          </TabsHeader>

          <TabContent>
            {activeTab === 'templates' && (
              <>
                <TemplatesGrid>
                  {emailTemplates.map((template) => (
                    <TemplateCard key={template.id}>
                      <TemplateHeader>
                        <TemplateTitle>{template.title}</TemplateTitle>
                        <TemplateActions>
                          <TemplateAction title="Preview">
                            <Eye size={16} />
                          </TemplateAction>
                          <TemplateAction title="Edit">
                            <Edit size={16} />
                          </TemplateAction>
                          <TemplateAction title="Copy">
                            <Copy size={16} />
                          </TemplateAction>
                          <TemplateAction title="Delete">
                            <Trash2 size={16} />
                          </TemplateAction>
                        </TemplateActions>
                      </TemplateHeader>
                      <TemplateContent>
                        {template.content.substring(0, 100)}...
                      </TemplateContent>
                      <TemplateMeta>
                        <span>Used {template.usage} times</span>
                        <span>Last used: {template.lastUsed}</span>
                      </TemplateMeta>
                    </TemplateCard>
                  ))}
                </TemplatesGrid>
              </>
            )}

            {activeTab === 'compose' && (
              <EmailForm>
                <FormGroup>
                  <Label>Email Template</Label>
                  <TemplateSelect
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                  >
                    <option value="">Select a template (optional)</option>
                    {emailTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.title}
                      </option>
                    ))}
                  </TemplateSelect>
                </FormGroup>
                <FormGroup>
                  <Label>To</Label>
                  <Input type="email" placeholder="client@email.com" />
                </FormGroup>
                <FormGroup>
                  <Label>Subject</Label>
                  <Input 
                    type="text" 
                    placeholder="Life Insurance Assessment"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Message</Label>
                  <TextArea 
                    placeholder="Type your message here..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                </FormGroup>
                <ActionButton>
                  <Send size={16} />
                  Send Email
                </ActionButton>
              </EmailForm>
            )}
          </TabContent>
        </TabsContainer>
      </CommunicationContainer>
    </MainLayout>
  );
};

export default Communication;
