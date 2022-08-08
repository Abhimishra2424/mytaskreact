import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import CreateIcon from '@material-ui/icons/Create';
import CreateTask from "./views/CreateTask/CreateTask";
// core components/views for Admin layout
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import DashboardPage from './views/Dashboard/Dashboard'
import CreateEmployee from "./views/CreateEmployee/CreateEmployee";

const company = localStorage.getItem('company')
console.log(company)

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
    name: "Task List",
    icon: "content_paste",
    component: TableList,
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
];

export default dashboardRoutes;
