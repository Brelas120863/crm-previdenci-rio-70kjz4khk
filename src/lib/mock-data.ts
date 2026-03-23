export const MOCK_CLIENTS = [
  {
    id: '1',
    name: 'Maria das Graças Silva',
    cpf: '123.456.789-00',
    nit: '1234567890',
    phone: '(11) 98765-4321',
    type: 'Aposentadoria por Idade',
    status: 'Concedido',
    der: '15/05/2023',
    phase: 'Pagamento',
    motherName: 'Ana da Silva',
    address: 'Rua das Flores, 123, São Paulo - SP',
    birthDate: '12/04/1958',
    notes: 'Benefício concedido após revisão de vínculos no CNIS.',
  },
  {
    id: '2',
    name: 'João Batista Ferreira',
    cpf: '234.567.890-11',
    nit: '0987654321',
    phone: '(11) 91234-5678',
    type: 'BPC/LOAS',
    status: 'Em Análise',
    der: '10/01/2024',
    phase: 'Aguardando Perícia',
    motherName: 'Lurdes Ferreira',
    address: 'Av. Paulista, 4000, São Paulo - SP',
    birthDate: '05/09/1960',
    notes: 'Agendar assistente social.',
  },
  {
    id: '3',
    name: 'Ana Paula Rodrigues',
    cpf: '345.678.901-22',
    nit: '1122334455',
    phone: '(11) 99887-6655',
    type: 'Auxílio-Doença',
    status: 'Indeferido',
    der: '20/11/2023',
    phase: 'Recurso Administrativo',
    motherName: 'Sonia Rodrigues',
    address: 'Rua Augusta, 500, São Paulo - SP',
    birthDate: '22/07/1985',
    notes: 'Faltou apresentação de laudo médico atualizado.',
  },
  {
    id: '4',
    name: 'Carlos Eduardo Souza',
    cpf: '456.789.012-33',
    nit: '5544332211',
    phone: '(11) 97766-5544',
    type: 'Pensão por Morte',
    status: 'Recurso',
    der: '05/12/2023',
    phase: 'Junta de Recursos',
    motherName: 'Marta Souza',
    address: 'Praça da Sé, 100, São Paulo - SP',
    birthDate: '15/02/1970',
    notes: 'Aguardando análise da documentação de dependentes.',
  },
  {
    id: '5',
    name: 'Lucia Helena Costa',
    cpf: '567.890.123-44',
    nit: '9988776655',
    phone: '(11) 96655-4433',
    type: 'Aposentadoria Tempo de Contribuição',
    status: 'Em Análise',
    der: '28/02/2024',
    phase: 'Análise Documental',
    motherName: 'Josefa Costa',
    address: 'Rua Oscar Freire, 800, São Paulo - SP',
    birthDate: '30/11/1965',
    notes: 'Verificar período trabalhado em condições especiais.',
  },
]

export const MOCK_LEADS = [
  {
    id: 'l1',
    name: 'Roberto Almeida',
    phone: '(11) 95544-3322',
    type: 'Revisão da Vida Toda',
    status: 'Contato Inicial',
    temperature: 'Hot',
    date: 'Hoje, 09:30',
  },
  {
    id: 'l2',
    name: 'Sonia Mara',
    phone: '(11) 94433-2211',
    type: 'Aposentadoria Especial',
    status: 'Pré-Análise',
    temperature: 'Warm',
    date: 'Ontem, 14:15',
  },
  {
    id: 'l3',
    name: 'Fernando Nogueira',
    phone: '(11) 93322-1100',
    type: 'BPC/LOAS',
    status: 'Proposta Enviada',
    temperature: 'Cold',
    date: '12/05/2024',
  },
  {
    id: 'l4',
    name: 'Clara Peixoto',
    phone: '(11) 92211-0099',
    type: 'Planejamento Previdenciário',
    status: 'Contrato Assinado',
    temperature: 'Hot',
    date: '10/05/2024',
  },
  {
    id: 'l5',
    name: 'Marcos Vinicius',
    phone: '(11) 91100-9988',
    type: 'Auxílio-Acidente',
    status: 'Contato Inicial',
    temperature: 'Warm',
    date: 'Hoje, 11:00',
  },
]

export const MOCK_TASKS = [
  {
    id: 1,
    title: 'Protocolar Recurso - João Batista',
    desc: 'Prazo final administrativo INSS',
    daysLeft: 1,
  },
  { id: 2, title: 'Anexar Laudo - Ana Paula', desc: 'Juntar laudo atualizado', daysLeft: 2 },
  { id: 3, title: 'Perícia Médica - Carlos Eduardo', desc: 'Agência INSS Centro', daysLeft: 3 },
]

export const MOCK_ACTIVITIES = [
  {
    id: 1,
    title: 'Benefício Concedido',
    desc: 'Aposentadoria de Maria José foi deferida no INSS.',
    time: 'Há 2 horas',
    type: 'success',
    icon: 'CheckCircle2',
  },
  {
    id: 2,
    title: 'Novo Lead Recebido',
    desc: 'Carlos Eduardo entrou em contato via WhatsApp.',
    time: 'Há 4 horas',
    type: 'info',
    icon: 'UserPlus',
  },
  {
    id: 3,
    title: 'Prazo Urgente',
    desc: 'Recurso de Ana Paula vence amanhã.',
    time: 'Há 1 dia',
    type: 'warning',
    icon: 'AlertCircle',
  },
  {
    id: 4,
    title: 'Documento Pendente',
    desc: 'Falta PPP de João Batista para análise prévia.',
    time: 'Há 1 dia',
    type: 'default',
    icon: 'Clock',
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concedido':
    case 'Concluído':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Em Análise':
    case 'Triagem':
    case 'Análise de Documentos':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'Indeferido':
      return 'bg-rose-100 text-rose-800 border-rose-200'
    case 'Recurso':
    case 'Requerimento enviado ao INSS':
    case 'Em espera de exigência':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
