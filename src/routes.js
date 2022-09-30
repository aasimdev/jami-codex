/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Login from "views/Login";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Projects from "views/Projects/Listing";
import NewProjects from "views/Projects/NewProjects";
import EditProject from "views/Projects/EditProjects";
import EditRole from "views/Role/EditRole";
import Role from "views/Role/Listing";
import NewRole from "views/Role/NewRole";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Users from "views/Users/Listing";
import NewUser from "views/Users/NewUser";
import EditUser from "views/Users/EditUser";
import UserDetail from "views/Users/UserDetail";


var routes = [];
var isAdmin = localStorage.getItem('is_admin');

if (isAdmin == 1) {
  routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-chart-pie-36",
      component: Dashboard,
      layout: "/admin",
      visible: true
    },

    {
      path: "/role",
      name: "Roles",
      rtlName: "Roles",
      icon: "tim-icons icon-badge",
      component: Role,
      layout: "/admin",
      visible: true
    },
    {
      path: "/new-role",
      name: "New Role",
      rtlName: "New Role",
      icon: "tim-icons icon-badge",
      component: NewRole,
      layout: "/admin",
      visible: false
    },
    {
      path: "/edit-role",
      name: "Edit Role",
      rtlName: "Edit Role",
      icon: "tim-icons icon-badge",
      component: EditRole,
      layout: "/admin",
      visible: false
    },

    {
      path: "/projects",
      name: "Projects",
      rtlName: "Projects",
      icon: "tim-icons icon-app",
      component: Projects,
      layout: "/admin",
      visible: true
    },

    {
      path: "/new-project",
      name: "New Project",
      rtlName: "New Project",
      icon: "tim-icons icon-app",
      component: NewProjects,
      layout: "/admin",
      visible: false
    },
    {
      path: "/edit-project",
      name: "Edit Project",
      rtlName: "Edit Project",
      icon: "tim-icons icon-app",
      component: EditProject,
      layout: "/admin",
      visible: false
    },

    {
      path: "/users",
      name: "Users",
      rtlName: "Users",
      icon: "tim-icons icon-single-02",
      component: Users,
      layout: "/admin",
      visible: true
    },
    {
      path: "/user-detail/:id",
      name: "user-detail",
      rtlName: "Users",
      icon: "tim-icons icon-single-02",
      component: UserDetail,
      layout: "/admin",
      visible: false
    },

    {
      path: "/new-user",
      name: "New User",
      rtlName: "New User",
      icon: "tim-icons icon-app",
      component: NewUser,
      layout: "/admin",
      visible: false
    },
    {
      path: "/edit-user",
      name: "Edit User",
      rtlName: "Edit User",
      icon: "tim-icons icon-app",
      component: EditUser,
      layout: "/admin",
      visible: false
    },
    {
      path: "/icons",
      name: "Icons",
      rtlName: "الرموز",
      icon: "tim-icons icon-atom",
      component: Icons,
      layout: "/admin",
      visible: false
    },
    {
      path: "/map",
      name: "Map",
      rtlName: "خرائط",
      icon: "tim-icons icon-pin",
      component: Map,
      layout: "/admin",
      visible: false
    },
    {
      path: "/notifications",
      name: "Notifications",
      rtlName: "إخطارات",
      icon: "tim-icons icon-bell-55",
      component: Notifications,
      layout: "/admin",
      visible: false
    },
    {
      path: "/user-profile",
      name: "User Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02",
      component: UserProfile,
      layout: "/admin",
      visible: false
    },
    {
      path: "/tables",
      name: "Table List",
      rtlName: "قائمة الجدول",
      icon: "tim-icons icon-puzzle-10",
      component: TableList,
      layout: "/admin",
      visible: false
    },
    {
      path: "/typography",
      name: "Typography",
      rtlName: "طباعة",
      icon: "tim-icons icon-align-center",
      component: Typography,
      layout: "/admin",
      visible: false
    },
    {
      path: "/rtl-support",
      name: "RTL Support",
      rtlName: "ار تي ال",
      icon: "tim-icons icon-world",
      component: Rtl,
      layout: "/rtl"
    }
  ];
} else {
  routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: "tim-icons icon-chart-pie-36",
      component: Dashboard,
      layout: "/user",
      visible: true
    },

    {
      path: "/projects",
      name: "Projects",
      rtlName: "Projects",
      icon: "tim-icons icon-app",
      component: Projects,
      layout: "/user",
      visible: true
    }
  ];
}


export default routes;
