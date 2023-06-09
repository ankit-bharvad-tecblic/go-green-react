import { Navigate } from "react-router-dom";
import Login from "../view/Auth/Login";
import { Suspense } from "react";
import Dashboard from "../view/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import AreaMaster from "../view/AreaMaster/AreaMaster";

const isAuth = false;

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate to={{ pathname: "/dashboard", state: { from: "" } }} />
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
    path: "/",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout varient={"fixed"} title={"Dashboard"}>
            <Dashboard />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/zone-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout varient={"fixed"} title={"Zone Master"}>
            <ZoneMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/state-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout varient={"fixed"} title={"Dashboard"}>
            <StateMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/district-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout varient={"fixed"} title={"Dashboard"}>
            <DistrictMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/area-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout varient={"fixed"} title={"Dashboard"}>
            <AreaMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
];

export default routes;
