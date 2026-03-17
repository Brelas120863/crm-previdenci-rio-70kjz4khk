import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Users, AlertCircle, CheckCircle2, TrendingUp, Plus, UserPlus, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Link } from 'react-router-dom'

const chartData = [
  { name: 'Aposentadoria', value: 45, fill: 'var(--color-aposentadoria)' },
  { name: 'BPC/LOAS', value: 25, fill: 'var(--color-bpc)' },
  { name: 'Auxílio-Doença', value: 20, fill: 'var(--color-auxilio)' },
  { name: 'Pensão', value: 10, fill: 'var(--color-pensao)' },
]

const chartConfig = {
  aposentadoria: { label: 'Aposentadoria', color: 'hsl(var(--chart-1))' },
  bpc: { label: 'BPC/LOAS', color: 'hsl(var(--chart-2))' },
  auxilio: { label: 'Auxílio-Doença', color: 'hsl(var(--chart-3))' },
  pensao: { label: 'Pensão', color: 'hsl(var(--chart-4))' },
}

const activities = [
  {
    id: 1,
    title: 'Benefício Concedido',
    desc: 'Aposentadoria de Maria José foi deferida no INSS.',
    time: 'Há 2 horas',
    type: 'success',
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: 'Novo Lead Recebido',
    desc: 'Carlos Eduardo entrou em contato via WhatsApp.',
    time: 'Há 4 horas',
    type: 'info',
    icon: UserPlus,
  },
  {
    id: 3,
    title: 'Prazo Urgente',
    desc: 'Recurso de Ana Paula vence amanhã.',
    time: 'Há 1 dia',
    type: 'warning',
    icon: AlertCircle,
  },
  {
    id: 4,
    title: 'Documento Pendente',
    desc: 'Falta PPP de João Batista para análise prévia.',
    time: 'Há 1 dia',
    type: 'default',
    icon: Clock,
  },
]

export default function Index() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Visão Geral</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhe o desempenho e as urgências do seu escritório.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild className="bg-white hover:bg-muted">
            <Link to="/leads">
              <UserPlus className="mr-2 h-4 w-4" /> Novo Lead
            </Link>
          </Button>
          <Button asChild className="shadow-sm">
            <Link to="/clients">
              <Plus className="mr-2 h-4 w-4" /> Novo Segurado
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Segurados Ativos
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">142</div>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +4 desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Leads em Análise
            </CardTitle>
            <UserPlus className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">28</div>
            <p className="text-xs text-muted-foreground mt-1">12 aguardando resposta</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Prazos Próximos (7d)
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">5</div>
            <p className="text-xs text-rose-600 font-medium mt-1">2 vencem amanhã</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-300 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Taxa de Sucesso
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Benefícios deferidos vs indeferidos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Benefícios</CardTitle>
            <CardDescription>
              Status atual dos processos em andamento por categoria.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <ChartContainer config={chartConfig} className="h-[280px] w-full max-w-[400px]">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} className="mt-4" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
            <CardDescription>Últimas movimentações no CRM.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((act) => {
                const Icon = act.icon
                return (
                  <div key={act.id} className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 rounded-full p-2 flex items-center justify-center shrink-0 ${
                        act.type === 'success'
                          ? 'bg-emerald-100 text-emerald-600'
                          : act.type === 'info'
                            ? 'bg-blue-100 text-blue-600'
                            : act.type === 'warning'
                              ? 'bg-rose-100 text-rose-600'
                              : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold leading-none">{act.title}</p>
                      <p className="text-sm text-muted-foreground">{act.desc}</p>
                      <p className="text-xs text-muted-foreground/70 flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> {act.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-6 text-primary font-medium hover:bg-primary/5"
            >
              Ver todo o histórico
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
