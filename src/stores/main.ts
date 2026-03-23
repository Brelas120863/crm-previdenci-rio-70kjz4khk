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

export interface UserSettings {
  notifications: {
    newLead: boolean
    deadlines: boolean
    statusChange: boolean
    systemUpdates: boolean
  }
  signatureUrl: string | null
}

interface MainStoreType {
  clients: Client[]
  leads: Lead[]
  tasks: Task[]
  activities: Activity[]
  settings: UserSettings
  deleteClient: (id: string) => void
  deleteLead: (id: string) => void
  deleteTask: (id: number) => void
  addLead: (lead: Omit<Lead, 'id'>) => void
  addClient: (client: Omit<Client, 'id'>) => void
  clearAllData: () => void
  updateSettings: (settings: Partial<UserSettings>) => void
}

const MainStoreContext = createContext<MainStoreType | undefined>(undefined)

const defaultSettings: UserSettings = {
  notifications: {
    newLead: true,
    deadlines: true,
    statusChange: true,
    systemUpdates: false,
  },
  signatureUrl: null,
}

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS as Lead[])
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES)
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)

  const deleteClient = (id: string) => setClients((clients) => clients.filter((c) => c.id !== id))
  const deleteLead = (id: string) => setLeads((leads) => leads.filter((l) => l.id !== id))
  const deleteTask = (id: number) => setTasks((tasks) => tasks.filter((t) => t.id !== id))

  const addLead = (lead: Omit<Lead, 'id'>) => {
    setLeads((prev) => [{ ...lead, id: `l${Date.now()}` }, ...prev])
  }

  const addClient = (client: Omit<Client, 'id'>) => {
    setClients((prev) => [{ ...client, id: `c${Date.now()}` }, ...prev])
  }

  const clearAllData = () => {
    setClients([])
    setLeads([])
    setTasks([])
    setActivities([])
  }

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return React.createElement(
    MainStoreContext.Provider,
    {
      value: {
        clients,
        leads,
        tasks,
        activities,
        settings,
        deleteClient,
        deleteLead,
        deleteTask,
        addLead,
        addClient,
        clearAllData,
        updateSettings,
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
