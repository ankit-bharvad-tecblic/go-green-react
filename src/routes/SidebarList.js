import { CommunityIcon, HomeIcon } from "../components/Icons/Icons";
import AreaMaster from "../view/AreaMaster/AreaMaster";

import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import BankMaster from "../view/BankMaster/BankMaster";

import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";
import CommodityVariety from "../view/CommodityVarietyMaster/CommodityVariety";

import Dashboard from "../view/Dashboard/Dashboard";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import PageMaster from "../view/PageMaster/PageMaster";
import RoleMaster from "../view/Role Master/RoleMaster";
import RolePageAssignmentMaster from "../view/RolePageAssignmentMaster/RolePageAssignmentMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import UserMaster from "../view/UserMaster/UserMaster";
import WareHouseSubType from "../view/WareHouseSubTypeMaster/WareHouseSubType";
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
      {
        path: "/commodity-master/commodity-variety",
        name: "Commodity Variety",
        secondaryNavbar: true,
        component: CommodityVariety,
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
    name: "Role Master",
    category: "role",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/role-master/role-master",
        name: "Role Master",
        secondaryNavbar: true,
        component: RoleMaster,
      },
      {
        path: "/role-master/role-page-assignment-master",
        name: "Role Page Assignment Master",
        secondaryNavbar: true,
        component: RolePageAssignmentMaster,
      },
    ],
  },
  {
    path: "/user-master",
    name: "User Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: UserMaster,
  },
  {
    path: "/page-master",
    name: "Page Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: PageMaster,
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
  {
    path: "/warehouse-sub-type-master",
    name: "Warehouse Sub Type Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: WareHouseSubType,
  },
];

export default SidebarList;
