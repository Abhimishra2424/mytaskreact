import Dashboard from "@material-ui/icons/Dashboard";
import CreateIcon from '@material-ui/icons/Create';
import CreateTask from "./views/CreateTask/CreateTask";
import TableList from "./views/TableList/TableList.js";
import DashboardPage from './views/Dashboard/Dashboard'
import CreateEmployee from "./views/CreateEmployee/CreateEmployee";
import AllEmployee from "./views/AllEmployee/AllEmployee";
import AssignTask from "./views/AssignTask/AssignTask";


const dashboardRoutes = [
  {
    path: "/mytask/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    element: <DashboardPage />,
  },
  // {
  //   path: "/mytask/user",
  //   name: "User Profile",
  //   icon: Person,
  //   element: UserProfile,
  // },
  {
    path: "/mytask/tasklist",
    name: "All Task List",
    icon: "content_paste",
    element: <TableList />,
  },
  {
    path: "/mytask/employee/tasklist",
    name: "Assign Task",
    icon: "content_paste",
    element: <AssignTask />,
  },
  {
    path: "/mytask/createTask",
    name: "Create task",
    icon: CreateIcon,
    element: <CreateTask  />,
  },
  {
    path: "/mytask/createEmployee",
    name: "Create Employee",
    icon: CreateIcon,
    element: <CreateEmployee />
  },
  {
    path: "/mytask/AllEmployee",
    name: "All Employee",
    icon: CreateIcon,
    component: <AllEmployee />
  }
];

export default dashboardRoutes;
