import { TeamMember } from '../types/allocation';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Lucas Ferreira',
    role: 'Engineering',
    grade: 'Rookie',
    projectCount: 2,
    teamInfo: { em: 'André Medeiros', techLead: 'Bruno Costa', designer: 'Sarah Johnson' },
    externalAllocations: 2,
    allocations: [
      {
        id: 'a1', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full',
        daysInfo: '5/9',
        teamMembers: [
          { name: 'André Medeiros', role: 'EM' },
          { name: 'Bruno Costa', role: 'Tech Lead' },
          { name: 'Sarah Johnson', role: 'Designer' },
        ],
      },
      {
        id: 'a2', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full',
        daysInfo: '5/9',
        teamMembers: [
          { name: 'André Medeiros', role: 'EM' },
          { name: 'Bruno Costa', role: 'Tech Lead' },
          { name: 'Sarah Johnson', role: 'Designer' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Mia Thornton',
    role: 'Design',
    grade: 'Experienced',
    projectCount: 1,
    teamInfo: { em: 'André Medeiros', techLead: 'Bruno Costa' },
    externalAllocations: 4,
    allocations: [
      {
        id: 'a3', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 4, status: 'partial',
        daysInfo: '4/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
      {
        id: 'a4', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial',
        daysInfo: '4/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
      {
        id: 'a5', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 4, status: 'partial',
        daysInfo: '4/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
      {
        id: 'a6', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial',
        daysInfo: '4/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Rafael Souza',
    role: 'Frontend',
    grade: 'Intermediate',
    projectCount: 1,
    teamInfo: { em: 'André Medeiros', techLead: 'Bruno Costa', designer: 'Lisa Martinez' },
    externalAllocations: 4,
    allocations: [
      {
        id: 'a7', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 2), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
          { name: 'Sofia Esposito', role: 'Product' },
          { name: 'Lisa Martinez', role: 'Designer' },
        ],
      },
      {
        id: 'a8', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
          { name: 'Sofia Esposito', role: 'Product' },
          { name: 'Lisa Martinez', role: 'Designer' },
        ],
      },
      {
        id: 'a9', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
          { name: 'Sofia Esposito', role: 'Product' },
          { name: 'Lisa Martinez', role: 'Designer' },
        ],
      },
      {
        id: 'a10', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 21), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
          { name: 'Sofia Esposito', role: 'Product' },
          { name: 'Lisa Martinez', role: 'Designer' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Priya Nair',
    role: 'Backend',
    grade: 'Role Model',
    projectCount: 2,
    teamInfo: { em: 'Sofia Esposito', techLead: 'Tomás Alves' },
    externalAllocations: 3,
    hasWarning: true,
    // Change 3: specific days when this person is overloaded
    warningDays: [12, 13, 14, 15, 16],
    allocations: [
      {
        id: 'a11', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions',
        startDate: new Date(2024, 1, 8), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'reserved',
        daysInfo: '3/5',
        teamMembers: [
          { name: 'Ethan Voss', role: 'DevOps' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
      {
        id: 'a12', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'reserved', isPending: true,
        daysInfo: '3/5',
        teamMembers: [
          { name: 'Ethan Voss', role: 'DevOps' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
      {
        id: 'a13', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
        ],
      },
      {
        id: 'a14', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial',
        daysInfo: '5/5',
        teamMembers: [
          { name: 'Marcus Webb', role: 'QA' },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Clara Mendes',
    role: 'UX/UI',
    grade: 'Experienced',
    projectCount: 3,
    teamInfo: { em: 'Sofia Esposito', techLead: 'Ethan Voss', designer: 'Mia Thornton' },
    externalAllocations: 5,
    allocations: [
      {
        id: 'a15', projectId: 'p6', projectName: 'Vega Design System', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 2), hoursPerDay: 0, status: 'vacation',
        daysInfo: '5/5',
        teamMembers: [{ name: 'Mia Thornton', role: 'Designer' }],
      },
      {
        id: 'a16', projectId: 'p6', projectName: 'Vega Design System', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [{ name: 'Mia Thornton', role: 'Designer' }],
      },
      {
        id: 'a17', projectId: 'p7', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full',
        daysInfo: '5/10',
        teamMembers: [
          { name: 'Mia Thornton', role: 'Designer' },
          { name: 'Lucas Ferreira', role: 'Engineering' },
        ],
      },
      {
        id: 'a18', projectId: 'p8', projectName: 'Insight Dashboard', client: 'GlobalTech',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full',
        daysInfo: '5/8',
        teamMembers: [
          { name: 'Nadia Kowalski', role: 'Data Science' },
          { name: 'Ethan Voss', role: 'DevOps' },
        ],
      },
      {
        id: 'a19', projectId: 'p8', projectName: 'Insight Dashboard', client: 'GlobalTech',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial',
        daysInfo: '5/8',
        teamMembers: [
          { name: 'Nadia Kowalski', role: 'Data Science' },
          { name: 'Ethan Voss', role: 'DevOps' },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Jordan Blake',
    role: 'Engineering',
    grade: 'Intermediate',
    projectCount: 0,
    teamInfo: { em: 'André Medeiros', techLead: 'Bruno Costa' },
    externalAllocations: 2,
    isIdle: true,
    hasWarning: true,
    warningDays: [13],
    allocations: [
      {
        id: 'a20', projectId: 'p9', projectName: 'Internal Training', client: 'Internal',
        startDate: new Date(2024, 1, 13), endDate: new Date(2024, 1, 13), hoursPerDay: 0, status: 'vacation',
      },
    ],
  },
  {
    id: '7',
    name: 'Isabelle Roy',
    role: 'Marketing',
    grade: 'Rookie',
    projectCount: 0,
    teamInfo: { em: 'Marcus Webb' },
    externalAllocations: 1,
    isIdle: true,
    hasWarning: true,
    warningDays: [13],
    allocations: [
      {
        id: 'a21', projectId: 'p10', projectName: 'Brand Relaunch', client: 'Acme Corp',
        startDate: new Date(2024, 1, 13), endDate: new Date(2024, 1, 13), hoursPerDay: 0, status: 'vacation',
      },
    ],
  },
  {
    id: '8',
    name: 'Tomás Alves',
    role: 'Frontend',
    grade: 'Role Model',
    projectCount: 2,
    teamInfo: { em: 'Sofia Esposito', designer: 'Clara Mendes' },
    externalAllocations: 3,
    allocations: [
      {
        id: 'a22', projectId: 'p11', projectName: 'Forge Component Library', client: 'Nexus Solutions',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full',
        daysInfo: '7/7',
        teamMembers: [{ name: 'Priya Nair', role: 'Backend' }],
      },
      {
        id: 'a23', projectId: 'p12', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Marcus Webb', role: 'QA' },
        ],
      },
      {
        id: 'a24', projectId: 'p12', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Marcus Webb', role: 'QA' },
        ],
      },
    ],
  },
  {
    id: '9',
    name: 'Nadia Kowalski',
    role: 'Data Science',
    grade: 'Experienced',
    projectCount: 2,
    teamInfo: { em: 'André Medeiros', techLead: 'Ethan Voss', designer: 'Lisa Martinez' },
    externalAllocations: 3,
    allocations: [
      {
        id: 'a25', projectId: 'p13', projectName: 'Insight Dashboard', client: 'GlobalTech',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 7), hoursPerDay: 8, status: 'full',
        daysInfo: '5/8',
        teamMembers: [
          { name: 'Clara Mendes', role: 'UX/UI' },
          { name: 'Ethan Voss', role: 'DevOps' },
        ],
      },
      {
        id: 'a26', projectId: 'p13', projectName: 'Insight Dashboard', client: 'GlobalTech',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial',
        daysInfo: '5/8',
        teamMembers: [
          { name: 'Clara Mendes', role: 'UX/UI' },
          { name: 'Ethan Voss', role: 'DevOps' },
        ],
      },
      {
        id: 'a27', projectId: 'p14', projectName: 'Predictive Analytics Engine', client: 'Nexus Solutions',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full',
        daysInfo: '8/8',
        teamMembers: [{ name: 'Ethan Voss', role: 'DevOps' }],
      },
    ],
  },
  {
    id: '10',
    name: 'Ethan Voss',
    role: 'DevOps',
    grade: 'Intermediate',
    projectCount: 2,
    teamInfo: { em: 'Tomás Alves', techLead: 'Bruno Costa' },
    externalAllocations: 2,
    allocations: [
      {
        id: 'a28', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [{ name: 'Priya Nair', role: 'Backend' }],
      },
      {
        id: 'a29', projectId: 'p15', projectName: 'CI/CD Pipeline Rebuild', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'reserved', isPending: true,
        daysInfo: '8/10',
        teamMembers: [{ name: 'Bruno Costa', role: 'Tech Lead' }],
      },
      {
        id: 'a30', projectId: 'p15', projectName: 'CI/CD Pipeline Rebuild', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial',
        daysInfo: '8/10',
        teamMembers: [{ name: 'Bruno Costa', role: 'Tech Lead' }],
      },
    ],
  },
  {
    id: '11',
    name: 'Sofia Esposito',
    role: 'Product',
    grade: 'Role Model',
    projectCount: 3,
    teamInfo: { em: 'André Medeiros', techLead: 'Tomás Alves', designer: 'Mia Thornton' },
    externalAllocations: 3,
    allocations: [
      {
        id: 'a31', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial',
        daysInfo: '10/10',
        teamMembers: [
          { name: 'Mia Thornton', role: 'Designer' },
          { name: 'Lucas Ferreira', role: 'Engineering' },
        ],
      },
      {
        id: 'a32', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 7), hoursPerDay: 4, status: 'partial',
        daysInfo: '5/10',
        teamMembers: [
          { name: 'Rafael Souza', role: 'Frontend' },
          { name: 'Marcus Webb', role: 'QA' },
        ],
      },
      {
        id: 'a33', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full',
        daysInfo: '8/9',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
    ],
  },
  {
    id: '12',
    name: 'Marcus Webb',
    role: 'QA',
    grade: 'Experienced',
    projectCount: 2,
    teamInfo: { em: 'Sofia Esposito', techLead: 'Tomás Alves', designer: 'Clara Mendes' },
    externalAllocations: 4,
    allocations: [
      {
        id: 'a34', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 14), hoursPerDay: 8, status: 'full',
        daysInfo: '8/10',
        teamMembers: [
          { name: 'Rafael Souza', role: 'Frontend' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
      {
        id: 'a35', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [{ name: 'Priya Nair', role: 'Backend' }],
      },
      {
        id: 'a36', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full',
        daysInfo: '9/9',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
      {
        id: 'a37', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 0, status: 'vacation',
        daysInfo: '9/9',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
    ],
  },
  {
    id: '13',
    name: 'Anne Jaccobs',
    role: 'DevOps',
    grade: 'Rookie',
    projectCount: 2,
    teamInfo: { em: 'Sofia Esposito', techLead: 'Tomás Alves', designer: 'Clara Mendes' },
    externalAllocations: 4,
    allocations: [
      {
        id: 'a38', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech',
        startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 11), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [
          { name: 'Rafael Souza', role: 'Frontend' },
          { name: 'Sofia Esposito', role: 'Product' },
        ],
      },
      {
        id: 'a39', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp',
        startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full',
        daysInfo: '5/5',
        teamMembers: [{ name: 'Priya Nair', role: 'Backend' }],
      },
      {
        id: 'a40', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full',
        daysInfo: '8/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
      {
        id: 'a41', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp',
        startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 0, status: 'vacation',
        daysInfo: '8/8',
        teamMembers: [
          { name: 'Lucas Ferreira', role: 'Engineering' },
          { name: 'Tomás Alves', role: 'Frontend' },
        ],
      },
    ],
  },
];

export const holidays = [
  new Date(2024, 1, 14),
  new Date(2024, 1, 19),
];