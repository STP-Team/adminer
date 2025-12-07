import type {LucideIcon} from "lucide-react";
import {BarChart3, FileText, Home, Settings, Users} from "lucide-react";

export interface NavigationItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface NavigationCategory {
    title: string;
    items: NavigationItem[];
}

export const navigationData: NavigationCategory[] = [
    {
        title: "Главная",
        items: [
            {
                title: "Дашборд",
                url: "#dashboard",
                icon: Home,
            },
        ],
    },
    {
        title: "Управление",
        items: [
            {
                title: "Пользователи",
                url: "#users",
                icon: Users,
            },
            {
                title: "Настройки",
                url: "#settings",
                icon: Settings,
            },
        ],
    },
    {
        title: "Аналитика",
        items: [
            {
                title: "Статистика",
                url: "#statistics",
                icon: BarChart3,
            },
            {
                title: "Отчеты",
                url: "#reports",
                icon: FileText,
            },
        ],
    },
];