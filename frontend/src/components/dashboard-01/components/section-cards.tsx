import { TrendingDown, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Общая выручка</CardDescription>
            <Badge variant="outline">
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₽1,250,000
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Рост в этом месяце <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Посетители за последние 6 месяцев
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Новые клиенты</CardDescription>
            <Badge variant="outline">
              <TrendingDown className="size-3" />
              -20%
            </Badge>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Снижение на 20% <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Привлечение требует внимания
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Активные аккаунты</CardDescription>
            <Badge variant="outline">
              <TrendingUp className="size-3" />
              +8.2%
            </Badge>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Высокая активность пользователей <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Превышают целевые показатели</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Темп роста</CardDescription>
            <Badge variant="outline">
              <TrendingUp className="size-3" />
              +4.5%
            </Badge>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Стабильный рост производительности <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Соответствует прогнозам роста</div>
        </CardFooter>
      </Card>
    </div>
  )
}