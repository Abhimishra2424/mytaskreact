import Dashboard from "@material-ui/icons/Dashboard";
import CreateIcon from '@material-ui/icons/Create';
import CreateTask from "./views/CreateTask/CreateTask";
import TableList from "./views/TableList/TableList.js";
import DashboardPage from './views/Dashboard/Dashboard'
import CreateEmployee from "./views/CreateEmployee/CreateEmployee";
import AllEmployee from "./views/AllEmployee/AllEmployee";
import AssignTask from "./views/AssignTask/AssignTask";
import CreateNote from "./views/CreateNote/CreateNote";
import NoteList from "./views/NotesList/NoteList";


const dashboardRoutes = [
  {
    path: "/mytask/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
  },
  // {
  //   path: "/mytask/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  // },
  {
    path: "/mytask/tasklist",
    name: "All Task List",
    icon: "content_paste",
    component: TableList,
  },
  {
    path: "/mytask/employee/tasklist",
    name: "Assign Task",
    icon: "content_paste",
    component: AssignTask,
  },
  {
    path: "/mytask/employee/createNote",
    name: "Create Note",
    icon: "content_paste",
    component: CreateNote,
  },
  {
    path: "/mytask/employee/AllNotes",
    name: "Notes",
    icon: "content_paste",
    component: NoteList,
  },
  {
    path: "/mytask/createTask",
    name: "Create task",
    icon: CreateIcon,
    component: CreateTask,
  },
  {
    path: "/mytask/createEmployee",
    name: "Create Employee",
    icon: CreateIcon,
    component: CreateEmployee
  },
  {
    path: "/mytask/AllEmployee",
    name: "All Employee",
    icon: CreateIcon,
    component: AllEmployee
  }
];

export default dashboardRoutes;
