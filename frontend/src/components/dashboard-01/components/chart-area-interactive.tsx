"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ChartAreaInteractive() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Общая статистика</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Итого за последние 3 месяца
          </span>
          <span className="@[540px]/card:hidden">Последние 3 месяца</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full rounded-lg border border-dashed flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-2">График будет здесь</div>
            <div className="text-muted-foreground">Интерактивная диаграмма с данными</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}