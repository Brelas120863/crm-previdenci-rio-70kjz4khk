import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_CLIENTS, MOCK_LEADS, MOCK_TASKS, MOCK_ACTIVITIES } from '@/lib/mock-data'

export type Client = (typeof MOCK_CLIENTS)[0]

export interface Lead {
  id: string
  name: string
  phone: string
  type: string
  status: string
  temperature: string
  date: string
  cpf?: string
  nit?: string
  birthDate?: string
}

export type Task = (typeof MOCK_TASKS)[0]
export type Activity = (typeof MOCK_ACTIVITIES)[0]

interface MainStoreType {
  clients: Client[]
  leads: Lead[]
  tasks: Task[]
  activities: Activity[]
  deleteClient: (id: string) => void
  deleteLead: (id: string) => void
  deleteTask: (id: number) => void
  addLead: (lead: Omit<Lead, 'id'>) => void
  clearAllData: () => void
}

const MainStoreContext = createContext<MainStoreType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS as Lead[])
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES)

  const deleteClient = (id: string) => setClients((clients) => clients.filter((c) => c.id !== id))
  const deleteLead = (id: string) => setLeads((leads) => leads.filter((l) => l.id !== id))
  const deleteTask = (id: number) => setTasks((tasks) => tasks.filter((t) => t.id !== id))
  const addLead = (lead: Omit<Lead, 'id'>) => {
    setLeads((prev) => [...prev, { ...lead, id: `l${Date.now()}` }])
  }

  const clearAllData = () => {
    setClients([])
    setLeads([])
    setTasks([])
    setActivities([])
  }

  return React.createElement(
    MainStoreContext.Provider,
    {
      value: {
        clients,
        leads,
        tasks,
        activities,
        deleteClient,
        deleteLead,
        deleteTask,
        addLead,
        clearAllData,
      },
    },
    children,
  )
}

export default function useMainStore() {
  const context = useContext(MainStoreContext)
  if (!context) throw new Error('useMainStore must be used within MainStoreProvider')
  return context
}
