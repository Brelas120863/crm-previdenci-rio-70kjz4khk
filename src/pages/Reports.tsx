import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart3, TrendingUp, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Relatórios e Indicadores
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Análise a produtividade financeira e operacional.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Honorários Estimados (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 24.500,00</div>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Tempo Médio de Concessão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">145 dias</div>
            <p className="text-xs text-muted-foreground mt-1">Média do escritório</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm md:col-span-3 lg:col-span-1 h-40 flex items-center justify-center bg-muted/20 border-dashed">
          <p className="text-sm text-muted-foreground font-medium">Gráficos Detalhados em Breve</p>
        </Card>
      </div>
    </div>
  )
}
