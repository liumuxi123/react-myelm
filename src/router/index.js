import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import BlankLayout from "../layouts/BlankLayout";

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const HomeComponent = lazy(() => import("../pages/home/home.jsx"));
const LoginComponent = lazy(() => import("../pages/login/login.jsx"));
const ProfileComponent = lazy(() => import("../pages/profile/profile.jsx"));
const ProfileInfoComponent = lazy(() =>import("../pages/profile/children/info/info.jsx"));
const ProfileBalanceComponent = lazy(() =>import("../pages/profile/children/balance/balance.jsx"));
const ProfileBenefitComponent = lazy(() =>import("../pages/profile/children/benefit/benefit.jsx"));
const ProfilePointsComponent = lazy(() =>import("../pages/profile/children/points/points.jsx"));
const ProfileVIPComponent = lazy(() =>import("../pages/profile/children/vipcard/vipcard.jsx"));
const ProfileServiceComponent = lazy(() =>import("../pages/profile/children/service/service.jsx"));
const CityComponent = lazy(() => import("../pages/city/city.jsx"));
const MsiteComponent = lazy(() => import("../pages/msite/msite.jsx"));
const SearchComponent = lazy(() => import("../pages/search/search.jsx"));
const OrderComponent = lazy(() => import("../pages/order/order.jsx"));
const FoodComponent = lazy(() => import("../pages/food/food.jsx"));
const ShopComponent = lazy(() => import("../pages/shop/shop.jsx"));

const routers = [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: () => <Redirect to={"/home"} />,
          },
          {
            path: "/home",
            component: SuspenseComponent(HomeComponent),
          },
          {
            path: "/login",
            component: SuspenseComponent(LoginComponent),
          },
          {
            path: "/profile",
            component: SuspenseComponent(ProfileComponent),
          },
          {
            path: "/profile-info",
            component: SuspenseComponent(ProfileInfoComponent),
          },
          {
            path: "/balance",
            component: SuspenseComponent(ProfileBalanceComponent),
          },
          {
            path: "/benefit",
            component: SuspenseComponent(ProfileBenefitComponent),
          },
          {
            path: "/points",
            component: SuspenseComponent(ProfilePointsComponent),
          },
          {
            path: "/vipcard",
            component: SuspenseComponent(ProfileVIPComponent),
          },
          {
            path: "/service",
            component: SuspenseComponent(ProfileServiceComponent),
          },
          {
            path: "/city/:id",
            component: SuspenseComponent(CityComponent),
          },
          {
            path: "/msite/:geohash",
            component: SuspenseComponent(MsiteComponent),
          },
          {
            path: "/food",
            component: SuspenseComponent(FoodComponent),
          },
          {
            path: "/search/:geohash",
            component: SuspenseComponent(SearchComponent),
          },
          {
            path: "/order/:geohash",
            component: SuspenseComponent(OrderComponent),
          },
          {
            path: "/shop",
            component: SuspenseComponent(ShopComponent),
          },
        ],
      },
    ],
  },
];
export default routers;
