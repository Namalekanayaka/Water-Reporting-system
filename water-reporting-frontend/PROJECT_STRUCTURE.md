# Water Reporting System - Frontend Structure

## 📁 Project Organization

This document outlines the complete frontend folder structure for the Advanced Water Reporting Platform.

## 🗂️ Directory Structure

```
src/
├── assets/                    # Static assets
│   ├── images/               # Image files
│   ├── icons/                # Icon files
│   └── fonts/                # Custom fonts
│
├── components/               # Reusable UI components
│   ├── common/              # Common components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Footer section
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   └── ErrorBoundary.jsx   # Error handling
│   │
│   ├── maps/                # Map-related components
│   │   ├── MapView.jsx      # Main map display
│   │   ├── HeatmapLayer.jsx # Heatmap overlay
│   │   ├── ClusterMarkers.jsx  # Marker clustering
│   │   └── LocationPicker.jsx  # Location selection
│   │
│   ├── charts/              # Data visualization
│   │   ├── TimeSeriesChart.jsx  # Time-series charts
│   │   ├── BarChart.jsx     # Bar charts
│   │   ├── PieChart.jsx     # Pie charts
│   │   └── ForecastChart.jsx    # AI forecast visualization
│   │
│   ├── reports/             # Report-related components
│   │   ├── ReportCard.jsx   # Report summary card
│   │   ├── ReportForm.jsx   # Report submission form
│   │   ├── ReportTimeline.jsx  # Report update timeline
│   │   └── SeverityBadge.jsx   # Severity indicator
│   │
│   ├── dashboard/           # Dashboard components
│   │   ├── StatCard.jsx     # Statistics card
│   │   ├── AlertPanel.jsx   # Alert notifications
│   │   ├── PriorityQueue.jsx   # Priority report queue
│   │   └── ResourceAllocation.jsx  # Resource planning
│   │
│   └── ai/                  # AI-related components
│       ├── SeverityExplanation.jsx  # AI reasoning display
│       ├── ForecastPanel.jsx        # Forecast display
│       └── AnomalyAlert.jsx         # Anomaly alerts
│
├── pages/                   # Page components
│   ├── citizen/            # Citizen-facing pages
│   │   ├── Home.jsx        # Landing page
│   │   ├── ReportIssue.jsx # Report submission
│   │   ├── MyReports.jsx   # User's reports
│   │   └── AreaHealth.jsx  # Area water health
│   │
│   ├── authority/          # Authority portal
│   │   ├── Dashboard.jsx   # Authority dashboard
│   │   ├── IssueManagement.jsx  # Issue management
│   │   ├── Analytics.jsx   # Analytics & forecasting
│   │   └── TeamManagement.jsx   # Team management
│   │
│   ├── public/             # Public pages
│   │   ├── PublicDashboard.jsx  # Public dashboard
│   │   ├── MapView.jsx     # Public map view
│   │   └── Statistics.jsx  # Public statistics
│   │
│   └── auth/               # Authentication pages
│       ├── Login.jsx       # Login page
│       └── Register.jsx    # Registration page
│
├── services/               # API and utility services
│   ├── api/               # API endpoints
│   │   ├── reports.js     # Reports API
│   │   ├── auth.js        # Authentication API
│   │   ├── analytics.js   # Analytics API
│   │   └── predictions.js # AI predictions API
│   │
│   ├── websocket/         # Real-time services
│   │   └── socketService.js  # WebSocket handler
│   │
│   └── utils/             # Utility functions
│       ├── dateUtils.js   # Date utilities
│       ├── geoUtils.js    # Geolocation utilities
│       └── chartUtils.js  # Chart configurations
│
├── hooks/                 # Custom React hooks
│   ├── useAuth.js        # Authentication hook
│   ├── useReports.js     # Reports data hook
│   ├── useWebSocket.js   # WebSocket hook
│   └── useGeolocation.js # Geolocation hook
│
├── context/              # React Context providers
│   ├── AuthContext.jsx   # Auth state management
│   ├── ThemeContext.jsx  # Theme management
│   └── NotificationContext.jsx  # Notifications
│
├── types/                # TypeScript type definitions
│   ├── report.types.js   # Report types
│   ├── user.types.js     # User types
│   └── analytics.types.js # Analytics types
│
├── data/                 # Mock/test data
│   └── mockData.js       # Development data
│
├── layout/               # Layout components
│   └── MainLayout.jsx    # Main app layout
│
├── App.jsx               # Main app component
└── main.jsx              # Entry point
```

## 🎯 Component Purposes

### **Common Components**
- **Navbar**: Site-wide navigation with role-based menu
- **Footer**: Footer with links and contact info
- **LoadingSpinner**: Reusable loading indicator
- **ErrorBoundary**: Error catching and display

### **Map Components**
- **MapView**: Main interactive map (Leaflet/Mapbox)
- **HeatmapLayer**: Water stress heatmap overlay
- **ClusterMarkers**: Clustered report markers
- **LocationPicker**: Interactive location selection

### **Chart Components**
- **TimeSeriesChart**: Historical trend visualization
- **BarChart**: Categorical data comparison
- **PieChart**: Distribution visualization
- **ForecastChart**: AI predictions with confidence intervals

### **Report Components**
- **ReportCard**: Individual report display
- **ReportForm**: Multi-step report submission
- **ReportTimeline**: Status update timeline
- **SeverityBadge**: Color-coded severity indicator

### **Dashboard Components**
- **StatCard**: Key metric display
- **AlertPanel**: Critical alerts display
- **PriorityQueue**: AI-sorted report queue
- **ResourceAllocation**: Resource deployment suggestions

### **AI Components**
- **SeverityExplanation**: Explains AI severity prediction
- **ForecastPanel**: Water stress forecasts
- **AnomalyAlert**: Sensor anomaly notifications

## 📄 Page Routes

### **Citizen Routes**
- `/` - Home/Landing page
- `/report` - Submit water issue
- `/my-reports` - View submitted reports
- `/area-health` - Area water health score

### **Authority Routes**
- `/authority/dashboard` - Main authority dashboard
- `/authority/issues` - Issue management
- `/authority/analytics` - Analytics & forecasting
- `/authority/teams` - Team management

### **Public Routes**
- `/dashboard` - Public dashboard
- `/map` - Public map view
- `/statistics` - Public statistics

### **Auth Routes**
- `/login` - User login
- `/register` - User registration

## 🔧 Services

### **API Services**
- **reports.js**: CRUD operations for reports
- **auth.js**: Authentication endpoints
- **analytics.js**: Analytics data fetching
- **predictions.js**: AI prediction endpoints

### **WebSocket Service**
- **socketService.js**: Real-time updates for reports and alerts

### **Utilities**
- **dateUtils.js**: Date formatting and manipulation
- **geoUtils.js**: Geolocation calculations
- **chartUtils.js**: Chart configuration helpers

## 🪝 Custom Hooks

- **useAuth**: Authentication state and methods
- **useReports**: Reports data fetching and caching
- **useWebSocket**: WebSocket connection management
- **useGeolocation**: Browser geolocation access

## 🌐 Context Providers

- **AuthContext**: Global authentication state
- **ThemeContext**: Dark/light mode management
- **NotificationContext**: Toast notifications

## 📝 Next Steps

1. **Install Dependencies**
   ```bash
   npm install react-router-dom axios
   npm install leaflet react-leaflet
   npm install recharts
   npm install react-hook-form
   npm install date-fns
   npm install socket.io-client
   ```

2. **Setup Routing** in `App.jsx`
3. **Create Mock Data** in `data/mockData.js`
4. **Build Components** incrementally
5. **Integrate Maps** (Leaflet/Mapbox)
6. **Connect Backend APIs**

## 🚀 Development Workflow

1. Start with **common components** (Navbar, Footer)
2. Build **layout structure** (MainLayout)
3. Create **pages** with placeholder content
4. Implement **map integration**
5. Add **chart components**
6. Build **report submission** flow
7. Create **authority dashboard**
8. Add **AI features**
9. Implement **real-time updates**
10. Polish and optimize

---

**Project**: Advanced Water Reporting Platform  
**Tech Stack**: React + Tailwind CSS + Leaflet + Recharts  
**Purpose**: AI-assisted water management system
