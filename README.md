# Everly Agent Platform

A comprehensive life insurance agent assist platform built for Everly Life Insurance Company. This React-based application provides agents with tools to manage clients, generate protection scores, conduct assessments, and facilitate the life insurance application process.

## 🚀 Features

### Core Functionality
- **Client Management CRM** - Comprehensive client database with protection scores and status tracking
- **Protection Score Analysis** - Automated calculation of life insurance needs gaps
- **Assessment Forms** - Interactive forms for suitability questions and variable adjustments
- **Report Generation** - Automated life insurance reports with product recommendations
- **Communication Tools** - Email templates and client communication management
- **Evie AI Chatbot** - Intelligent assistant for platform guidance and support

### Key Pages
- **Login/Authentication** - Secure agent access with Everly branding
- **Dashboard** - Overview of client statistics and quick actions
- **Client CRM** - Detailed client management with filtering and actions
- **Assessment Forms** - Multi-step forms for life insurance suitability
- **Report Viewer** - Comprehensive life insurance reports and recommendations
- **Communication Center** - Email templates and client outreach tools
- **Settings & Help** - Agent preferences and platform support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Styled Components with Everly brand guidelines
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Build Tool**: Create React App

## 🎨 Design System

### Brand Colors
- **Everly Orange**: #FF6E1E
- **Everly Cherry**: #C5006E
- **Charcoal**: #566171
- **Beige**: #DACCB5
- **Straw**: #E8CB57
- **Lavender**: #A8A8EA
- **Blue**: #AAC1DD
- **Gray**: #8290A8

### Typography
- **Headings**: Semplicita Pro (serif)
- **Body Text**: Söhne Buch (sans-serif)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sagetman97/RoboFrontend.git
   cd RoboFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build & Deployment

### Development Build
```bash
npm run build
```

### Production Deployment
The application is ready for deployment to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── EvieChatbot.tsx # AI chatbot component
├── pages/              # Main application pages
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── ClientList.tsx  # Client CRM
│   ├── ClientDetail.tsx # Individual client view
│   ├── AssessmentForm.tsx # Life insurance assessment
│   ├── ReportViewer.tsx # Report display
│   ├── Communication.tsx # Email templates
│   ├── Settings.tsx    # Agent settings
│   └── Help.tsx        # Help & support
├── styles/             # Design system and global styles
│   ├── design-system.ts # Brand colors, typography, spacing
│   └── GlobalStyles.tsx # Global CSS and resets
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_CHATBOT_API=your_chatbot_api_here
```

## 🎯 Key Features in Detail

### Client Management
- **Protection Score Tracking** - Visual indicators of life insurance needs
- **Status Management** - Editable client statuses (New Lead, Assessment Sent, etc.)
- **Contact Management** - Phone, email, and communication history
- **Advanced Filtering** - Multi-select filters for status and protection scores

### Assessment Process
- **Essential Suitability Questions** - 8 key questions for life insurance suitability
- **Core Variables** - Pre-populated financial and personal data
- **Advanced Variables** - Optional detailed financial information
- **Real-time Validation** - Form validation and error handling

### Report Generation
- **Automated Analysis** - Protection gap calculations and recommendations
- **Product Suggestions** - Term vs. permanent life insurance guidance
- **Visual Charts** - Coverage analysis and financial projections
- **Agent Review** - Approval workflow for report accuracy

### Communication Tools
- **Email Templates** - Pre-built templates for client outreach
- **Assessment Links** - Shareable assessment forms
- **Client Outreach** - Integrated communication workflow

## 🤖 Evie AI Chatbot

The Evie chatbot provides:
- **Platform Guidance** - Help with navigation and features
- **Product Information** - Life insurance product explanations
- **Process Support** - Step-by-step assistance with workflows
- **Persistent State** - Maintains conversation across page navigation

## 🎨 Brand Compliance

This application strictly follows Everly's brand guidelines:
- **Official Colors** - All colors match Everly's brand palette
- **Typography** - Uses Everly's approved font families
- **Logo Integration** - Official Everly horizontal logo
- **Messaging** - "Made for Living™" tagline and brand voice

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Primary platform for agents
- **Tablet** - Mobile agent support
- **Mobile** - On-the-go client management

## 🔒 Security Features

- **Authentication** - Secure login system
- **Route Protection** - Protected routes for authenticated users
- **Data Validation** - Client-side form validation
- **Secure Communication** - HTTPS-ready for production

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading for optimal performance
- **Memoization** - React.memo and useMemo for efficient rendering
- **Optimized Images** - Proper image sizing and formats
- **Bundle Analysis** - Optimized build sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Everly Life Insurance Company.

## 📞 Support

For technical support or questions about the platform, please contact the development team.

---

**Built with ❤️ for Everly Life Insurance Company**