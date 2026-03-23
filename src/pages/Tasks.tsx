import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Calendar as CalendarIcon, Clock, CheckCircle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'
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

export default function Tasks() {
  const { tasks, deleteTask } = useMainStore()
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    deleteTask(id)
    toast({
      title: 'Dados excluídos com sucesso',
      description: 'A tarefa foi permanentemente removida.',
    })
  }

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
            {tasks.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground flex flex-col items-center gap-3">
                <img
                  src="https://img.usecurling.com/p/200/200?q=done%20checklist&color=gray"
                  alt="No tasks"
                  className="w-24 h-24 opacity-50 rounded-full grayscale"
                />
                <p>Nenhuma tarefa agendada para os próximos dias.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{task.desc}</p>
                      <span className="text-xs font-semibold text-rose-600 mt-2 block">
                        Vence em {task.daysLeft} dia(s)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 rounded-full hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="shrink-0 rounded-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. A tarefa será permanentemente removida.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(task.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
