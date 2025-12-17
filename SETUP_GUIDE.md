# 🚀 Quick Setup Guide for New Team Members

Welcome to the Water Reporting System project! This guide will help you get the project running on your laptop quickly.

## 📋 Prerequisites

Before you start, make sure you have these installed:

### 1. Install Node.js
- **Download**: Go to [nodejs.org](https://nodejs.org/)
- **Version**: Download the **LTS version** (v18 or higher)
- **Verify installation**:
  ```bash
  node --version
  npm --version
  ```
  You should see version numbers like `v18.x.x` and `9.x.x`

### 2. Install Git
- **Download**: Go to [git-scm.com](https://git-scm.com/)
- **Install** with default settings
- **Verify installation**:
  ```bash
  git --version
  ```

### 3. Install a Code Editor
- **Recommended**: [Visual Studio Code](https://code.visualstudio.com/)
- **VS Code Extensions** (optional but helpful):
  - ESLint
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

## 🔧 Project Setup

### Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Navigate to where you want to store the project
cd Desktop  # or any folder you prefer

# Clone the repository
git clone https://github.com/Namalekanayaka/Water-Reporting-system.git

# Navigate into the project
cd Water-Reporting-system/water-reporting-frontend
```

### Step 2: Install Dependencies

This will install all the packages listed in `package.json`:

```bash
npm install
```

**Wait for installation to complete** (this may take 2-5 minutes depending on your internet speed)

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v7.2.4  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser

- Open your browser
- Go to `http://localhost:5173`
- You should see the Water Reporting System homepage! 🎉

## 🛠️ Understanding the Installed Packages

Here's what each major package does:

| Package | Purpose | Usage |
|---------|---------|-------|
| **react** | Core UI library | Building user interfaces |
| **react-router-dom** | Navigation | Routing between pages |
| **tailwind CSS** | Styling | Utility-first CSS framework |
| **leaflet** | Maps | Interactive map display |
| **react-leaflet** | React + Maps | React wrapper for Leaflet |
| **recharts** | Charts | Data visualization |
| **axios** | HTTP requests | API calls to backend |
| **react-hook-form** | Forms | Form validation and handling |
| **socket.io-client** | Real-time | WebSocket connections |
| **date-fns** | Dates | Date formatting and manipulation |

## 📁 Project Structure Quick Tour

```
water-reporting-frontend/
├── src/
│   ├── components/     # Reusable UI pieces (buttons, cards, etc.)
│   ├── pages/         # Full page components (Home, Dashboard, etc.)
│   ├── services/      # API calls and utilities
│   ├── hooks/         # Custom React hooks
│   ├── context/       # Global state management
│   ├── layout/        # Page layouts (Navbar, Sidebar)
│   └── App.jsx        # Main app component with routes
│
├── public/            # Static files (images, icons)
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## 🎯 Key Files to Know

- **`src/App.jsx`** - Main app with all routes defined
- **`src/main.jsx`** - Entry point of the application
- **`src/index.css`** - Global styles and Tailwind setup
- **`package.json`** - Lists all dependencies and scripts
- **`tailwind.config.js`** - Tailwind CSS configuration

## 🚨 Common Issues & Solutions

### Issue 1: Port Already in Use
**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill the process on that port or use a different port
npm run dev -- --port 3000
```

### Issue 2: Module Not Found
**Error**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Git Clone Fails
**Error**: Authentication or permission issues

**Solution**:
- Make sure you have Git installed
- Check your internet connection
- Try using HTTPS instead of SSH

## 🔄 Daily Development Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Make your changes** in VS Code

5. **Test your changes** in the browser

6. **Commit your work**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

7. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub

## 📚 Learning Resources

- **React**: [react.dev](https://react.dev/)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Router**: [reactrouter.com](https://reactrouter.com/)
- **Leaflet**: [leafletjs.com](https://leafletjs.com/)
- **Recharts**: [recharts.org](https://recharts.org/)

## 💡 Tips for Success

1. **Keep your branch updated** - Pull from main regularly
2. **Test before committing** - Make sure your code works
3. **Write clear commit messages** - Describe what you changed
4. **Ask questions** - Don't hesitate to reach out to the team
5. **Follow the work distribution plan** - Check `WORK_DISTRIBUTION.md`

## 🆘 Getting Help

If you're stuck:
1. Check this guide first
2. Search for the error message online
3. Ask your team members
4. Check the project documentation

---

**You're all set! Happy coding! 🚀**
