export type ViewMode = 'monthly' | 'quarterly' | 'annual';

export type AllocationStatus = 'full' | 'partial' | 'vacation' | 'weekend' | 'reserved';

export interface Allocation {
  id: string;
  projectId: string;
  projectName: string;
  client?: string;
  startDate: Date;
  endDate: Date;
  hoursPerDay: number;
  status: AllocationStatus;
  isPending?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  grade?: string;
  avatar?: string;
  projectCount: number;
  allocations: Allocation[];
  hasWarning?: boolean;
  isIdle?: boolean;
}

export interface AICandidate {
  id: string;
  name: string;
  role: string;
  compatibilityScore: number;
  reasoning: string;
  availabilityConflicts: string[];
}

export interface FilterOptions {
  job: string;
  project: string;
  timezone: string;
  jobGrade: string;
  deliveryUnit: string;
  office: string;
  company: string;
  talentHubs: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}