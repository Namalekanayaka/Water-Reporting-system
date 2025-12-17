# 💧 Water Reporting System

An AI-powered platform for real-time water issue reporting, tracking, and management. This system helps communities report water-related problems, track their resolution, and enables authorities to manage resources efficiently.

## 🎯 Project Overview

The Water Reporting System is a comprehensive web application designed to:
- **Enable citizens** to report water issues (leaks, quality problems, supply disruptions)
- **Empower authorities** to manage and prioritize water-related incidents
- **Provide public transparency** through real-time dashboards and analytics
- **Leverage AI** for severity prediction and resource allocation

### Key Features
- 📍 **Location-based reporting** with interactive maps (Leaflet)
- 🤖 **AI-powered severity prediction** and priority queuing
- 📊 **Real-time analytics** and data visualization (Recharts)
- 🗺️ **Heatmap visualization** for water stress areas
- 🔔 **Real-time notifications** via WebSocket
- 🎨 **Modern Smart Glass UI** with glassmorphism design
- 🌓 **Dark/Light mode** support

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Leaflet & React-Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Socket.io Client** - Real-time updates
- **date-fns** - Date utilities

### Backend (To be implemented)
- Node.js + Express (planned)
- MongoDB (planned)
- AI/ML integration for severity prediction (planned)

## 📂 Project Structure

```
water-reporting-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Navbar, Footer, Sidebar, GlassCard
│   │   ├── maps/           # MapView, HeatmapLayer, LocationPicker
│   │   ├── charts/         # TimeSeriesChart, BarChart, PieChart
│   │   ├── reports/        # ReportCard, ReportForm, SeverityBadge
│   │   ├── dashboard/      # StatCard, AlertPanel, PriorityQueue
│   │   └── ai/             # AI-related components
│   │
│   ├── pages/              # Page components
│   │   ├── citizen/        # Home, ReportIssue, MyReports, AreaHealth
│   │   ├── authority/      # Dashboard, IssueManagement, Analytics
│   │   ├── public/         # PublicDashboard, MapView, Statistics
│   │   └── auth/           # Login, Register
│   │
│   ├── services/           # API and utilities
│   │   ├── api/           # API endpoint services
│   │   ├── websocket/     # WebSocket service
│   │   └── utils/         # Helper functions
│   │
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React Context providers
│   ├── layout/            # Layout components
│   └── data/              # Mock data
│
├── public/                # Static assets
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Namalekanayaka/Water-Reporting-system.git
   cd Water-Reporting-system/water-reporting-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will hot-reload when you make changes

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design System

The project uses a **Smart Glass** aesthetic with:
- Dark gradient backgrounds
- Glassmorphism effects (backdrop-blur, transparency)
- Rounded corners and floating cards
- Smooth transitions and hover effects
- Custom color palette (water-themed blues)

## 📋 Current Implementation Status

### ✅ Completed
- Project structure and routing
- Basic layout (MainLayout, Navbar, Sidebar)
- Home page with hero section
- Public Dashboard (placeholder UI)
- ReportIssue form (basic)
- Context providers (Auth, Theme, Notification)
- Smart Glass UI design system

### 🚧 In Progress
- Map integration with Leaflet
- LocationPicker component
- Report submission flow

### 📝 To Do
- Authority Dashboard implementation
- MyReports page
- Analytics and charts
- Backend API integration
- Authentication system
- Real-time WebSocket updates
- AI severity prediction
- Image upload for reports

## 🤝 Contributing

This is a team project. Please follow the work distribution plan in `WORK_DISTRIBUTION.md`.

### Development Workflow
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Wait for review and approval

## 📞 Support

For questions or issues, please contact the project maintainers.

## 📄 License

This project is licensed under the MIT License.

---

**Aligned with UN Sustainable Development Goal 6: Clean Water and Sanitation for All** 🌍💧
