import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getStatusColor } from '@/lib/mock-data'
import useMainStore from '@/stores/main'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  FileCheck,
  FileWarning,
  Save,
  History,
  Scale,
  User as UserIcon,
  Trash2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
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

const DocItem = ({
  title,
  defaultStatus,
}: {
  title: string
  defaultStatus: 'Recebido' | 'Pendente'
}) => {
  const [status, setStatus] = useState(defaultStatus)
  const isReceived = status === 'Recebido'

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-200 ${isReceived ? 'bg-emerald-50/30 border-emerald-100' : 'bg-background hover:bg-muted/50'}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${isReceived ? 'bg-emerald-100 text-emerald-600' : 'bg-muted text-muted-foreground'}`}
        >
          {isReceived ? <FileCheck className="h-5 w-5" /> : <FileWarning className="h-5 w-5" />}
        </div>
        <div>
          <span
            className={`font-semibold text-sm block ${isReceived ? 'text-emerald-900' : 'text-foreground'}`}
          >
            {title}
          </span>
          <span className="text-xs text-muted-foreground">
            {isReceived ? 'Documento validado' : 'Aguardando envio pelo cliente'}
          </span>
        </div>
      </div>
      <Button
        variant={isReceived ? 'default' : 'outline'}
        size="sm"
        onClick={() => setStatus(isReceived ? 'Pendente' : 'Recebido')}
        className={
          isReceived ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' : 'bg-background'
        }
      >
        {isReceived ? (
          <CheckCircle2 className="mr-2 h-4 w-4" />
        ) : (
          <Clock className="mr-2 h-4 w-4" />
        )}
        {status}
      </Button>
    </div>
  )
}

export default function ClientDetail() {
  const { id } = useParams()
  const { clients, deleteClient } = useMainStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const client = useMemo(() => clients.find((c) => c.id === id), [id, clients])

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Segurado não encontrado</h2>
        <Button asChild>
          <Link to="/clients">Voltar para a lista</Link>
        </Button>
      </div>
    )
  }

  const handleSave = () => {
    toast({
      title: 'Dados atualizados com sucesso!',
      description: 'As alterações no perfil do segurado foram salvas.',
    })
  }

  const handleDelete = () => {
    deleteClient(client.id)
    toast({
      title: 'Dados excluídos com sucesso',
      description: 'O segurado foi removido do sistema.',
    })
    navigate('/clients')
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-10 w-10 shrink-0 bg-muted/50 hover:bg-muted"
          >
            <Link to="/clients">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{client.name}</h1>
              <Badge
                variant="outline"
                className={`${getStatusColor(client.status)} px-3 py-0.5 text-xs font-semibold shadow-sm`}
              >
                {client.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              {client.cpf} • {client.type}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive shadow-sm"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Excluir Cliente
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Todos os dados deste cliente serão removidos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSave} className="shadow-sm">
            <Save className="mr-2 h-4 w-4" /> Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 overflow-x-auto flex-nowrap shrink-0">
          <TabsTrigger
            value="general"
            className="py-2.5 px-6 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm"
          >
            <UserIcon className="h-4 w-4 mr-2" /> Dados Pessoais
          </TabsTrigger>
          <TabsTrigger
            value="process"
            className="py-2.5 px-6 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm"
          >
            <Scale className="h-4 w-4 mr-2" /> Dados do Processo
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="py-2.5 px-6 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm"
          >
            <FileText className="h-4 w-4 mr-2" /> Documentação
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="py-2.5 px-6 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm"
          >
            <History className="h-4 w-4 mr-2" /> Histórico
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="general" className="m-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Informações Gerais</CardTitle>
                <CardDescription>Dados cadastrais e de contato do segurado.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      defaultValue={client.name}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      defaultValue={client.cpf}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nit">NIT / PIS / PASEP</Label>
                    <Input
                      id="nit"
                      defaultValue={client.nit}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth">Data de Nascimento</Label>
                    <Input
                      id="birth"
                      defaultValue={client.birthDate}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother">Nome da Mãe</Label>
                    <Input
                      id="mother"
                      defaultValue={client.motherName}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone / WhatsApp</Label>
                    <Input
                      id="phone"
                      defaultValue={client.phone}
                      className="bg-muted/30 focus:bg-background transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    id="address"
                    defaultValue={client.address}
                    className="bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="m-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Informações Previdenciárias</CardTitle>
                <CardDescription>Dados específicos do benefício e fase processual.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Benefício Requerido</Label>
                    <Input id="type" defaultValue={client.type} className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="der">DER (Data de Entrada do Requerimento)</Label>
                    <Input id="der" defaultValue={client.der} className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nb">NB (Número do Benefício)</Label>
                    <Input id="nb" placeholder="Ex: 123.456.789-0" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phase">Fase Atual</Label>
                    <Input
                      id="phase"
                      defaultValue={client.phase}
                      className="bg-muted/30 font-medium text-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="notes">Anotações Importantes</Label>
                  <textarea
                    id="notes"
                    defaultValue={client.notes}
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:bg-background"
                  ></textarea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="m-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Checklist de Documentos</CardTitle>
                <CardDescription>
                  Controle os documentos necessários para a análise do benefício.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <DocItem title="Documento de Identidade (RG/CNH)" defaultStatus="Recebido" />
                <DocItem title="Comprovante de Residência" defaultStatus="Recebido" />
                <DocItem title="Extrato CNIS Completo" defaultStatus="Recebido" />
                <DocItem title="CTPS (Carteiras de Trabalho)" defaultStatus="Pendente" />
                <DocItem
                  title="PPP (Perfil Profissiográfico Previdenciário)"
                  defaultStatus="Pendente"
                />
                <DocItem title="Laudos Médicos / Receituários" defaultStatus="Pendente" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="m-0">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Linha do Tempo</CardTitle>
                <CardDescription>Histórico de interações e mudanças de status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
                  <div className="mb-8 pl-6 relative">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background"></span>
                    <h3 className="font-semibold text-sm">
                      Status Atualizado para "{client.status}"
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Alteração feita por Agnaldo Brelas.
                    </p>
                    <span className="text-xs text-muted-foreground font-medium mt-2 block">
                      Hoje, 10:45
                    </span>
                  </div>
                  <div className="mb-8 pl-6 relative">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-muted-foreground ring-4 ring-background"></span>
                    <h3 className="font-semibold text-sm">Documento Recebido</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      CNIS validado e anexado ao processo interno.
                    </p>
                    <span className="text-xs text-muted-foreground font-medium mt-2 block">
                      10/05/2024, 14:20
                    </span>
                  </div>
                  <div className="pl-6 relative">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-muted-foreground ring-4 ring-background"></span>
                    <h3 className="font-semibold text-sm">Cadastro Inicial</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cliente convertido do funil de Leads.
                    </p>
                    <span className="text-xs text-muted-foreground font-medium mt-2 block">
                      01/05/2024, 09:00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
