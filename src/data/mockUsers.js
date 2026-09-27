export const INITIAL_USERS = [
  {
    id: "usr_1",
    name: "Alex Morgan",
    email: "alex.morgan@company.com",
    role: "Super Admin",
    department: "Engineering",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 234-5678",
    createdAt: "2024-01-15",
    lastActive: "2 mins ago",
    permissions: ["all_access", "user_manage", "billing", "system_config"]
  },
  {
    id: "usr_2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Admin",
    department: "Product",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 876-5432",
    createdAt: "2024-02-01",
    lastActive: "15 mins ago",
    permissions: ["user_manage", "content_edit", "reports"]
  },
  {
    id: "usr_3",
    name: "Marcus Vance",
    email: "marcus.vance@company.com",
    role: "Manager",
    department: "Sales",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 456-7890",
    createdAt: "2024-02-12",
    lastActive: "1 hour ago",
    permissions: ["team_manage", "reports"]
  },
  {
    id: "usr_4",
    name: "Elena Rostova",
    email: "elena.r@company.com",
    role: "Editor",
    department: "Marketing",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 987-6543",
    createdAt: "2024-03-05",
    lastActive: "3 days ago",
    permissions: ["content_edit"]
  },
  {
    id: "usr_5",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 345-6789",
    createdAt: "2024-03-18",
    lastActive: "Just now",
    permissions: ["user_manage", "system_config"]
  },
  {
    id: "usr_6",
    name: "Jessica Taylor",
    email: "j.taylor@company.com",
    role: "Viewer",
    department: "Human Resources",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 654-3210",
    createdAt: "2024-04-02",
    lastActive: "Never",
    permissions: ["view_only"]
  },
  {
    id: "usr_7",
    name: "Carlos Mendez",
    email: "carlos.m@company.com",
    role: "Manager",
    department: "Support",
    status: "Suspended",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 789-0123",
    createdAt: "2024-04-10",
    lastActive: "1 week ago",
    permissions: ["team_manage"]
  },
  {
    id: "usr_8",
    name: "Amara Nwosu",
    email: "amara.n@company.com",
    role: "Editor",
    department: "Design",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=250&q=80",
    phone: "+1 (555) 890-1234",
    createdAt: "2024-04-20",
    lastActive: "4 hours ago",
    permissions: ["content_edit"]
  }
];

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Support"
];

export const ROLES = [
  "Super Admin",
  "Admin",
  "Manager",
  "Editor",
  "Viewer"
];

export const STATUSES = [
  "Active",
  "Inactive",
  "Pending",
  "Suspended"
];
