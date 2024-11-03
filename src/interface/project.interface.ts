// TaskType and ProjectType remain the same
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

// TaskFormValues should reflect the structure used in your form
export interface TaskFormValues {
  project: {
    name: string;
    description: string;
    status: string;
    budget: string;
    startDate: string;
    endDate: string;
  };
  task: {
    name: string;
    description: string;
    status: string;
    dueDate: string; 
    assignedUser: string;
    priority: string;
  };
}
