import { MOCK_LEADS } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, UsersRound, MoreHorizontal, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const KANBAN_COLUMNS = [
  { id: 'Contato Inicial', label: 'Contato Inicial', color: 'border-blue-200 bg-blue-50/50' },
  { id: 'Pré-Análise', label: 'Pré-Análise', color: 'border-amber-200 bg-amber-50/50' },
  { id: 'Proposta Enviada', label: 'Proposta Enviada', color: 'border-purple-200 bg-purple-50/50' },
  {
    id: 'Contrato Assinado',
    label: 'Contrato Assinado',
    color: 'border-emerald-200 bg-emerald-50/50',
  },
]

export default function Leads() {
  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UsersRound className="h-6 w-6 text-primary" />
            Prospectos (Pipeline)
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie potenciais clientes desde o primeiro contato até o fechamento.
          </p>
        </div>
        <Button className="shadow-sm">Adicionar Lead</Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {KANBAN_COLUMNS.map((col) => {
            const columnLeads = MOCK_LEADS.filter((l) => l.status === col.id)
            return (
              <div
                key={col.id}
                className={`flex flex-col w-80 shrink-0 rounded-xl border ${col.color}`}
              >
                <div className="p-4 border-b bg-white/50 rounded-t-xl flex justify-between items-center shrink-0">
                  <h3 className="font-semibold text-sm text-foreground">{col.label}</h3>
                  <Badge variant="secondary" className="bg-white">
                    {columnLeads.length}
                  </Badge>
                </div>
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnLeads.map((lead) => (
                    <Card
                      key={lead.id}
                      className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group bg-white"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                            {lead.name}
                          </h4>
                          <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 font-medium">
                          {lead.type}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className={
                              lead.temperature === 'Hot'
                                ? 'border-rose-200 text-rose-600 bg-rose-50'
                                : lead.temperature === 'Warm'
                                  ? 'border-amber-200 text-amber-600 bg-amber-50'
                                  : 'border-blue-200 text-blue-600 bg-blue-50'
                            }
                          >
                            {lead.temperature}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground ml-auto">
                            {lead.date}
                          </span>
                        </div>

                        <div className="pt-3 border-t flex justify-between items-center">
                          <div className="flex items-center text-xs text-muted-foreground font-medium">
                            <Phone className="h-3 w-3 mr-1" />
                            {lead.phone}
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-muted flex items-center justify-center rounded-lg text-sm text-muted-foreground">
                      Nenhum lead nesta fase
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
