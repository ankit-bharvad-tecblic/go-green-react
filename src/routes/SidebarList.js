import { HomeIcon } from "../components/Icons/Icons";
import AreaMaster from "../view/AreaMaster/AreaMaster";
import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import BankMaster from "../view/BankMaster/BankMaster";
import Dashboard from "../view/Dashboard/Dashboard";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";

const SidebarList = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
  },
  {
    path: "/zone-master",
    name: "Zone Master",
    icon: <HomeIcon color="inherit" />,
    component: ZoneMaster,
  },
  {
    path: "/bank-master",
    name: "Bank Master",
    icon: <HomeIcon color="inherit" />,
    component: BankMaster,
  },
  {
    path: "/bank-branch-master",
    name: "Bank Branch Master",
    icon: <HomeIcon color="inherit" />,
    component: BankBranchMaster,
  },
  {
    path: "/state-master",
    name: "State Master",
    icon: <HomeIcon color="inherit" />,
    component: StateMaster,
  },
  {
    path: "/district-master",
    name: "District Master",
    icon: <HomeIcon color="inherit" />,
    component: DistrictMaster,
  },
  {
    path: "/area-master",
    name: "Area Master",
    icon: <HomeIcon color="inherit" />,
    component: AreaMaster,
  },
];

export default SidebarList;
