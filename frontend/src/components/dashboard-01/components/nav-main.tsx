"use client"

import {type NavigationCategory} from "@/data/navigation"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
                            navigationData,
                            onNavigate,
                            activeContent,
                        }: {
    navigationData: NavigationCategory[]
    onNavigate?: (url: string) => void
    activeContent?: string
}) {
    const handleNavigation = (url: string) => {
        if (onNavigate) {
            onNavigate(url);
        }
    };

    return (
        <>
            {/*<SidebarGroup>*/}
            {/*  <SidebarGroupContent className="flex flex-col gap-2">*/}
            {/*    <SidebarMenu>*/}
            {/*      /!*<SidebarMenuItem className="flex items-center gap-2">*!/*/}
            {/*      /!*  <SidebarMenuButton*!/*/}
            {/*      /!*    tooltip="Создать"*!/*/}
            {/*      /!*    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"*!/*/}
            {/*      /!*  >*!/*/}
            {/*      /!*    <Plus className="!size-4" />*!/*/}
            {/*      /!*    <span>Создать</span>*!/*/}
            {/*      /!*  </SidebarMenuButton>*!/*/}
            {/*      /!*  <Button*!/*/}
            {/*      /!*    size="icon"*!/*/}
            {/*      /!*    className="size-8 group-data-[collapsible=icon]:opacity-0"*!/*/}
            {/*      /!*    variant="outline"*!/*/}
            {/*      /!*  >*!/*/}
            {/*      /!*    <Mail />*!/*/}
            {/*      /!*    <span className="sr-only">Уведомления</span>*!/*/}
            {/*      /!*  </Button>*!/*/}
            {/*      /!*</SidebarMenuItem>*!/*/}
            {/*    </SidebarMenu>*/}
            {/*  </SidebarGroupContent>*/}
            {/*</SidebarGroup>*/}

            {navigationData.map((category) => (
                <SidebarGroup key={category.title}>
                    <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {category.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        isActive={activeContent === item.url}
                                        onClick={() => handleNavigation(item.url)}
                                        tooltip={item.title}
                                    >
                                        <item.icon className="size-1"/>
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    )
}