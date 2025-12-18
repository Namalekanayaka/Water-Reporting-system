# 👨‍💻 Developer A - Your Tasks

**You are Developer A** - responsible for building the **Citizen Portal** where users report water issues and track their submissions.

---

## 📋 WHAT DEVELOPER A WILL BUILD

You have **3 main features** to develop:

---

### 1️⃣ COMPLETE REPORT SUBMISSION FLOW (Week 1-2)
**Time Estimate: 3-4 days**
**Enable citizens to report water issues easily**

#### What you'll build:

**✅ Integrate LocationPicker Component**
- Add interactive map for location selection
- Enable GPS location detection
- Allow manual address input
- Display selected location on map

**✅ Add Image Upload Functionality**
- Implement file upload component
- Add image preview before submission
- Handle multiple images (max 3-5 photos)
- Compress images before upload
- Validate file types (jpg, png)

**✅ Form Validation with react-hook-form**
- Add validation rules for all fields
- Display error messages clearly
- Prevent submission with invalid data
- Show field-level errors
- Required field indicators

**✅ Success/Error Notifications**
- Integrate NotificationContext
- Show success toast on submission
- Handle error cases gracefully
- Display loading states
- Confirmation message with report ID

---

#### Files you'll work on:
```
src/pages/citizen/ReportIssue.jsx
src/components/maps/LocationPicker.jsx
src/components/common/ImageUpload.jsx (create new)
src/services/api/reports.js
```

---

### 2️⃣ BUILD MYREPORTS PAGE (Week 2-3)
**Time Estimate: 2-3 days**
**Let users track their submitted reports**

#### What you'll build:

**✅ Fetch and Display User's Reports**
- Create API service for fetching user reports
- Display reports in card layout using ReportCard
- Add loading states (skeleton screens)
- Handle empty state (no reports yet)
- Refresh functionality

**✅ Report Status Tracking**
- Show status badges (Pending, In Progress, Resolved, Closed)
- Color-coded status indicators
- Display report details in expandable cards
- Show last updated timestamp

**✅ Report Timeline Component**
- Create timeline showing status updates
- Display who updated the status
- Show timestamps for each update
- Visual timeline with icons

**✅ Filtering and Sorting**
- Filter by status (All, Pending, In Progress, Resolved)
- Sort by date (newest/oldest)
- Sort by priority (high to low)
- Search by report ID or location

---

#### Files you'll work on:
```
src/pages/citizen/MyReports.jsx
src/components/reports/ReportCard.jsx
src/components/reports/ReportTimeline.jsx
src/components/reports/StatusBadge.jsx
src/services/api/reports.js
```

---

### 3️⃣ ENHANCE HOME PAGE (Week 2)
**Time Estimate: 1-2 days**
**Make the landing page more engaging**

#### What you'll build:

**✅ Add Real Statistics from API**
- Fetch live statistics instead of mock data
- Display total reports
- Show resolved issues count
- Display active reports
- Add loading states

**✅ Create Testimonials Section**
- Build TestimonialCard component
- Add user testimonials/success stories
- Carousel/slider for multiple testimonials
- User avatars and names

**✅ Add Recent Reports Preview**
- Show 3-5 recent public reports
- Display location and type
- Link to public dashboard
- Auto-refresh every 30 seconds

**✅ Improve Animations and Transitions**
- Add smooth scroll animations
- Hover effects on cards
- Fade-in effects on load
- Smooth transitions between sections

---

#### Files you'll work on:
```
src/pages/citizen/Home.jsx
src/components/common/TestimonialCard.jsx (create new)
src/components/common/RecentReports.jsx (create new)
src/services/api/analytics.js
```

---

## 🤝 SHARED TASKS (Work Together with Developer B)

### Map Integration (Week 3)
**Time Estimate: 2-3 days**

**✅ Complete MapView Component**
- Integrate Leaflet maps
- Add custom markers for reports
- Implement marker clustering
- Add map controls (zoom, layers)

**✅ Heatmap Layer**
- Create heatmap overlay for water stress
- Add toggle to show/hide heatmap
- Color gradient based on severity

**✅ Interactive Features**
- Click markers to view report details
- Filter markers by status/severity
- Add popup with report information

#### Files you'll work on:
```
src/components/maps/MapView.jsx
src/components/maps/HeatmapLayer.jsx
src/components/maps/ClusterMarkers.jsx
src/pages/public/MapView.jsx
```

---

### Authentication System (Week 4)
**Time Estimate: 2-3 days**

**✅ Login/Register Pages**
- Create login form with validation
- Create registration form
- Add form validation
- Password strength indicator
- Remember me functionality

**✅ Auth Context Integration**
- Implement login/logout logic
- Store user session (localStorage/cookies)
- Add protected routes
- Auto-redirect after login

**✅ Role-Based Access**
- Citizen vs Authority views
- Redirect based on role
- Protect authority routes
- Show/hide menu items based on role

#### Files you'll work on:
```
src/pages/auth/Login.jsx
src/pages/auth/Register.jsx
src/context/AuthContext.jsx
src/services/api/auth.js
```

---

### Backend API Integration (Ongoing)
**Time Estimate: Throughout project**

**✅ Set up API Services**
- Create axios instance with base URL
- Add request/response interceptors
- Handle authentication tokens
- Add error handling

**✅ Connect All API Endpoints**
- Reports CRUD operations
- User authentication
- Analytics data
- Real-time updates

**✅ Error Handling**
- Add global error handler
- Display user-friendly error messages
- Implement retry logic
- Handle network errors

#### Files you'll work on:
```
src/services/api/reports.js
src/services/api/auth.js
src/services/api/analytics.js
src/services/websocket/socketService.js
```

---

## 📅 Your Timeline

### Week 1
- **Day 1-2**: Integrate LocationPicker into ReportIssue
- **Day 3-4**: Add image upload functionality
- **Day 5**: Form validation and notifications

### Week 2
- **Day 1-2**: Build MyReports page
- **Day 3**: Add filtering and sorting
- **Day 4-5**: Enhance Home page

### Week 3
- **Day 1-3**: Map integration (shared with Developer B)
- **Day 4-5**: Polish and testing

### Week 4
- **Day 1-3**: Authentication system (shared)
- **Day 4-5**: API integration and testing

### Week 5
- Testing, bug fixes, final integration

---

## 🛠️ Technologies You'll Use

| Tech | What For | Learn Here |
|------|----------|------------|
| **React** | Build UI components | [react.dev](https://react.dev/) |
| **Tailwind CSS** | Style components | [tailwindcss.com](https://tailwindcss.com/) |
| **React Hook Form** | Form validation | [react-hook-form.com](https://react-hook-form.com/) |
| **Leaflet** | Maps | [leafletjs.com](https://leafletjs.com/) |
| **Axios** | API calls | [axios-http.com](https://axios-http.com/) |

---

## 📂 Your Main Files

You'll mostly work in these folders:
```
src/
├── pages/citizen/           # Your main pages
│   ├── Home.jsx            # ⭐ Landing page
│   ├── ReportIssue.jsx     # ⭐ Report submission
│   ├── MyReports.jsx       # ⭐ User's reports
│   └── AreaHealth.jsx      # Area water health
│
├── components/maps/         # Map components
│   ├── LocationPicker.jsx  # ⭐ Location selection
│   ├── MapView.jsx         # Main map
│   └── ClusterMarkers.jsx  # Marker clustering
│
└── components/reports/      # Report components
    ├── ReportCard.jsx      # ⭐ Report display
    ├── ReportTimeline.jsx  # ⭐ Status timeline
    └── ReportForm.jsx      # Report form
```

---

## 🎨 Design Style

Use the **Smart Glass** theme:

```jsx
// Card style
<div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-glass border border-white/20">
  {/* Your content */}
</div>

// Button style
<button className="px-6 py-3 bg-water-600 hover:bg-water-700 text-white rounded-xl font-semibold transition-colors">
  Submit Report
</button>

// Input style
<input 
  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 focus:ring-2 focus:ring-water-500/20"
  placeholder="Enter location"
/>
```

---

## ✅ Success Criteria

You're doing great if:
- ✅ Users can submit reports with location and images
- ✅ Form validation works correctly
- ✅ Users can view their submitted reports
- ✅ Report status is clearly displayed
- ✅ Filtering and sorting work smoothly
- ✅ Home page shows real statistics
- ✅ Everything looks good on mobile and desktop

---

## 🎯 Quick Start

### Today (Day 1):
1. ✅ Review existing ReportIssue.jsx
2. ✅ Check LocationPicker.jsx component
3. ✅ Plan the integration
4. ✅ Start integrating LocationPicker

### Tomorrow (Day 2):
1. ✅ Complete LocationPicker integration
2. ✅ Test location selection
3. ✅ Create ImageUpload component
4. ✅ Add image preview

### This Week:
1. ✅ Complete report submission flow
2. ✅ Add form validation
3. ✅ Test thoroughly
4. ✅ Start MyReports page

---

## 💡 Pro Tips

1. **Reuse components** - Use existing StatCard, GlassCard components
2. **Test on mobile** - Make sure everything is responsive
3. **Use mock data first** - Test UI before API integration
4. **Commit often** - Small, focused commits
5. **Ask Developer B** - Collaborate on shared tasks

---

## 📞 Contact

**Developer B**: [Contact info]  
**Repository**: https://github.com/Namalekanayaka/Water-Reporting-system

---

**You're building the tools that help citizens report water issues and make their voices heard. Your work empowers communities! 💧✨**

**Let's get started! 🚀**
