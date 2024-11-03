import { ProjectType } from "../interface/project.interface";

export const projects: ProjectType[] = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Redesign of the client web portal.",
    status: "Active",
    budget: "$120,000",
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    tasks: [
      {
        id: 1,
        name: "Design Mockups",
        description: "Create mockups for the new design.",
        status: "In Progress",
        priority: "High",
        dueDate: "2024-02-15",
        assignedUser: "John Doe",
      },
      {
        id: 2,
        name: "Develop Frontend",
        description: "Implement the frontend using React.",
        status: "Pending",
        priority: "High",
        dueDate: "2024-04-01",
        assignedUser: "Jane Smith",
      },
    ],
  },
  {
    id: 2,
    name: "Project D",
    description: "Project D description.",
    status: "Active",
    budget: "$67,106",
    startDate: "2024-07-01",
    endDate: "2025-11-01",
    tasks: [
      {
        id: 3,
        name: "Market Research",
        description: "Conduct market research for the product.",
        status: "Pending",
        priority: "Medium",
        dueDate: "2024-08-15",
        assignedUser: "Alice Johnson",
      },
      {
        id: 4,
        name: "Develop Backend",
        description: "Set up the backend API.",
        status: "Pending",
        priority: "High",
        dueDate: "2024-09-30",
        assignedUser: "Bob Brown",
      },
    ],
  },
  {
    id: 3,
    name: "Project E",
    description: "Project E description.",
    status: "Active",
    budget: "$114,294",
    startDate: "2024-09-01",
    endDate: "2025-12-01",
    tasks: [
      {
        id: 5,
        name: "Create User Stories",
        description: "Draft user stories for the application.",
        status: "Completed",
        priority: "Medium",
        dueDate: "2024-09-10",
        assignedUser: "Emily White",
      },
      {
        id: 6,
        name: "UI Testing",
        description: "Perform UI testing on the application.",
        status: "Pending",
        priority: "Low",
        dueDate: "2025-01-15",
        assignedUser: "Charlie Green",
      },
    ],
  },
  {
    id: 4,
    name: "Project F",
    description: "Project F description.",
    status: "Planning",
    budget: "$85,386",
    startDate: "2024-07-01",
    endDate: "2025-02-01",
    tasks: [
      {
        id: 7,
        name: "Finalize Requirements",
        description: "Finalize requirements with the stakeholders.",
        status: "Pending",
        priority: "High",
        dueDate: "2024-08-01",
        assignedUser: "David Black",
      },
    ],
  },
  {
    id: 5,
    name: "Project G",
    description: "Project G description.",
    status: "Planning",
    budget: "$136,531",
    startDate: "2024-10-01",
    endDate: "2025-05-01",
    tasks: [
      {
        id: 8,
        name: "Define Scope",
        description: "Define the project scope and objectives.",
        status: "Pending",
        priority: "Medium",
        dueDate: "2024-10-15",
        assignedUser: "Sarah Connor",
      },
    ],
  },
  {
    id: 6,
    name: "Project H",
    description: "Project H description.",
    status: "Planning",
    budget: "$112,547",
    startDate: "2024-10-01",
    endDate: "2025-04-01",
    tasks: [
      {
        id: 9,
        name: "Stakeholder Meeting",
        description: "Meet with stakeholders to gather requirements.",
        status: "Pending",
        priority: "High",
        dueDate: "2024-11-01",
        assignedUser: "Laura Croft",
      },
    ],
  },
];