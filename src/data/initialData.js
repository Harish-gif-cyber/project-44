// Initial mock data loaded on first launch if LocalStorage is empty.
// Demonstrates ES6+ Object manipulation, const declaration, and template literals.

export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Complete Week 04 React Minor Project",
    description: "Build both To-Do and Notes applications implementing all core and bonus features.",
    completed: true,
    category: "Learning",
    priority: "High",
    dueDate: "2026-10-23",
    createdAt: "2026-10-20T10:00:00.000Z",
    completedAt: "2026-10-22T14:30:00.000Z"
  },
  {
    id: "task-2",
    title: "Review React Hooks (useState & useEffect)",
    description: "Practice side effects with localStorage and custom state management workflows.",
    completed: false,
    category: "Learning",
    priority: "High",
    dueDate: "2026-10-24",
    createdAt: "2026-10-21T09:15:00.000Z",
    completedAt: null
  },
  {
    id: "task-3",
    title: "Prepare GitHub Repository & Documentation",
    description: "Write comprehensive README with feature highlights, code concepts, and setup commands.",
    completed: false,
    category: "Work",
    priority: "Medium",
    dueDate: "2026-10-25",
    createdAt: "2026-10-21T11:45:00.000Z",
    completedAt: null
  },
  {
    id: "task-4",
    title: "Team Standup Meeting",
    description: "Discuss weekly sprint progress, blockers, and upcoming milestone deliverables.",
    completed: true,
    category: "Work",
    priority: "Low",
    dueDate: "2026-10-22",
    createdAt: "2026-10-22T08:00:00.000Z",
    completedAt: "2026-10-22T09:30:00.000Z"
  },
  {
    id: "task-5",
    title: "Morning 30-min Jog & Stretching",
    description: "Stay energetic and active before diving into coding sessions.",
    completed: false,
    category: "Personal",
    priority: "Low",
    dueDate: "2026-10-23",
    createdAt: "2026-10-22T06:30:00.000Z",
    completedAt: null
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "React Fundamental Principles",
    content: "Components are the building blocks of React UIs. Props allow data passing downwards, while useState manages local interactive state. useEffect handles side effects such as data synchronization with LocalStorage.",
    category: "Study",
    color: "#e0f2fe", // Light sky blue
    pinned: true,
    createdAt: "2026-10-20T11:30:00.000Z",
    updatedAt: "2026-10-21T16:00:00.000Z"
  },
  {
    id: "note-2",
    title: "ES6+ Modern JavaScript Best Practices",
    content: "Key techniques to use:\n• Arrow functions for concise event handlers\n• Array methods like .map(), .filter(), and .find()\n• Object & Array destructuring for clean props\n• Spread operator (...) for immutable state updates",
    category: "Study",
    color: "#fef3c7", // Amber pastel
    pinned: true,
    createdAt: "2026-10-21T14:10:00.000Z",
    updatedAt: "2026-10-21T15:20:00.000Z"
  },
  {
    id: "note-3",
    title: "App Idea: Smart Habit Tracker",
    content: "Create a minimalist habit tracking dashboard with streak analytics, weekly completion heatmap, and motivational reminders.",
    category: "Ideas",
    color: "#dcfce7", // Emerald pastel
    pinned: false,
    createdAt: "2026-10-22T08:20:00.000Z",
    updatedAt: "2026-10-22T08:20:00.000Z"
  },
  {
    id: "note-4",
    title: "Weekly Grocery & Supplies List",
    content: "1. Fresh Fruits: Apples, Bananas, Blueberries\n2. Oats and Almond Milk\n3. Green Tea & Dark Chocolate\n4. Coffee beans (Medium Roast)",
    category: "Personal",
    color: "#fce7f3", // Pink pastel
    pinned: false,
    createdAt: "2026-10-22T10:00:00.000Z",
    updatedAt: "2026-10-22T10:00:00.000Z"
  }
];

export const TASK_CATEGORIES = ["All", "Work", "Learning", "Personal", "Health", "Other"];

export const NOTE_CATEGORIES = ["All", "Study", "Work", "Ideas", "Personal", "Other"];

export const NOTE_COLORS = [
  { name: "Default White", value: "#ffffff", border: "#e2e8f0" },
  { name: "Sky Blue", value: "#e0f2fe", border: "#bae6fd" },
  { name: "Emerald Green", value: "#dcfce7", border: "#bbf7d0" },
  { name: "Amber Yellow", value: "#fef3c7", border: "#fde68a" },
  { name: "Rose Pink", value: "#fce7f3", border: "#fbcfe8" },
  { name: "Purple Lavender", value: "#f3e8ff", border: "#e9d5ff" }
];
