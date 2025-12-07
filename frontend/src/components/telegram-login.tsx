import { LoginButton } from "@telegram-auth/react";
import { useAuth } from '../contexts/AuthContext';
import { GalleryVerticalEnd } from "lucide-react";

export function TelegramLogin() {
    const { login } = useAuth();

    const handleAuthCallback = async (data: any) => {
        console.log(`Authorized by ${data.username}`);
        await login(data);
    };

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Дом.ру
                </a>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-bold">Войти в систему</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Войдите используя ваш аккаунт Telegram
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <LoginButton
                            botUsername={import.meta.env.VITE_BOT_NAME}
                            onAuthCallback={handleAuthCallback}
                            buttonSize="medium"
                            showAvatar={true}
                            lang="ru"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
