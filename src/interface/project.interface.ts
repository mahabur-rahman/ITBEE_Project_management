export interface TaskType {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedUser: string;
}

export interface ProjectType {
  id: number;
  name: string;
  description: string;
  status: string;
  budget: string;
  startDate: string;
  endDate: string;
  tasks: TaskType[];
}
