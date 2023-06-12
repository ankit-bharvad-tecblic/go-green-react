import { HomeIcon } from "../components/Icons/Icons";
import AreaMaster from "../view/AreaMaster/AreaMaster";
import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";
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
  {
    path: "/commodity-master",
    name: "Commodity master",
    icon: <HomeIcon color="inherit" />,
    component: CommodityMaster,
  },

  {
    path: "/commodity-type",
    name: "Commodity Type",
    icon: <HomeIcon color="inherit" />,
    component: CommodityType,
  },
  {
    path: "/commodity-grade",
    name: "Commodity grade",
    icon: <HomeIcon color="inherit" />,
    component: CommodityGrade,
  },
];

export default SidebarList;
