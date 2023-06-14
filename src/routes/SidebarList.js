import { CommunityIcon, HomeIcon } from "../components/Icons/Icons";
import AreaMaster from "../view/AreaMaster/AreaMaster";

import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import BankMaster from "../view/BankMaster/BankMaster";

import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";

import Dashboard from "../view/Dashboard/Dashboard";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";

const SidebarList = [
  {
    path: "/",
    name: "Dashboard",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
  },
  {
    name: "Commodity Master",
    category: "commodity",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/commodity-master/commodity-master",
        name: "Commodity master",
        secondaryNavbar: true,
        component: CommodityMaster,
      },
      {
        path: "/commodity-master/commodity-type",
        name: "Commodity Type",
        secondaryNavbar: true,
        component: CommodityType,
      },
      {
        path: "/commodity-master/commodity-grade",
        name: "Commodity grade",
        secondaryNavbar: true,
        component: CommodityGrade,
      },
    ],
  },
  {
    name: "Location Master",
    category: "location",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/location-master/state-master",
        name: "State Master",
        secondaryNavbar: true,
        component: StateMaster,
      },
      {
        path: "/location-master/zone-master",
        name: "Zone Master",
        secondaryNavbar: true,
        component: ZoneMaster,
      },
      {
        path: "/location-master/district-master",
        name: "District Master",
        secondaryNavbar: true,
        component: DistrictMaster,
      },
      {
        path: "/location-master/area-master",
        name: "Area Master",
        secondaryNavbar: true,
        component: AreaMaster,
      },
    ],
  },
  {
    path: "/bank-master",
    name: "Bank Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: BankMaster,
  },
  {
    path: "/bank-branch-master",
    name: "Bank Branch Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: BankBranchMaster,
  },
];

export default SidebarList;
