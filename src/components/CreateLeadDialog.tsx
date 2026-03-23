import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useMainStore from '@/stores/main'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formatCPF = (v: string) => {
  const n = v.replace(/\D/g, '').slice(0, 11)
  if (n.length > 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`
  if (n.length > 6) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`
  if (n.length > 3) return `${n.slice(0, 3)}.${n.slice(3)}`
  return n
}

const formatNIT = (v: string) => {
  const n = v.replace(/\D/g, '').slice(0, 11)
  if (n.length > 10) return `${n.slice(0, 3)}.${n.slice(3, 8)}.${n.slice(8, 10)}-${n.slice(10)}`
  if (n.length > 8) return `${n.slice(0, 3)}.${n.slice(3, 8)}.${n.slice(8)}`
  if (n.length > 3) return `${n.slice(0, 3)}.${n.slice(3)}`
  return n
}

const formatDate = (v: string) => {
  const n = v.replace(/\D/g, '').slice(0, 8)
  if (n.length > 4) return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`
  if (n.length > 2) return `${n.slice(0, 2)}/${n.slice(2)}`
  return n
}

const formatPhone = (v: string) => {
  const n = v.replace(/\D/g, '').slice(0, 11)
  if (n.length > 10) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
  if (n.length > 6) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
  if (n.length > 2) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  return n.length > 0 ? `(${n}` : n
}

const leadSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido (000.000.000-00)'),
  nit: z.string().regex(/^\d{3}\.\d{5}\.\d{2}-\d{1}$/, 'Formato inválido (000.00000.00-0)'),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (DD/MM/AAAA)'),
  phone: z.string().min(14, 'Telefone inválido'),
  status: z.string().min(1, 'Fase inicial é obrigatória'),
  type: z.string().min(1, 'Tipo de serviço é obrigatório'),
})

type FormValues = z.infer<typeof leadSchema>

export function CreateLeadDialog({ columns }: { columns: { id: string; label: string }[] }) {
  const [open, setOpen] = useState(false)
  const { addLead } = useMainStore()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      cpf: '',
      nit: '',
      birthDate: '',
      phone: '',
      status: 'Contato Inicial',
      type: 'Planejamento Previdenciário',
    },
  })

  const onSubmit = (data: FormValues) => {
    addLead({
      name: data.name,
      phone: data.phone,
      status: data.status,
      type: data.type,
      cpf: data.cpf,
      nit: data.nit,
      birthDate: data.birthDate,
      temperature: 'Warm',
      date: new Date().toLocaleDateString('pt-BR'),
    })
    toast({
      title: 'Lead criado com sucesso',
      description: 'O novo lead foi adicionado ao pipeline.',
    })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-sm">Adicionar Lead</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Lead / Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados essenciais para adicionar um potencial cliente ao pipeline.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Maria Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        {...field}
                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT/PIS *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.00000.00-0"
                        {...field}
                        onChange={(e) => field.onChange(formatNIT(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DD/MM/AAAA"
                        {...field}
                        onChange={(e) => field.onChange(formatDate(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone / WhatsApp *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 90000-0000"
                        {...field}
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Serviço *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: BPC/LOAS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fase Inicial *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a fase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {columns.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
