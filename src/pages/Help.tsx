import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Play
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { colors, spacing, borderRadius, shadows, typography } from '../styles/design-system';

const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
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

const SearchContainer = styled.div`
  position: relative;
  margin-top: ${spacing[4]};
  margin-bottom: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing[4]} ${spacing[6]} ${spacing[4]} ${spacing[12]};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${spacing[8]};
  margin-top: ${spacing[4]};
  margin-bottom: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const HelpSidebar = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.base};
  border: 1px solid ${colors.border};
  overflow: hidden;
`;

const SidebarSection = styled.div`
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.div`
  padding: ${spacing[4]} ${spacing[6]};
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  background: ${colors.lightGray};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SidebarItem = styled.button<{ active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[6]};
  background: ${props => props.active ? colors.lightGray : 'transparent'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.active ? colors.everlyCherry : colors.textPrimary};

  &:hover {
    background: ${colors.lightGray};
    color: ${colors.everlyCherry};
  }
`;

const HelpContent = styled.div`
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
  font-size: 24px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
`;

const ContentBody = styled.div`
  padding: ${spacing[6]};
  
  p {
    font-size: 16px;
    line-height: 1.6;
    color: ${colors.textSecondary};
    margin: 0 0 ${spacing[4]} 0;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${colors.textPrimary};
    margin: ${spacing[6]} 0 ${spacing[3]} 0;
    font-family: ${typography.fontSerif};
  }
  
  ul, ol {
    margin: 0 0 ${spacing[4]} 0;
    padding-left: ${spacing[6]};
  }
  
  li {
    font-size: 16px;
    line-height: 1.6;
    color: ${colors.textSecondary};
    margin-bottom: ${spacing[2]};
  }
  
  strong {
    font-weight: 600;
    color: ${colors.textPrimary};
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const FAQItem = styled.div`
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
`;

const FAQQuestion = styled.button<{ open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[4]} ${spacing[6]};
  background: ${colors.lightGray};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.textPrimary};
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.border};
  }
`;

const FAQAnswer = styled.div<{ open: boolean }>`
  padding: ${props => props.open ? `${spacing[4]} ${spacing[6]}` : '0'};
  max-height: ${props => props.open ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: ${colors.white};
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${spacing[6]};
`;

const ResourceCard = styled.div`
  background: ${colors.lightGray};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
  border: 1px solid ${colors.border};
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 200px;

  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
  }
`;

const ResourceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.lg};
  background: ${colors.everlyOrange};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[4]};
  flex-shrink: 0;
`;

const ResourceTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing[2]} 0;
  line-height: 1.4;
  flex-shrink: 0;
`;

const ResourceDescription = styled.p`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin: 0 0 ${spacing[4]} 0;
  line-height: 1.5;
  flex: 1;
`;

const ResourceAction = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${colors.white};
  color: ${colors.textPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.base};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}15;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing[6]};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[4]};
  padding: ${spacing[5]};
  background: ${colors.white};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.border};
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 100px;

  &:hover {
    border-color: ${colors.everlyCherry};
    box-shadow: 0 0 0 3px ${colors.everlyCherry}15;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.everlyOrange};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ContactTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing[2]};
  line-height: 1.4;
`;

const ContactDescription = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

const Help: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqItems = [
    {
      id: '1',
      question: 'How do I send an assessment to a client?',
      answer: 'Go to the Clients page, find your client, and click the "Send Assessment" button. This will email them a form to complete their life insurance needs analysis.'
    },
    {
      id: '2',
      question: 'What is a protection score?',
      answer: 'A protection score is a percentage that indicates how well-covered a client is for life insurance needs. Lower scores indicate greater coverage gaps.'
    },
    {
      id: '3',
      question: 'How do I approve a report?',
      answer: 'Navigate to the report viewer, review all details, make any necessary adjustments, and click "Approve Report" when satisfied with the recommendations.'
    },
    {
      id: '4',
      question: 'Can I edit assessment responses?',
      answer: 'Yes, you can edit both basic form responses and advanced variables in the assessment form before generating the final report.'
    }
  ];

  const resources = [
    {
      title: 'User Guide',
      description: 'Complete guide to using the Everly Agent Platform',
      icon: Book,
      action: 'Download PDF'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for key features',
      icon: Video,
      action: 'Watch Videos'
    },
    {
      title: 'Product Knowledge',
      description: 'Learn about Everly life insurance products',
      icon: Book,
      action: 'View Guide'
    },
    {
      title: 'Best Practices',
      description: 'Tips for successful client conversations',
      icon: Book,
      action: 'Read More'
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with support team',
      icon: MessageCircle
    },
    {
      title: 'Phone Support',
      description: 'Call 1-800-EVERLY',
      icon: Phone
    },
    {
      title: 'Email Support',
      description: 'support@everly.com',
      icon: Mail
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <>
            <ContentTitle>Getting Started</ContentTitle>
            <ContentBody>
              <p>Welcome to the Everly Agent Platform! This comprehensive guide will help you navigate the platform and maximize your efficiency in managing clients and generating life insurance recommendations.</p>
              
              <h3>Platform Overview</h3>
              <p>The Everly Agent Platform provides you with powerful tools to identify life insurance needs, generate personalized recommendations, and streamline your client communication process.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li><strong>Client Management:</strong> View all your clients with pre-calculated protection scores and coverage gaps</li>
                <li><strong>Assessment Forms:</strong> Send personalized suitability questionnaires to clients or complete them on their behalf</li>
                <li><strong>Report Generation:</strong> Generate comprehensive life insurance analysis reports with product recommendations</li>
                <li><strong>Communication Tools:</strong> Email templates, call management, and client outreach tools</li>
                <li><strong>Evie Chatbot:</strong> AI assistant available on every page to answer questions and provide guidance</li>
              </ul>

              <h3>Quick Start Guide</h3>
              <ol>
                <li><strong>Review Your Dashboard:</strong> Start by examining your client list and identifying those with protection scores below 80%</li>
                <li><strong>Send Assessments:</strong> Use the "Send Assessment" feature to request additional information from clients</li>
                <li><strong>Review Reports:</strong> Once assessments are complete, review the generated life insurance reports</li>
                <li><strong>Approve & Communicate:</strong> Approve reports and use communication tools to discuss recommendations with clients</li>
                <li><strong>Track Progress:</strong> Monitor client status and follow up as needed through the CRM system</li>
              </ol>

              <h3>Need Help?</h3>
              <p>If you have questions or need assistance, use the Evie chatbot on any page or contact our support team through the Contact Support section.</p>
            </ContentBody>
          </>
        );

      case 'faq':
        return (
          <>
            <ContentTitle>Frequently Asked Questions</ContentTitle>
            <ContentBody>
              <FAQContainer>
                {faqItems.map((item) => (
                  <FAQItem key={item.id}>
                    <FAQQuestion 
                      open={openFAQ === item.id}
                      onClick={() => setOpenFAQ(openFAQ === item.id ? null : item.id)}
                    >
                      {item.question}
                      {openFAQ === item.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </FAQQuestion>
                    <FAQAnswer open={openFAQ === item.id}>
                      {item.answer}
                    </FAQAnswer>
                  </FAQItem>
                ))}
              </FAQContainer>
            </ContentBody>
          </>
        );

      case 'resources':
        return (
          <>
            <ContentTitle>Resources & Documentation</ContentTitle>
            <ContentBody>
              <ResourceGrid>
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <ResourceCard key={index}>
                      <ResourceIcon>
                        <Icon size={24} />
                      </ResourceIcon>
                      <ResourceTitle>{resource.title}</ResourceTitle>
                      <ResourceDescription>{resource.description}</ResourceDescription>
                      <ResourceAction>
                        {resource.action}
                        <ExternalLink size={12} />
                      </ResourceAction>
                    </ResourceCard>
                  );
                })}
              </ResourceGrid>
            </ContentBody>
          </>
        );

      case 'contact':
        return (
          <>
            <ContentTitle>Contact Support</ContentTitle>
            <ContentBody>
              <h3>Get Help When You Need It</h3>
              <p>Our support team is here to help you succeed with the Everly Agent Platform.</p>
              
              <ContactGrid>
                {contactOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <ContactItem key={index}>
                      <ContactIcon>
                        <Icon size={20} />
                      </ContactIcon>
                      <ContactInfo>
                        <ContactTitle>{option.title}</ContactTitle>
                        <ContactDescription>{option.description}</ContactDescription>
                      </ContactInfo>
                    </ContactItem>
                  );
                })}
              </ContactGrid>
            </ContentBody>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout currentPage="help">
      <HelpContainer>
        <PageHeader>
          <PageTitle>Help & Support</PageTitle>
          <PageSubtitle>Find answers, resources, and get support for the Everly Agent Platform</PageSubtitle>
        </PageHeader>

        <SearchContainer>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput placeholder="Search help articles, guides, and FAQs..." />
        </SearchContainer>

        <HelpGrid>
          <HelpSidebar>
            <SidebarSection>
              <SectionTitle>Help Topics</SectionTitle>
              <SidebarItem 
                active={activeSection === 'getting-started'}
                onClick={() => setActiveSection('getting-started')}
              >
                <HelpCircle size={16} />
                Getting Started
              </SidebarItem>
              <SidebarItem 
                active={activeSection === 'faq'}
                onClick={() => setActiveSection('faq')}
              >
                <HelpCircle size={16} />
                FAQ
              </SidebarItem>
              <SidebarItem 
                active={activeSection === 'resources'}
                onClick={() => setActiveSection('resources')}
              >
                <Book size={16} />
                Resources
              </SidebarItem>
              <SidebarItem 
                active={activeSection === 'contact'}
                onClick={() => setActiveSection('contact')}
              >
                <MessageCircle size={16} />
                Contact Support
              </SidebarItem>
            </SidebarSection>
          </HelpSidebar>

          <HelpContent>
            <ContentHeader>
              {renderContent()}
            </ContentHeader>
          </HelpContent>
        </HelpGrid>
      </HelpContainer>
    </MainLayout>
  );
};

export default Help;
