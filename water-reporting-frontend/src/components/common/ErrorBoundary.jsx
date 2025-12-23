import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ color: '#ef4444', fontSize: '24px', marginBottom: '16px' }}>Application Crashed</h1>
                    <p style={{ marginBottom: '24px', color: '#374151' }}>
                        Something went wrong while loading the application. This is often due to missing Environment Variables in deployment.
                    </p>

                    <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '12px', overflow: 'auto' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Error Details:</h2>
                        <pre style={{ color: '#dc2626', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px' }}>Component Stack:</h2>
                        <pre style={{ fontSize: '12px', color: '#666' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>

                    <div style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>How to Fix on Vercel:</h3>
                        <ol style={{ listStyle: 'decimal', paddingLeft: '24px', spaceY: '8px' }}>
                            <li style={{ marginBottom: '8px' }}>Go to your Vercel Project Dashboard.</li>
                            <li style={{ marginBottom: '8px' }}>Click <strong>Settings</strong> → <strong>Environment Variables</strong>.</li>
                            <li style={{ marginBottom: '8px' }}>Add the missing keys from your <code>.env</code> file (e.g., <code>VITE_FIREBASE_API_KEY</code>).</li>
                            <li style={{ marginBottom: '8px' }}>Redeploy the application.</li>
                        </ol>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
