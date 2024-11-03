export interface Project {
    id: number;
    name: string;
    description: string;
    budget: string;
    startDate: string;
    endDate: string;
    status: "Active" | "Planning";
  }
  