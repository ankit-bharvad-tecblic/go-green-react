import { Navigate } from "react-router-dom";
import Login from "../view/Auth/Login";
import { Suspense } from "react";
import Dashboard from "../view/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import AreaMaster from "../view/AreaMaster/AreaMaster";
import { localStorageService } from "../services/localStorge.service";
import ForgotPassword from "../view/Auth/ForgotPassword";
import ChangePassword from "../view/Auth/ChangePassword";
import BankMaster from "../view/BankMaster/BankMaster";
import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";
import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CircleComponent from "../view/Circlecomponent";
import NotFound from "../view/NotFound/NotFound";
import PageMaster from "../view/PageMaster/PageMaster";
import UserMaster from "../view/UserMaster/UserMaster";
import RoleMaster from "../view/Role Master/RoleMaster";
import RolePageAssignmentMaster from "../view/RolePageAssignmentMaster/RolePageAssignmentMaster";
import CommodityVariety from "../view/CommodityVarietyMaster/CommodityVariety";
import WareHouseSubType from "../view/WareHouseSubTypeMaster/WareHouseSubType";
import RegionMaster from "../view/RegionMaster/RegionMaster";
import InsuranceCompanyMaster from "../view/InsuranceCompanyMaster/InsuranceCompanyMaster";
import EarthquakeZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/EarthquakeZoneTypeMaster";

import SecurityAgencyMaster from "../view/SecurityAgencyMaster/SecurityAgencyMaster";
import SecurityGuardMaster from "../view/SecurityGuardMaster/SecurityGuardMaster";
import WarehouseTypeMaster from "../view/WarehouseTypeMaster/WarehouseTypeMaster";
import FormDesign from "../view/FormDesign";
import AddEditFormCommodityMaster from "../view/CommodityMaster/AddEditFormCommodityMaster";
import AddEditFormCommodityType from "../view/CommodityTypeMaster/AddEditFormCommodityType";
import AddEditZoneMaster from "../view/ZoneMaster/AddEditZoneMaster";
import AddEditFormCommodityGrade from "../view/CommodityGrade/AddEditCommodityGrade";
import AddEditFormCommodityVariety from "../view/CommodityVarietyMaster/AddEditFormCommodityVariety";
import AddEditFormArea from "../view/AreaMaster/AddEditAreaMaster";
import AddEditFormRegionMaster from "../view/RegionMaster/AddEditFormRegionMaster";
import AddEditFormDistrictMaster from "../view/DistrictMaster/AddEditDistrictMaster";
import AddEditFormInsuranceCompanyMaster from "../view/InsuranceCompanyMaster/AddEditFormInsuranceCompanyMaster";
import AddEditFormSecurityAgencyMaster from "../view/SecurityAgencyMaster/AddEditFormSecurityAgencyMaster";
import AddEditSecurityGuardMaster from "../view/SecurityGuardMaster/AddEditSecurityGuardMaster";
import AddEditFormEarthQuackZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/AddEditFormEarthQuackZoneTypeMaster";
import AddEditPageMaster from "../view/PageMaster/AddEditPageMaster";
import AddEditFormBankMaster from "../view/BankMaster/AddEditFormBankMaster";
import AddEditFormBankBranchMaster from "../view/BankBranchMaster/AddEditFormBankBranchMaster";
import AddEditFormWareHouseTypeMaster from "../view/WarehouseTypeMaster/AddEditFormWareHouseTypeMaster";
import AddEditFormWareHouseSubTypeMaster from "../view/WareHouseSubTypeMaster/AddEditFormWareHouseSubTypeMaster";
import AddEditFormUserMaster from "../view/UserMaster/AddEditFormUserMaster";
import EmployeeMaster from "../view/EmployeeMaster/EmployeeMaster";
import DepartmentMaster from "../view/DepartmentMaster/DepartmentMaster";
import HiringProposalMaster from "../view/HiringProposalMaster/HiringProposalMaster";

const isAuth = localStorageService.get("GG_ADMIN")?.userDetails?.token.access;

/// let isAuth = localStorageService.get("GG_ADMIN"); d

const headerType = "absolute";

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate to={{ pathname: "/", state: { from: "" } }} />
  ) : (
    children
  );
};

const ProtectedRoutes = ({ children }) => {
  return isAuth ? (
    children
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: "" } }} />
  );
};

const routes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPassword />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePassword />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Dashboard"}>
            <Dashboard />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/location-master",
    children: [
      {
        path: "zone-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Zone Master"}>
                <ZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/zone-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Zone Master"}>
                <AddEditZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/zone-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Zone Master"}>
                <AddEditZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "region-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <RegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/region-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <AddEditFormRegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/region-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <AddEditFormRegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "state-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"State Master"}>
                <StateMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "district-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <DistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/district-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <AddEditFormDistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/district-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <AddEditFormDistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "area-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AreaMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "area-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AreaMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/area-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AddEditFormArea />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/area-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AddEditFormArea />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/role-master",
    children: [
      {
        path: "role-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Role Master"}>
                <RoleMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "role-page-assignment-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Role Page Assignment Master"}
              >
                <RolePageAssignmentMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/warehouse-master",
    children: [
      {
        path: "warehouse-sub-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse sub type master"}>
                <WareHouseSubType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-sub-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseSubTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-sub-type-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseSubTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <WarehouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-type-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/page-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Page Master"}>
            <PageMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/page-master/edit/page-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Page Master"}>
            <AddEditPageMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employee-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Employee Master"}>
            <EmployeeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/department-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Department Master"}>
            <DepartmentMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/hiring-proposal-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Hiring Proposal Master"}>
            <HiringProposalMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/user-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"User Master"}>
            <UserMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/user-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"User Master"}>
            <AddEditFormUserMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/user-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"User master"}>
            <AddEditFormUserMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/bank-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank Master"}>
            <BankMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/bank-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank Master"}>
            <AddEditFormBankMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/bank-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank master"}>
            <AddEditFormBankMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/bank-branch-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank Branch Master"}>
            <BankBranchMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "add/bank-branch-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank Branch Master"}>
            <AddEditFormBankBranchMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/bank-branch-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Bank Branch Master"}>
            <AddEditFormBankBranchMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/insurance-company-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Insurance Company Master"}>
            <InsuranceCompanyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "add/insurance-company-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Insurance Company Master"}>
            <AddEditFormInsuranceCompanyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/insurance-company-master/edit/insurance-company-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Insurance Company Master"}>
            <AddEditFormInsuranceCompanyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/security-guard-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Master"}>
            <SecurityGuardMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-guard-master/edit/security-guard-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Master"}>
            <AddEditSecurityGuardMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/earthquake-zone-type-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Earthquake Zone Type Master"}>
            <EarthquakeZoneTypeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/earthquake-zone-type-master/edit/security-guard-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Earthquake Zone Type Master"}>
            <AddEditFormEarthQuackZoneTypeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/commodity-master",
    children: [
      {
        path: "commodity-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <CommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <AddEditFormCommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <AddEditFormCommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "commodity-type",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <CommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "add/commodity-type",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <AddEditFormCommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-type/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <AddEditFormCommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "commodity-grade",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade"}>
                <CommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-grade",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade"}>
                <AddEditFormCommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-grade/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade"}>
                <AddEditFormCommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "commodity-variety",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <CommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-variety",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <AddEditFormCommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-variety/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <AddEditFormCommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/security-agency-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Agency Master"}>
            <SecurityAgencyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-agency-master/edit/security-agency-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Agency Master"}>
            <AddEditFormSecurityAgencyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  // for tasting purpose only
  {
    path: "/testing",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Area Master"}>
            <CircleComponent />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "*",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Not Found"}>
            <NotFound />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
];

export default routes;
