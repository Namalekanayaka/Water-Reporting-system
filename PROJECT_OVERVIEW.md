# 🎓 Project Context & Technical Overview

This document provides a comprehensive overview of the Water Reporting System for new team members.

## 🌍 Problem Statement

### The Challenge
Millions of people worldwide lack access to clean water due to:
- **Infrastructure failures** (pipe leaks, pump breakdowns)
- **Water quality issues** (contamination, unsafe drinking water)
- **Supply disruptions** (irregular water supply, shortages)
- **Poor communication** between citizens and water authorities
- **Inefficient resource allocation** by authorities

### Our Solution
An AI-powered web platform that:
1. **Empowers citizens** to report water issues quickly with location and photos
2. **Helps authorities** prioritize and manage issues efficiently
3. **Provides transparency** through public dashboards and analytics
4. **Leverages AI** to predict severity and optimize resource allocation
5. **Enables real-time tracking** of issue resolution

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Citizen    │  │  Authority   │  │    Public    │      │
│  │    Portal    │  │   Dashboard  │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Node.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   REST API   │  │  WebSocket   │  │  AI Service  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Database (MongoDB)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Reports   │  │    Users     │  │  Analytics   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Architecture (Our Focus)

```
React Application
├── Routing (React Router)
│   ├── Citizen Routes (/, /report, /my-reports)
│   ├── Authority Routes (/authority/*)
│   ├── Public Routes (/dashboard, /map)
│   └── Auth Routes (/login, /register)
│
├── State Management
│   ├── AuthContext (user authentication)
│   ├── ThemeContext (dark/light mode)
│   └── NotificationContext (toast messages)
│
├── Services
│   ├── API Services (axios)
│   ├── WebSocket Service (socket.io)
│   └── Utility Functions
│
└── UI Components
    ├── Pages (full page views)
    ├── Components (reusable pieces)
    └── Layout (navbar, sidebar, footer)
```

---

## 🎯 User Personas

### 1. Citizen (Primary User)
**Name**: Rajesh Kumar  
**Age**: 35  
**Occupation**: Small business owner  
**Goals**:
- Report water leaks in his neighborhood
- Track if his report is being addressed
- See water quality in his area

**Pain Points**:
- No easy way to report issues
- Doesn't know who to contact
- No feedback on reported issues

**How Our App Helps**:
- Quick report submission with location
- Real-time status tracking
- Transparent public dashboard

### 2. Water Authority Officer (Secondary User)
**Name**: Priya Sharma  
**Age**: 42  
**Occupation**: Municipal Water Department Manager  
**Goals**:
- Manage all water-related complaints
- Prioritize critical issues
- Allocate teams efficiently
- Track performance metrics

**Pain Points**:
- Overwhelmed with reports
- Hard to prioritize
- Manual resource allocation
- No data-driven insights

**How Our App Helps**:
- AI-powered priority queue
- Comprehensive dashboard
- Analytics and forecasting
- Team management tools

### 3. Public/Researcher (Tertiary User)
**Name**: Dr. Anita Desai  
**Age**: 38  
**Occupation**: Environmental Researcher  
**Goals**:
- Access public water quality data
- Analyze trends over time
- Identify problem areas

**How Our App Helps**:
- Public dashboard with statistics
- Interactive maps
- Historical data visualization

---

## 🔄 Key User Flows

### Flow 1: Citizen Reports an Issue

```
1. User visits homepage
   ↓
2. Clicks "Report an Issue"
   ↓
3. Fills form:
   - Issue type (leak, quality, etc.)
   - Location (map picker or GPS)
   - Description
   - Photos (optional)
   - Priority level
   ↓
4. Submits report
   ↓
5. AI analyzes severity
   ↓
6. Report saved to database
   ↓
7. User receives confirmation
   ↓
8. User can track in "My Reports"
```

### Flow 2: Authority Manages Issues

```
1. Authority logs in
   ↓
2. Views dashboard with:
   - Total reports
   - High-priority queue
   - Critical alerts
   - Team status
   ↓
3. Clicks on high-priority report
   ↓
4. Views details:
   - Location on map
   - Photos
   - AI severity explanation
   ↓
5. Assigns to team member
   ↓
6. Updates status (In Progress)
   ↓
7. Team resolves issue
   ↓
8. Updates status (Resolved)
   ↓
9. Citizen receives notification
```

### Flow 3: Public Views Data

```
1. Anyone visits public dashboard
   ↓
2. Views statistics:
   - Total reports
   - Resolved issues
   - Active problems
   ↓
3. Explores interactive map
   ↓
4. Clicks on area to see details
   ↓
5. Views trends and analytics
```

---

## 🧩 Component Hierarchy

### Page Structure Example: Authority Dashboard

```
Dashboard.jsx
├── StatCard (x4)
│   ├── Icon
│   ├── Title
│   ├── Value
│   └── Trend
│
├── PriorityQueue
│   ├── QueueHeader
│   ├── ReportCard (x5)
│   │   ├── SeverityBadge
│   │   ├── Location
│   │   ├── Timestamp
│   │   └── QuickActions
│   └── ViewAllButton
│
├── AlertPanel
│   ├── AlertHeader
│   ├── AlertItem (x3)
│   │   ├── Icon
│   │   ├── Message
│   │   └── DismissButton
│   └── ViewAllButton
│
└── ResourceAllocation
    ├── TeamMember (x4)
    │   ├── Avatar
    │   ├── Name
    │   ├── Status
    │   └── CurrentTask
    └── AddTeamButton
```

---

## 📊 Data Models

### Report Model
```javascript
{
  id: "report_123",
  type: "pipeline_leakage" | "low_pressure" | "water_quality" | "no_supply" | "other",
  title: "Major water leak on Main Street",
  description: "Large pipe burst causing flooding",
  location: {
    latitude: 12.9716,
    longitude: 77.5946,
    address: "123 Main Street, Bangalore"
  },
  images: ["url1", "url2"],
  priority: "critical" | "high" | "medium" | "low",
  aiSeverityScore: 0.85, // 0-1
  status: "pending" | "in_progress" | "resolved" | "closed",
  reportedBy: "user_456",
  assignedTo: "authority_789",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:20:00Z",
  timeline: [
    { status: "pending", timestamp: "2024-01-15T10:30:00Z" },
    { status: "in_progress", timestamp: "2024-01-15T11:00:00Z", assignedTo: "authority_789" }
  ]
}
```

### User Model
```javascript
{
  id: "user_456",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+91-9876543210",
  role: "citizen" | "authority" | "admin",
  location: {
    city: "Bangalore",
    state: "Karnataka"
  },
  createdAt: "2024-01-01T00:00:00Z"
}
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary - Water Theme */
--water-50: #f0f9ff;
--water-100: #e0f2fe;
--water-500: #0ea5e9;
--water-600: #0284c7;
--water-700: #0369a1;

/* Status Colors */
--success: #10b981;  /* Resolved */
--warning: #f59e0b;  /* In Progress */
--danger: #ef4444;   /* Critical */
--info: #3b82f6;     /* Pending */

/* Neutral */
--slate-50: #f8fafc;
--slate-800: #1e293b;
--slate-900: #0f172a;
```

### Typography

```css
/* Headings */
h1: text-4xl font-bold (36px)
h2: text-3xl font-bold (30px)
h3: text-2xl font-semibold (24px)
h4: text-xl font-semibold (20px)

/* Body */
body: text-base (16px)
small: text-sm (14px)
tiny: text-xs (12px)
```

### Spacing

```css
/* Padding/Margin */
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
```

### Components

```css
/* Cards */
.card {
  @apply bg-white/10 backdrop-blur-xl rounded-3xl shadow-glass border border-white/20 p-6;
}

/* Buttons */
.btn-primary {
  @apply px-6 py-3 bg-water-600 hover:bg-water-700 text-white rounded-xl font-semibold transition-colors;
}

/* Inputs */
.input {
  @apply w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 focus:ring-2 focus:ring-water-500/20;
}
```

---

## 🔌 API Endpoints (Backend - To Be Implemented)

### Reports
```
GET    /api/reports              # Get all reports
GET    /api/reports/:id          # Get single report
POST   /api/reports              # Create new report
PUT    /api/reports/:id          # Update report
DELETE /api/reports/:id          # Delete report
GET    /api/reports/user/:userId # Get user's reports
```

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout user
GET    /api/auth/me              # Get current user
```

### Analytics
```
GET    /api/analytics/stats      # Get overall statistics
GET    /api/analytics/trends     # Get trend data
GET    /api/analytics/forecast   # Get AI predictions
GET    /api/analytics/heatmap    # Get heatmap data
```

---

## 🧪 Testing Strategy (Future)

### Unit Tests
- Test individual components
- Test utility functions
- Test API services

### Integration Tests
- Test page flows
- Test form submissions
- Test API integration

### E2E Tests
- Test complete user journeys
- Test critical paths
- Test cross-browser compatibility

---

## 🚀 Deployment (Future)

### Frontend Hosting
- **Option 1**: Vercel (recommended)
- **Option 2**: Netlify
- **Option 3**: GitHub Pages

### Backend Hosting
- **Option 1**: Heroku
- **Option 2**: AWS EC2
- **Option 3**: DigitalOcean

### Database
- **MongoDB Atlas** (cloud)

---

## 📚 Additional Resources

### Official Documentation
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)
- [Recharts](https://recharts.org/)

### Tutorials
- [React Tutorial](https://react.dev/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

### Design Inspiration
- [Dribbble - Dashboard Designs](https://dribbble.com/search/dashboard)
- [Behance - Web App UI](https://www.behance.net/search/projects?search=web+app+ui)

---

**This document will be updated as the project evolves. Last updated: 2024-12-17**
