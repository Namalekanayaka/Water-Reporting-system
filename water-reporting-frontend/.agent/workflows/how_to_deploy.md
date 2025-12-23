---
description: How to deploy the AquaAlert application to Vercel or Firebase Hosting
---

# Deployment Guide

The applications build process (`npm run build`) is passing successfully. You have two main options for hosting:

## Option A: Vercel (Recommended for simplicity)
Vercel is optimized for Vite/React apps and offers zero-configuration deployment.

### Method 1: Via GitHub (Best for continuous updates)
1. Push your code to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com) and sign up/login.
3. Click **"Add New..."** -> **"Project"**.
4. Import your GitHub repository.
5. **Important**: In the configuration step, expand **"Environment Variables"**.
6. Add all the variables from your `.env.example` file (e.g., `VITE_FIREBASE_API_KEY`, `VITE_GEMINI_API_KEY`, etc.) with their actual values.
7. Click **"Deploy"**.

### Method 2: Via Command Line
1. Open your terminal in the project folder.
2. Run `npx vercel`.
3. Follow the prompts (login, confirm defaults).
4. When asked about environment variables, choose "N" (No) if you haven't set them up in Vercel yet, but the site will likely fail to load data. You can add them in the project settings on the dashboard later, or use `npx vercel env pull` workflows.

---

## Option B: Firebase Hosting
Since you use Firebase for Auth/DB, this keeps everything unified.

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Initialize:
   ```bash
   firebase init hosting
   ```
   - Select your existing Firebase project.
   - Public directory: `dist`
   - Configure as a single-page app? **Yes**
   - Set up automatic builds and deploys with GitHub? (Optional)
4. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

**Note:** Ensure your Firebase Console -> Project Settings -> "Authorized Domains" includes your new hosting URL.
