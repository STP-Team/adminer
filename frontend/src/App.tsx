import './App.css'
import {AuthProvider, useAuth} from '@/contexts/AuthContext';
import {TelegramLoginButton} from "@/components/TelegramLoginButton";
import {Dashboard} from "@/components/Dashboard";
import {ThemeProvider} from "@/components/theme-provider";

function AppContent() {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className="loading-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="app-content">
            {isAuthenticated ? (
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Dashboard/>
                </ThemeProvider>
            ) : (
                <div className="card">
                    <TelegramLoginButton/>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent/>
        </AuthProvider>
    );
}

export default App
