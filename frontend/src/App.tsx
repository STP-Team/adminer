import './App.css'
import {AuthProvider, useAuth} from '@/contexts/AuthContext';
import {TelegramLogin} from "@/components/telegram-login";
import {ThemeProvider} from "@/components/theme-provider";
import DashboardPage from "@/components/dashboard-01/page";
import { Loader2 } from "lucide-react";

function AppContent() {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return (
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-sm text-muted-foreground">Авторизуемся...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-content">
            {isAuthenticated ? (
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <DashboardPage/>
                </ThemeProvider>
            ) : (
                <TelegramLogin/>
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
