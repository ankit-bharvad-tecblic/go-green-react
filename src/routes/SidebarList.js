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

import SecurityAgencyMaster from "../view/SecurityAgencyMaster/SecurityAgencyMaster";
import SecurityGuardMaster from "../view/SecurityGuardMaster/SecurityGuardMaster";

import PageMaster from "../view/PageMaster/PageMaster";
import RoleMaster from "../view/Role Master/RoleMaster";
import RolePageAssignmentMaster from "../view/RolePageAssignmentMaster/RolePageAssignmentMaster";
import EarthquakeZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/EarthquakeZoneTypeMaster";
import InsuranceCompanyMaster from "../view/InsuranceCompanyMaster/InsuranceCompanyMaster";
import RegionMaster from "../view/RegionMaster/RegionMaster";

import StateMaster from "../view/StateMaster/StateMaster";
import UserMaster from "../view/UserMaster/UserMaster";
import WareHouseSubType from "../view/WareHouseSubTypeMaster/WareHouseSubType";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";
import WarehouseTypeMaster from "../view/WarehouseTypeMaster/WarehouseTypeMaster";
import BankCMLocationMaster from "../view/BankCMLocationMaster/BankCMLocationMaster";
//

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
    name: "Manage Locations",
    category: "location",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/manage-location/region-master",
        name: "Region Master",
        secondaryNavbar: true,
        component: RegionMaster,
      },
      {
        path: "/manage-location/state-master",
        name: "State Master",
        secondaryNavbar: true,
        component: StateMaster,
      },
      {
        path: "/manage-location/zone-master",
        name: "Zone Master",
        secondaryNavbar: true,
        component: ZoneMaster,
      },
      {
        path: "/manage-location/district-master",
        name: "District Master",
        secondaryNavbar: true,
        component: DistrictMaster,
      },
      {
        path: "/manage-location/area-master",
        name: "Area Master",
        secondaryNavbar: true,
        component: AreaMaster,
      },
    ],
  },
  {
    name: "Warehouse Master",
    category: "warehouse",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/warehouse-master/warehouse-type-master",
        name: "Warehouse Type Master",
        secondaryNavbar: true,
        component: WarehouseTypeMaster,
      },
      {
        path: "/warehouse-master/warehouse-sub-type-master",
        name: "Warehouse Sub Type Master",
        secondaryNavbar: true,
        component: WareHouseSubType,
      },
    ],
  },
  {
    name: "Bank Master",
    category: "bank",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/bank-master/bank-master",
        name: "Bank Master",
        secondaryNavbar: true,
        icon: <HomeIcon color="inherit" />,
        component: BankMaster,
      },
      {
        path: "/bank-master/bank-branch-master",
        name: "Bank Branch Master",
        secondaryNavbar: true,
        icon: <HomeIcon color="inherit" />,
        component: BankBranchMaster,
      },
      {
        path: "/bank-master/bank-cm-location-master",
        name: "Bank CM Location Master",
        secondaryNavbar: true,
        icon: <HomeIcon color="inherit" />,
        component: BankCMLocationMaster,
      },
    ],
  },
  // {
  //   path: "/user-master",
  //   name: "User Master",
  //   secondaryNavbar: false,
  //   icon: <HomeIcon color="inherit" />,
  //   component: UserMaster,
  // },
  {
    name: "Manage Insurance",
    category: "insurance",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/manage-insurance/insurance-company-master",
        name: "Insurance Company Master",
        secondaryNavbar: true,
        icon: <HomeIcon color="inherit" />,
        component: InsuranceCompanyMaster,
      },
      {
        path: "/manage-insurance/earthquake-zone-type-master",
        name: "Earthquake Zone Type Master",
        secondaryNavbar: true,
        icon: <HomeIcon color="inherit" />,
        component: EarthquakeZoneTypeMaster,
      },
    ],
  },

  {
    path: "/security-agency-master",
    name: "Security Agency Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: SecurityAgencyMaster,
  },
  {
    path: "/security-guard-master",
    name: "Security Guard Master",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: SecurityGuardMaster,
  },
  {
    name: "Manage Users",
    category: "role",
    state: "pageCollapse",
    icon: <CommunityIcon color="inherit" />,
    views: [
      {
        path: "/manage-users/user-master",
        name: "User Master",
        secondaryNavbar: true,

        component: UserMaster,
      },
      {
        path: "/manage-users/role-master",
        name: "Role Master",
        secondaryNavbar: true,
        component: RoleMaster,
      },
      {
        path: "/manage-users/page-master",
        name: "Page Master",
        secondaryNavbar: true,
        component: PageMaster,
      },
      {
        path: "/manage-users/role-page-assignment-master",
        name: "Role Page Assignment Master",
        secondaryNavbar: true,
        component: RolePageAssignmentMaster,
      },
    ],
  },
];

export default SidebarList;
