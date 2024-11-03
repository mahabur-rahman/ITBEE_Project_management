// Define the type for a project
export interface ProjectType {
  id: number;
  name: string;
  description: string;
  budget: number;
  startDate: string; // You might want to use Date type if you're handling date objects
  endDate: string;   // Same here
  status: string;
}
