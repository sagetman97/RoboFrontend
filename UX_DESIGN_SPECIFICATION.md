# Life Insurance Agent Assist Platform - UX Design Specification

## Design System & Brand Guidelines

### Everly Life Brand Colors (From Official Brand Guidelines)
**Primary Colors:**
- **Everly Orange:** #FF6E1E (Pantone 158 C/U, RGB: 255, 110, 30)
- **Everly Cherry:** #C5006E (Pantone 227 C/U, RGB: 197, 0, 110)
- **Everly Charcoal:** #566171 (RGB: 86, 97, 113)
- **Gradient:** Linear gradient from Everly Orange (#FF6E1E) to Everly Cherry (#C5006E)

**Secondary Colors:**
- **Everly Beige:** #DACCB5 (RGB: 218, 204, 181)
- **Everly Straw:** #E8CB57 (RGB: 232, 203, 87)
- **Everly Lavender:** #A8A8EA (RGB: 168, 168, 234)
- **Everly Blue:** #AAC1DD (RGB: 170, 193, 221)
- **Everly Gray:** #8290A8 (RGB: 130, 144, 168)

**System Colors:**
- **Background:** White (#FFFFFF)
- **Text Primary:** Everly Charcoal (#566171)
- **Text Secondary:** Everly Gray (#8290A8)
- **Borders:** Light gray (#E5E7EB)

### Typography (From Official Brand Guidelines)
- **Eyebrow Text:** Semplicita Pro Regular ALL CAPS (for small labels)
- **Headlines:** Semplicita Pro Regular (for main headings)
- **Subheads:** Semplicita Pro Semibold (for section headers)
- **Longform/Body:** Söhne Buch (for paragraphs and body text)
- **Button Text:** Semplicita Pro Semibold, white text on colored backgrounds
- **Navigation:** Semplicita Pro Regular, 16px for menu items

### Spacing & Layout
- **Base Unit:** 8px grid system
- **Container Max Width:** 1200px
- **Sidebar Width:** 280px
- **Header Height:** 64px
- **Border Radius:** 8px (buttons, cards), 12px (modals)

### Everly's Design Philosophy Integration
Based on the official brand guidelines and website, our design incorporates:

- **Vibrant Color Palette:** Using Everly's signature Orange (#FF6E1E) and Cherry (#C5006E) gradient
- **Professional Typography:** Semplicita Pro for headings, Söhne Buch for body text
- **Clean Minimalism:** White backgrounds with strategic use of brand colors
- **Trust & Accessibility:** Everly Charcoal (#566171) for primary text, high contrast ratios
- **User-Friendly Focus:** Clear navigation and intuitive interfaces
- **Brand Consistency:** Maintaining Everly's "Every moment matters" messaging
- **Logo Integration:** Proper use of Everly's intertwined loop logo with clear space requirements

---

## Page 1: Login Page

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│                    Header (64px)                        │
│              Everly Life Insurance Logo                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │                 │    │                             │ │
│  │   Left Panel    │    │      Login Form             │ │
│  │   (Branding)    │    │                             │ │
│  │                 │    │  ┌─────────────────────────┐ │ │
│  │                 │    │  │     Email Field         │ │ │
│  │                 │    │  └─────────────────────────┘ │ │
│  │                 │    │                             │ │
│  │                 │    │  ┌─────────────────────────┐ │ │
│  │                 │    │  │     Password Field      │ │ │
│  │                 │    │  └─────────────────────────┘ │ │
│  │                 │    │                             │ │
│  │                 │    │  ┌─────────────────────────┐ │ │
│  │                 │    │  │    Sign In Button       │ │ │
│  │                 │    │  └─────────────────────────┘ │ │
│  │                 │    │                             │ │
│  │                 │    │     Forgot Password?        │ │
│  └─────────────────┘    └─────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Left Panel (Branding Section)
- **Background:** Clean white background with subtle light gray accent
- **Content:**
  - Everly logo (intertwined orange and cherry loops + "everly" text in dark gray)
  - Tagline: "Every moment matters" (Bold serif font, large, dark gray)
  - Company name: "EVERLY LIFE INSURANCE COMPANY" (Small caps, sans-serif)
  - Subtitle: "That's why Everly is here to help protect these moments, so you can keep moving on your way – wherever life takes you." (Sans-serif body text)
- **Typography:** Dark gray/black text, proper font hierarchy matching website
- **Style:** Clean, professional, matching Everly's actual website layout

### Right Panel (Login Form)
- **Background:** White (#FFFFFF) with clean, minimal styling
- **Form Container:** Centered, max-width 400px, clean card design
- **Form Elements:**
  - Email input field with clean labels (Sans-serif)
  - Password input field with show/hide toggle
  - "Remember me" checkbox (subtle styling)
  - Sign In button (full-width, solid Everly Cherry #C5006E, matching website button style)
  - "Forgot Password?" link (Dark gray text, matching navigation style)
- **Validation:** Real-time validation with clean error states
- **Loading State:** Button shows subtle spinner during authentication
- **Style:** Clean, minimal form matching Everly's website aesthetic

### Responsive Behavior
- **Desktop:** Side-by-side layout
- **Tablet:** Stacked layout with branding on top
- **Mobile:** Full-width form, condensed branding

---

## Page 2: Main Dashboard

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Header (64px) - Logo | Navigation | User Menu | Notifications │
├─────────────────────────────────────────────────────────┤
│ Sidebar (280px) │ Main Content Area                     │
│                 │                                       │
│ • Dashboard     │ ┌─────────────────────────────────────┐ │
│ • Clients       │ │        Dashboard Overview           │ │
│ • Reports       │ │                                     │ │
│ • Settings      │ │  ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │
│ • Help          │ │  │ Stats   │ │ Stats   │ │ Stats   │ │ │
│                 │ │  │ Card 1  │ │ Card 2  │ │ Card 3  │ │ │
│                 │ │  └─────────┘ └─────────┘ └─────────┘ │ │
│                 │ │                                     │ │
│                 │ │ ┌─────────────────────────────────────┐ │ │
│                 │ │ │        Recent Activity              │ │ │
│                 │ │ │                                     │ │ │
│                 │ │ │  • Client assessment completed      │ │ │
│                 │ │ │  • New report generated             │ │ │
│                 │ │ │  • Follow-up reminder               │ │ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │ ┌─────────────────────────────────────┐ │ │
│                 │ │ │        Quick Actions                │ │ │
│                 │ │ │                                     │ │ │
│                 │ │ │  [Send Assessment] [View Reports]   │ │ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │                    [Evie Chatbot] ────┘ │
└─────────────────────────────────────────────────────────┘
```

### Header Components
- **Logo:** Everly Life Insurance (left)
- **Navigation:** Dashboard, Clients, Reports, Settings (center)
- **User Menu:** Profile picture, name, dropdown (right)
- **Notifications:** Bell icon with badge count (right)

### Sidebar Navigation
- **Active State:** Blue background with white text
- **Hover State:** Light gray background
- **Icons:** Consistent icon set for each menu item
- **Collapsible:** Can be minimized on smaller screens

### Dashboard Overview Cards
- **Total Clients:** Number with trend indicator
- **Pending Assessments:** Count with urgency indicator
- **Completed Reports:** Count with completion rate
- **This Month's Activity:** Summary statistics

### Recent Activity Feed
- **Timeline View:** Chronological list of actions
- **Action Types:** Assessment completed, report generated, client contacted
- **Time Stamps:** Relative time (2 hours ago, yesterday)
- **Quick Actions:** Click to view details

### Quick Actions Panel
- **Primary Actions:** Send Assessment, View Reports
- **Secondary Actions:** Add Client, Generate Report
- **Button Style:** Primary (blue) and secondary (outline) buttons

---

## Page 3: Client List

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Header (64px) - Logo | Navigation | User Menu           │
├─────────────────────────────────────────────────────────┤
│ Sidebar (280px) │ Main Content Area                     │
│                 │                                       │
│ • Dashboard     │ ┌─────────────────────────────────────┐ │
│ • Clients ←     │ │        Client Management            │ │
│ • Reports       │ │                                     │ │
│ • Settings      │ │  [Search] [Filter] [Export] [Add]   │ │
│ • Help          │ │                                     │ │
│                 │ │ ┌─────────────────────────────────────┐ │
│                 │ │ │        Client Data Table            │ │
│                 │ │ │                                     │ │
│                 │ │ │ Name    │ Score │ Gap   │ Status │ Actions │ │
│                 │ │ │ ────────┼───────┼───────┼────────┼──────── │ │
│                 │ │ │ John D. │ 45%   │ $500K │ New    │ [Send]  │ │
│                 │ │ │ Jane S. │ 78%   │ $200K │ Pending│ [View]  │ │
│                 │ │ │ Mike R. │ 92%   │ $50K  │ Review │ [Edit]  │ │
│                 │ │ │ Sarah L │ 100%  │ $0    │ Done   │ [Report]│ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │        [Pagination Controls]          │ │
│                 │ │                    [Evie Chatbot] ────┘ │
└─────────────────────────────────────────────────────────┘
```

### Client Data Table Features
- **Sortable Columns:** Name, Protection Score, Coverage Gap, Last Contact
- **Filtering Options:** Status, Score Range, Date Range
- **Search:** Global search across all client fields
- **Bulk Actions:** Select multiple clients for batch operations
- **Export:** CSV/Excel export functionality

### Protection Score Visualization
- **Score Display:** Large percentage with color coding
  - Red: 0-40% (High need)
  - Yellow: 41-70% (Medium need)
  - Green: 71-100% (Adequate coverage)
- **Progress Bar:** Visual representation of coverage level
- **Trend Indicator:** Arrow showing if score improved/declined

### Status Indicators
- **New:** Blue badge - Recently added to system
- **Pending:** Yellow badge - Assessment sent, waiting for response
- **In Progress:** Orange badge - Assessment in progress
- **Review:** Purple badge - Report generated, awaiting agent review
- **Completed:** Green badge - Process completed

### Action Buttons
- **Send Assessment:** Primary blue button
- **View Report:** Secondary outline button
- **Edit Client:** Icon button
- **Contact:** Icon button with dropdown (email, call, meeting)

---

## Page 4: Client Detail

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Header (64px) - Logo | Navigation | User Menu           │
├─────────────────────────────────────────────────────────┤
│ Sidebar (280px) │ Main Content Area                     │
│                 │                                       │
│ • Dashboard     │ ┌─────────────────────────────────────┐ │
│ • Clients       │ │  ← Back to Clients                  │ │
│ • Reports       │ │                                     │ │
│ • Settings      │ │  John Doe - Client Profile          │ │
│ • Help          │ │                                     │ │
│                 │ │ ┌─────────────┐ ┌─────────────────────┐ │ │
│                 │ │ │   Client    │ │   Protection Score  │ │ │
│                 │ │ │   Info      │ │                     │ │ │
│                 │ │ │             │ │  ┌─────────────────┐ │ │ │
│                 │ │ │ Name: John  │ │  │      45%        │ │ │ │
│                 │ │ │ Email: ...  │ │  │   Coverage Gap  │ │ │ │
│                 │ │ │ Phone: ...  │ │  │                 │ │ │ │
│                 │ │ │ Address: .. │ │  │   $500,000      │ │ │ │
│                 │ │ └─────────────┘ │  └─────────────────┘ │ │ │
│                 │ │                 └─────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │ ┌─────────────────────────────────────┐ │ │
│                 │ │ │        Quick Actions                │ │ │
│                 │ │ │                                     │ │ │
│                 │ │ │ [Send Assessment] [Schedule Call]   │ │ │
│                 │ │ │ [View Reports] [Add Note]           │ │ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │ ┌─────────────────────────────────────┐ │ │
│                 │ │ │        Assessment History           │ │ │
│                 │ │ │                                     │ │ │
│                 │ │ │ • Assessment sent - 2 days ago      │ │ │
│                 │ │ │ • Report generated - 1 day ago      │ │ │
│                 │ │ │ • Call scheduled - Tomorrow         │ │ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                                       │ │
│                 │ │ ┌─────────────────────────────────────┐ │ │
│                 │ │ │        Communication Log            │ │ │
│                 │ │ │                                     │ │ │
│                 │ │ │ • Email sent - 2 days ago           │ │ │
│                 │ │ │ • Call made - 1 day ago             │ │ │
│                 │ │ │ • Meeting scheduled - Tomorrow      │ │ │
│                 │ │ └─────────────────────────────────────┘ │ │
│                 │ │                    [Evie Chatbot] ────┘ │
└─────────────────────────────────────────────────────────┘
```

### Client Information Panel
- **Profile Photo:** Placeholder or uploaded image
- **Contact Details:** Name, email, phone, address
- **Demographics:** Age, occupation, family status
- **Edit Button:** Inline editing capabilities

### Protection Score Panel
- **Large Score Display:** 45% with color-coded background
- **Coverage Gap:** $500,000 in prominent text
- **Visual Chart:** Donut chart showing coverage vs. gap
- **Recommendation:** "Term Life Insurance - 20 years"

### Quick Actions Section
- **Primary Actions:** Send Assessment, Schedule Call
- **Secondary Actions:** View Reports, Add Note
- **Button Layout:** Two columns of action buttons
- **Status Indicators:** Show if actions are available/pending

### Assessment History Timeline
- **Chronological List:** Most recent first
- **Status Icons:** Different icons for each action type
- **Time Stamps:** Relative time with exact dates on hover
- **Action Links:** Click to view details

### Communication Log
- **Activity Types:** Email, call, meeting, note
- **Status Indicators:** Sent, delivered, opened, responded
- **Quick Actions:** Reply, resend, schedule follow-up
- **Search/Filter:** Find specific communications

---

*This is the beginning of the comprehensive UX design specification. The document will continue with the remaining pages: Assessment Form, Report Viewer, Communication Tools, and Evie Chatbot interface.*
