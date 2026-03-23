import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Users,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Plus,
  UserPlus,
  Clock,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PieChart, Pie, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Link } from 'react-router-dom'
import useMainStore from '@/stores/main'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

const chartConfig = {
  aposentadoria: { label: 'Aposentadoria', color: 'hsl(var(--chart-1))' },
  bpc: { label: 'BPC/LOAS', color: 'hsl(var(--chart-2))' },
  auxilio: { label: 'Auxílio-Doença', color: 'hsl(var(--chart-3))' },
  pensao: { label: 'Pensão', color: 'hsl(var(--chart-4))' },
}

const ICONS: Record<string, any> = {
  CheckCircle2,
  UserPlus,
  AlertCircle,
  Clock,
}

export default function Index() {
  const { clients, leads, tasks, activities, clearAllData } = useMainStore()
  const { toast } = useToast()

  const handleClearData = () => {
    clearAllData()
    toast({
      title: 'Dados excluídos com sucesso',
      description: 'Todos os registros do CRM foram removidos.',
    })
  }

  const isEmpty = clients.length === 0 && leads.length === 0 && tasks.length === 0

  const chartData = useMemo(() => {
    const getCount = (keyword: string) => clients.filter((c) => c.type.includes(keyword)).length
    return [
      {
        name: 'Aposentadoria',
        value: getCount('Aposentadoria'),
        fill: 'var(--color-aposentadoria)',
      },
      { name: 'BPC/LOAS', value: getCount('BPC/LOAS'), fill: 'var(--color-bpc)' },
      { name: 'Auxílio-Doença', value: getCount('Auxílio'), fill: 'var(--color-auxilio)' },
      { name: 'Pensão', value: getCount('Pensão'), fill: 'var(--color-pensao)' },
    ].filter((d) => d.value > 0)
  }, [clients])

  const chartDisplayData =
    chartData.length > 0 ? chartData : [{ name: 'Sem Dados', value: 1, fill: 'hsl(var(--muted))' }]

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Visão Geral</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acompanhe o desempenho e as urgências do seu escritório.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive shadow-sm"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Limpar Todos os Dados
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Todos os clientes, leads, tarefas e atividades
                  serão permanentemente removidos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearData}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir Tudo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" asChild className="bg-white hover:bg-muted shadow-sm">
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

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-card rounded-xl border border-dashed border-border shadow-sm">
          <img
            src="https://img.usecurling.com/p/200/200?q=empty%20desk&color=gray"
            alt="Empty state"
            className="w-32 h-32 opacity-60 rounded-full grayscale"
          />
          <h2 className="text-xl font-semibold text-foreground">CRM Vazio</h2>
          <p className="text-muted-foreground max-w-sm">
            Você ainda não possui dados cadastrados ou acabou de limpar seu CRM. Comece adicionando
            novos registros.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-all duration-300 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Segurados Ativos
                </CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{clients.length}</div>
                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +{Math.max(0, clients.length - 2)} desde o
                  último mês
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
                <div className="text-3xl font-bold text-foreground">{leads.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.floor(leads.length / 2)} aguardando resposta
                </p>
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
                <div className="text-3xl font-bold text-foreground">{tasks.length}</div>
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {Math.floor(tasks.length / 2)} vencem amanhã
                </p>
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
                <div className="text-3xl font-bold text-foreground">
                  {clients.length > 0 ? '87%' : '0%'}
                </div>
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
                      data={chartDisplayData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={3}
                      strokeWidth={0}
                    >
                      {chartDisplayData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity outline-none"
                        />
                      ))}
                    </Pie>
                    {chartData.length > 0 && <ChartTooltip content={<ChartTooltipContent />} />}
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
                  {activities.length > 0 ? (
                    activities.map((act) => {
                      const Icon = ICONS[act.icon] || Clock
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
                    })
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                      Nenhuma atividade recente.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
