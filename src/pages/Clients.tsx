import { useState } from 'react'
import { MOCK_CLIENTS, getStatusColor } from '@/lib/mock-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, ArrowRight, Contact } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'

export default function Clients() {
  const [search, setSearch] = useState('')

  const filteredClients = MOCK_CLIENTS.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.cpf.includes(search),
  )

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Contact className="h-6 w-6 text-primary" />
            Lista de Segurados
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acesse e gerencie todos os processos dos seus clientes ativos.
          </p>
        </div>
      </div>

      <Card className="p-1 border-border/50 shadow-sm overflow-hidden bg-card">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b bg-muted/20">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou CPF..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background max-w-md"
            />
          </div>
          <Button variant="outline" className="shrink-0 bg-background">
            <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-foreground">Nome Completo</TableHead>
              <TableHead className="font-semibold text-foreground">CPF / Contato</TableHead>
              <TableHead className="font-semibold text-foreground">Tipo de Benefício</TableHead>
              <TableHead className="font-semibold text-foreground">Status Atual</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell className="font-medium">
                  {client.name}
                  <div className="text-xs text-muted-foreground font-normal mt-0.5 md:hidden">
                    {client.cpf}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="text-sm">{client.cpf}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{client.phone}</div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-muted-foreground">{client.type}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(client.status)} border rounded-full px-2.5 py-0.5 font-medium shadow-sm`}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Link to={`/clients/${client.id}`}>
                      Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  Nenhum segurado encontrado com a busca "{search}".
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
