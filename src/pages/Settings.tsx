import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import useMainStore from '@/stores/main'
import { Upload, Save, Bell, PenTool, User, Trash2, Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  const { settings, updateSettings } = useMainStore()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [notifications, setNotifications] = useState(settings.notifications)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(settings.signatureUrl)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSignatureUrl(url)
    }
  }

  const handleSave = () => {
    updateSettings({ notifications, signatureUrl })
    toast({
      title: 'Configurações salvas!',
      description: 'Suas preferências e assinatura foram atualizadas com sucesso no perfil.',
    })
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            Configurações da Conta
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie seu perfil, preferências de notificação e assinatura digital.
          </p>
        </div>
        <Button onClick={handleSave} className="shadow-sm">
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Dados do Perfil
            </CardTitle>
            <CardDescription>Informações básicas da sua conta de usuário.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input value="Agnaldo Brelas" disabled className="bg-muted/50 font-medium" />
              </div>
              <div className="space-y-2">
                <Label>Email de Contato / Login</Label>
                <Input
                  value="agnaldobrelas@gmail.com"
                  disabled
                  className="bg-muted/50 font-medium"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Preferências de Notificação
            </CardTitle>
            <CardDescription>
              Escolha quais alertas deseja receber no email <strong>agnaldobrelas@gmail.com</strong>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Novos Leads e Segurados</Label>
                <p className="text-sm text-muted-foreground">
                  Receber aviso quando um novo cadastro for realizado no sistema.
                </p>
              </div>
              <Switch
                checked={notifications.newLead}
                onCheckedChange={() => toggleNotification('newLead')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Prazos e Audiências</Label>
                <p className="text-sm text-muted-foreground">
                  Lembretes iminentes de vencimentos de tarefas ou perícias agendadas.
                </p>
              </div>
              <Switch
                checked={notifications.deadlines}
                onCheckedChange={() => toggleNotification('deadlines')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alterações de Status</Label>
                <p className="text-sm text-muted-foreground">
                  Aviso quando houver movimentação nos processos dos clientes.
                </p>
              </div>
              <Switch
                checked={notifications.statusChange}
                onCheckedChange={() => toggleNotification('statusChange')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Atualizações do Sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Novidades e melhorias gerais da plataforma PrevManager.
                </p>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={() => toggleNotification('systemUpdates')}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PenTool className="h-5 w-5 text-primary" /> Assinatura Digital
            </CardTitle>
            <CardDescription>
              Faça o upload da sua assinatura (PNG ou JPG) para uso na geração automática de
              documentos e petições.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {signatureUrl ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex justify-center bg-white">
                  <img
                    src={signatureUrl}
                    alt="Pré-visualização da Assinatura Digital"
                    className="max-h-32 object-contain mix-blend-multiply"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSignatureUrl(null)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remover Assinatura
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors hover:border-primary/50 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                <h3 className="font-semibold text-lg mb-1">
                  Clique para enviar ou arraste a imagem
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Selecione uma imagem da sua assinatura. Recomendamos imagens com fundo
                  transparente e boa resolução.
                </p>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
