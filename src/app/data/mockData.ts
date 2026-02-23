import { TeamMember } from '../types/allocation';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Lucas Ferreira',
    role: 'Engineering',
    grade: 'Rookie',
    projectCount: 2,
    allocations: [
      { id: 'a1', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full' },
      { id: 'a2', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full' },
    ],
  },
  {
    id: '2',
    name: 'Mia Thornton',
    role: 'Design',
    grade: 'Experienced',
    projectCount: 1,
    allocations: [
      { id: 'a3', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 4, status: 'partial' },
      { id: 'a4', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial' },
      { id: 'a5', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 4, status: 'partial' },
      { id: 'a6', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial' },
    ],
  },
  {
    id: '3',
    name: 'Rafael Souza',
    role: 'Frontend',
    grade: 'Intermediate',
    projectCount: 1,
    allocations: [
      { id: 'a7', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 2), hoursPerDay: 8, status: 'full' },
      { id: 'a8', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full' },
      { id: 'a9', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full' },
      { id: 'a10', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 21), hoursPerDay: 8, status: 'full' },
    ],
  },
  {
    id: '4',
    name: 'Priya Nair',
    role: 'Backend',
    grade: 'Role Model',
    projectCount: 2,
    allocations: [
      { id: 'a11', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions', startDate: new Date(2024, 1, 8), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'reserved' },
      { id: 'a12', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'reserved', isPending: true },
      { id: 'a13', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full' },
      { id: 'a14', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial' },
    ],
  },
  {
    id: '5',
    name: 'Clara Mendes',
    role: 'UX/UI',
    grade: 'Experienced',
    projectCount: 3,
    allocations: [
      { id: 'a15', projectId: 'p6', projectName: 'Vega Design System', client: 'TechStart Inc', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 2), hoursPerDay: 0, status: 'vacation' },
      { id: 'a16', projectId: 'p6', projectName: 'Vega Design System', client: 'TechStart Inc', startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full' },
      { id: 'a17', projectId: 'p7', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full' },
      { id: 'a18', projectId: 'p8', projectName: 'Insight Dashboard', client: 'GlobalTech', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full' },
      { id: 'a19', projectId: 'p8', projectName: 'Insight Dashboard', client: 'GlobalTech', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial' },
    ],
  },
  {
    id: '6',
    name: 'Jordan Blake',
    role: 'Engineering',
    grade: 'Intermediate',
    projectCount: 0,
    allocations: [
      { id: 'a20', projectId: 'p9', projectName: 'Internal Training', client: 'Internal', startDate: new Date(2024, 1, 13), endDate: new Date(2024, 1, 13), hoursPerDay: 0, status: 'vacation' },
    ],
  },
  {
    id: '7',
    name: 'Isabelle Roy',
    role: 'Marketing',
    grade: 'Rookie',
    projectCount: 0,
    allocations: [
      { id: 'a21', projectId: 'p10', projectName: 'Brand Relaunch', client: 'Acme Corp', startDate: new Date(2024, 1, 13), endDate: new Date(2024, 1, 13), hoursPerDay: 0, status: 'vacation' },
    ],
  },
  {
    id: '8',
    name: 'Tomás Alves',
    role: 'Frontend',
    grade: 'Role Model',
    projectCount: 2,
    allocations: [
      { id: 'a22', projectId: 'p11', projectName: 'Forge Component Library', client: 'Nexus Solutions', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full' },
      { id: 'a23', projectId: 'p12', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full' },
      { id: 'a24', projectId: 'p12', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full' },
    ],
  },
  {
    id: '9',
    name: 'Nadia Kowalski',
    role: 'Data Science',
    grade: 'Experienced',
    projectCount: 2,
    allocations: [
      { id: 'a25', projectId: 'p13', projectName: 'Insight Dashboard', client: 'GlobalTech', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 7), hoursPerDay: 8, status: 'full' },
      { id: 'a26', projectId: 'p13', projectName: 'Insight Dashboard', client: 'GlobalTech', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial' },
      { id: 'a27', projectId: 'p14', projectName: 'Predictive Analytics Engine', client: 'Nexus Solutions', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full' },
    ],
  },
  {
    id: '10',
    name: 'Ethan Voss',
    role: 'DevOps',
    grade: 'Intermediate',
    projectCount: 2,
    allocations: [
      { id: 'a28', projectId: 'p4', projectName: 'Stratos Migration', client: 'Nexus Solutions', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 9), hoursPerDay: 8, status: 'full' },
      { id: 'a29', projectId: 'p15', projectName: 'CI/CD Pipeline Rebuild', client: 'TechStart Inc', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'reserved', isPending: true },
      { id: 'a30', projectId: 'p15', projectName: 'CI/CD Pipeline Rebuild', client: 'TechStart Inc', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 4, status: 'partial' },
    ],
  },
  {
    id: '11',
    name: 'Sofia Esposito',
    role: 'Product',
    grade: 'Role Model',
    projectCount: 3,
    allocations: [
      { id: 'a31', projectId: 'p2', projectName: 'Pulse Mobile App', client: 'TechStart Inc', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 16), hoursPerDay: 4, status: 'partial' },
      { id: 'a32', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 1), endDate: new Date(2024, 1, 7), hoursPerDay: 4, status: 'partial' },
      { id: 'a33', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 29), hoursPerDay: 8, status: 'full' },
    ],
  },
  {
    id: '12',
    name: 'Marcus Webb',
    role: 'QA',
    grade: 'Experienced',
    projectCount: 2,
    allocations: [
      { id: 'a34', projectId: 'p3', projectName: 'Orbit Commerce', client: 'GlobalTech', startDate: new Date(2024, 1, 5), endDate: new Date(2024, 1, 14), hoursPerDay: 8, status: 'full' },
      { id: 'a35', projectId: 'p5', projectName: 'Helix API', client: 'Acme Corp', startDate: new Date(2024, 1, 12), endDate: new Date(2024, 1, 16), hoursPerDay: 8, status: 'full' },
      { id: 'a36', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 19), endDate: new Date(2024, 1, 23), hoursPerDay: 8, status: 'full' },
      { id: 'a37', projectId: 'p1', projectName: 'Nexus Platform', client: 'Acme Corp', startDate: new Date(2024, 1, 26), endDate: new Date(2024, 1, 29), hoursPerDay: 0, status: 'vacation' },
    ],
  },
];

export const holidays = [
  new Date(2024, 1, 14),
  new Date(2024, 1, 19),
];