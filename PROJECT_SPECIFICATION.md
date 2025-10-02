# Life Insurance Agent Assist Platform - Project Specification

## Project Overview

**Company:** Everly Life Insurance Company  
**Platform:** Agent Assist Tool for Life Insurance Needs Assessment  
**Purpose:** Streamline the life insurance sales process by identifying client needs gaps and generating personalized recommendations

## Brand Guidelines & Design System

### Color Palette
- **Primary Background:** White (#FFFFFF)
- **Accent Colors:** Blue and Green variations (to be extracted from Everly's current palette)
- **Text:** Dark gray/black for primary text, lighter gray for secondary text
- **Interactive Elements:** Blue/green accents for buttons, links, and highlights

### Typography
- **Font Family:** Sans-serif fonts (clean, modern, professional)
- **Headings:** Bold, larger sizes for clear hierarchy
- **Body Text:** Lighter weight, smaller sizes for readability
- **Consistency:** Maintain visual hierarchy throughout all pages

### Design Principles
- Clean, uncluttered interface with ample white space
- Simple, intuitive navigation
- High-quality imagery and icons aligned with brand colors
- Consistent use of brand elements across all pages
- Professional, trustworthy aesthetic

## Core Functionality & User Flow

### 1. Protection Score Analysis (Pre-Processed)
**Status:** Completed in background before agent access  
**Input:** CRM data from agent's existing system (already processed)  
**Process:** Algorithm has already calculated life insurance needs gaps  
**Output:** Pre-populated CRM with:
- Protection Score (percentage) for each client
- Coverage amount needed
- Duration of need
- Client categorization (needs coverage vs. adequate coverage)

**Note:** Agents log into the platform and immediately see their CRM populated with clients who have already been analyzed for life insurance needs gaps. No initial calculation step required.

### 2. Agent Dashboard CRM (Pre-Populated)
**Initial State:** CRM is already populated with processed client data  
**Features:**
- Client list with pre-calculated protection scores
- Visual indicators for coverage gaps
- Filtering and sorting capabilities
- Client status tracking
- Quick action buttons

**Client Information Display:**
- Client name and contact information
- Pre-calculated protection score (already determined)
- Coverage gap amount (already calculated)
- Last contact date
- Status (new lead, pending assessment, in progress, completed)

### 3. Client Assessment Form
**Trigger:** Agent clicks "Send Assessment" button  
**Delivery:** Email to client with hosted form link  
**Form Sections:**

#### Basic Information
- Personal details
- Family information
- Financial situation

#### Life Insurance Goals
- Education funding for children
- Retirement planning goals
- Estate planning needs
- Income replacement requirements
- Debt coverage needs

#### Product Preferences
- Term vs. Permanent insurance preference
- Budget considerations
- Timeline requirements

#### Advanced Variables (Collapsible Section)
- Income multipliers
- Expense ratios
- Investment assumptions
- Risk tolerance
- Tax considerations
- Inflation adjustments

### 4. Report Generation
**Trigger:** Form completion (by client or agent)  
**Output:** Comprehensive life insurance needs report

#### Report Contents
- Executive summary
- Protection score analysis
- Product recommendation with rationale
- Coverage amount and duration
- Visual charts and graphs
- Portfolio integration analysis
- Suitability assessment
- Next steps

#### Visualizations
- Protection gap charts
- Coverage timeline graphs
- Portfolio allocation pie charts
- Cost-benefit analysis
- Comparison tables

### 5. Agent Review & Approval
**Features:**
- Report preview with edit capabilities
- Variable adjustment tools
- Validation checklist
- Approval workflow
- Comments and notes section

**Actions Available:**
- Edit form responses
- Adjust advanced variables
- Request additional information
- Approve report
- Reject and request revisions

### 6. Client Communication
**Options:**
- Phone call scheduling
- Email report delivery
- In-person meeting coordination
- Video conference setup

**Communication Tools:**
- Pre-written email templates
- Call scripts and talking points
- Presentation materials
- Follow-up reminders

### 7. Application Process
**Trigger:** "Continue Application" button  
**Process:** Redirect to sister website with pre-populated data  
**Data Transfer:**
- All form responses
- Calculated recommendations
- Agent notes and preferences
- Client contact information

## Technical Requirements

### Frontend Framework
- Modern JavaScript framework (React/Vue/Angular)
- Responsive design for desktop and tablet
- Mobile-friendly interface

### User Interface Components
- Data tables with sorting/filtering
- Form builders with validation
- Chart and graph libraries
- Modal dialogs and overlays
- Progress indicators
- Notification systems

### Integration Points
- CRM data import/export
- Email service integration
- Report generation engine
- Sister website API connection
- Chatbot service integration

## Application Architecture & Pages

### 1. Authentication & Onboarding
**Pages:**
- Login page
- Password reset
- First-time setup (if needed)
- User profile management

### 2. Main Dashboard
**Layout:**
- Header with navigation and user menu
- Sidebar with main navigation
- Main content area
- Evie chatbot (bottom right)

**Navigation Menu:**
- Dashboard overview
- Client list
- Reports
- Settings
- Help/Support

### 3. Client Management Pages
**Client List Page:**
- Data table with all clients
- Filtering by protection score, status, date
- Search functionality
- Bulk actions
- Export capabilities

**Client Detail Page:**
- Client profile information
- Protection score details
- Assessment history
- Communication log
- Action buttons (Send Assessment, View Report, etc.)

### 4. Assessment Form Pages
**Form Builder Interface:**
- Multi-step form wizard
- Progress indicator
- Save draft functionality
- Form validation
- Preview mode

**Advanced Variables Panel:**
- Collapsible section
- Real-time calculation updates
- Reset to defaults option
- Variable explanations/tooltips

### 5. Report Pages
**Report Viewer:**
- Full-screen report display
- Print-friendly version
- Download options (PDF, email)
- Share functionality

**Report Editor:**
- Inline editing capabilities
- Variable adjustment tools
- Comments and notes
- Approval workflow

### 6. Communication Pages
**Email Templates:**
- Pre-built templates
- Custom message creation
- Attachment support
- Send tracking

**Call Management:**
- Call scheduling
- Notes and outcomes
- Follow-up reminders
- Integration with calendar

### 7. Settings & Configuration
**User Settings:**
- Profile management
- Notification preferences
- Display options
- Security settings

**System Settings:**
- Integration configurations
- Email templates management
- Report customization
- User permissions (admin only)

## Data Models & State Management

### Client Data Structure
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  protectionScore: number,
  coverageGap: number,
  duration: number,
  status: 'new' | 'pending' | 'in_progress' | 'completed',
  lastContact: date,
  assessmentData: object,
  reportData: object,
  notes: string[]
}
```

### Assessment Form Data
```javascript
{
  clientId: string,
  basicInfo: object,
  goals: object,
  preferences: object,
  advancedVariables: object,
  completedBy: 'client' | 'agent',
  completionDate: date,
  status: 'draft' | 'completed' | 'reviewed'
}
```

### Report Data Structure
```javascript
{
  id: string,
  clientId: string,
  assessmentId: string,
  recommendations: object,
  visualizations: object,
  status: 'generated' | 'reviewed' | 'approved' | 'sent',
  agentNotes: string,
  clientFeedback: string
}
```

## Error Handling & Edge Cases

### Form Validation
- Required field validation
- Data type validation
- Business rule validation
- Real-time feedback

### Error States
- Network connectivity issues
- Server errors
- Data loading failures
- Form submission errors

### Loading States
- Page loading indicators
- Form submission feedback
- Data refresh indicators
- Progress bars for long operations

## Accessibility & Usability

### WCAG Compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Focus management

### User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Helpful error messages
- Contextual help and tooltips

## Performance Requirements

### Loading Times
- Initial page load: < 3 seconds
- Form submissions: < 2 seconds
- Report generation: < 5 seconds
- Data table filtering: < 1 second

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Testing Strategy

### Unit Testing
- Component testing
- Function testing
- Integration testing

### User Testing
- Usability testing
- A/B testing for key flows
- Accessibility testing
- Performance testing

## Evie Chatbot Integration

### Positioning
- Bottom right corner of all pages
- Floating action button design
- Everly green accent color for visibility

### Functionality
- Platform navigation help
- Product information queries
- Report explanation assistance
- Process guidance
- FAQ responses
- Agent training support

### Design
- Clean, minimal interface
- Consistent with Everly branding
- Easy access without page disruption
- Context-aware responses

## User Roles & Permissions

### Agent Users
- Full access to all features
- Client management capabilities
- Report generation and editing
- Application initiation
- Chatbot access

### Client Users (Limited Access)
- Assessment form completion
- Report viewing
- Application continuation
- Basic chatbot queries

## Success Metrics

### Agent Efficiency
- Time saved per client assessment
- Increased conversion rates
- Reduced manual data entry
- Improved client satisfaction

### Client Experience
- Simplified assessment process
- Clear, understandable reports
- Faster application process
- Better product understanding

## Security & Compliance

### Data Protection
- Secure form handling
- Encrypted data transmission
- Client privacy protection
- HIPAA compliance considerations

### Access Control
- Role-based permissions
- Secure authentication
- Session management
- Audit trails

## Future Enhancements

### Phase 2 Features
- Advanced analytics dashboard
- Automated follow-up sequences
- Integration with more CRM systems
- Mobile app development
- Advanced reporting features

### Scalability Considerations
- Multi-tenant architecture
- API-first design
- Cloud deployment ready
- Performance optimization

## API Specifications

### Authentication Endpoints
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh
- POST /auth/reset-password

### Client Management Endpoints
- GET /clients (with filtering, pagination)
- GET /clients/:id
- PUT /clients/:id
- POST /clients/:id/assessment
- GET /clients/:id/reports

### Assessment Endpoints
- POST /assessments
- GET /assessments/:id
- PUT /assessments/:id
- POST /assessments/:id/submit

### Report Endpoints
- POST /reports/generate
- GET /reports/:id
- PUT /reports/:id
- POST /reports/:id/approve
- GET /reports/:id/download

### Communication Endpoints
- POST /communications/email
- GET /communications/history/:clientId
- POST /communications/call-log

## Database Schema

### Tables
- users (agents)
- clients
- assessments
- reports
- communications
- audit_logs
- settings

### Relationships
- One-to-many: Agent → Clients
- One-to-many: Client → Assessments
- One-to-many: Assessment → Reports
- One-to-many: Client → Communications

## Deployment & Infrastructure

### Environment Setup
- Development environment
- Staging environment
- Production environment

### Hosting Requirements
- Cloud hosting (AWS/Azure/GCP)
- CDN for static assets
- SSL certificates
- Database hosting
- Email service integration

### Monitoring & Analytics
- Application performance monitoring
- User analytics
- Error tracking
- Usage metrics

## Project Timeline & Milestones

### Phase 1: Foundation (Weeks 1-4)
- Project setup and architecture
- Authentication system
- Basic dashboard layout
- Client list functionality

### Phase 2: Core Features (Weeks 5-8)
- Assessment form builder
- Report generation
- Agent review workflow
- Basic communication tools

### Phase 3: Advanced Features (Weeks 9-12)
- Advanced variables panel
- Report customization
- Email templates
- Evie chatbot integration

### Phase 4: Polish & Launch (Weeks 13-16)
- Testing and bug fixes
- Performance optimization
- User training materials
- Production deployment

## Risk Assessment & Mitigation

### Technical Risks
- Integration complexity with existing CRM
- Report generation performance
- Data security and compliance
- Browser compatibility issues

### Business Risks
- User adoption challenges
- Training requirements
- Change management
- Competitive response

### Mitigation Strategies
- Phased rollout approach
- Comprehensive testing
- User training programs
- Regular feedback collection

## Project Deliverables

### Design Assets
- Wireframes for all pages
- High-fidelity mockups
- Interactive prototypes
- Design system documentation
- Brand guideline implementation
- Component library documentation

### Development
- Responsive frontend application
- Component library
- Integration with backend services
- Testing and quality assurance
- Deployment and hosting setup
- API documentation
- User documentation

### Training & Support
- User training materials
- Video tutorials
- Help documentation
- Support procedures
- Maintenance guidelines

---

*This document serves as the single source of truth for the Life Insurance Agent Assist Platform project. All design decisions, feature implementations, and technical requirements should reference this specification.*
