import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CreateIcon from '@material-ui/icons/Create';
import CreateTask from "./views/CreateTask/CreateTask";
// core components/views for Admin layout
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import DashboardPage from './views/Dashboard/Dashboard'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
  },
  {
    path: "/tasklist",
    name: "Task List",
    icon: "content_paste",
    component: TableList,
  },
  {
    path: "/createTask",
    name: "Create task",
    icon: CreateIcon,
    component: CreateTask,
  },

];

export default dashboardRoutes;