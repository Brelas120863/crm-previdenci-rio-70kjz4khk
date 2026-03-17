import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Tasks() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          Prazos e Tarefas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie os compromissos, perícias e prazos de recursos.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm mt-6">
        <CardHeader>
          <CardTitle>Próximas Tarefas</CardTitle>
          <CardDescription>Eventos agendados para os próximos 7 dias.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Protocolar Recurso - João Batista</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Prazo final administrativo INSS
                    </p>
                    <span className="text-xs font-semibold text-rose-600 mt-2 block">
                      Vence em {i} dia(s)
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 rounded-full hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
