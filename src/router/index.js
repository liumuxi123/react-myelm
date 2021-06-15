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
          }
        ]
      }
    ]
  }
];
export default routers
