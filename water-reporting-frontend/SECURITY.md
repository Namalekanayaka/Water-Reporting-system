# Security & API Key Protection

This project is configured to follow security best practices regarding API keys.

## 1. Source Control Protection
- **`.env` files are ignored**: The `.gitignore` file is configured to exclude all `.env` files. This ensures your secrets (API keys) are NEVER committed to GitHub or shared in the repository.
- **Environment Variables**: The code does not contain hardcoded keys. It uses `import.meta.env.VITE_...` to load them dynamically.

## 2. Best Practices for You
- **Never share your `.env` file**.
- **Rotate Keys**: If you suspect a key has been exposed, regenerate it in the Google Cloud/Firebase Console immediately.
- **Restrict Keys**:
    - Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
    - Edit your API Keys.
    - **Application Restrictions**: Set "HTTP referrers (web sites)" and add your deployed domain (e.g., `https://your-app.vercel.app/*`) and `http://localhost:5173/*`.
    - **API Restrictions**: Limit the key to only the APIs you use (e.g., Firebase, Generative Language API).

## 3. Deployment
When deploying to Vercel, Netlify, or Firebase Hosting, you must enter these variables in the hosting provider's "Environment Variables" settings. Do not commit the `.env` file.

___
