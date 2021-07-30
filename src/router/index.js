import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import BlankLayout from "../layouts/BlankLayout";

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const HomeComponent = lazy(() => import("../pages/home/home.jsx"));
const LoginComponent = lazy(() => import("../pages/login/login.jsx"));
const ProfileComponent = lazy(() => import("../pages/profile/profile.jsx"));
const CityComponent = lazy(() => import("../pages/city/city.jsx"));
const MsiteComponent = lazy(() => import("../pages/msite/msite.jsx"));
const SearchComponent = lazy(() => import("../pages/search/search.jsx"));
const OrderComponent = lazy(() => import("../pages/order/order.jsx"));
const FoodComponent = lazy(() => import("../pages/food/food.jsx"));

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
            render: () => <Redirect to={"/home"} />
          },
          {
            path: "/home",
            component: SuspenseComponent(HomeComponent),
            // routes: [
            //   {
            //     path: "/recommend/:id",
            //     component: SuspenseComponent(AlbumComponent)
            //   }
            // ]
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
        ]
      }
    ]
  }
];
export default routers
