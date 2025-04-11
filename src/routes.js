import {
  CartIcon,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  StatsIcon,
} from "components/Icons/Icons";
import SignInBasic from "views/Authentication/SignIn/SignInBasic.js";
import LockBasic from "views/Authentication/Lock/LockBasic.js";
import LockCover from "views/Authentication/Lock/LockCover.js";
import LockIllustration from "views/Authentication/Lock/LockIllustration.js";
import ResetBasic from "views/Authentication/Reset/ResetBasic.js";
import VerificationBasic from "views/Authentication/Verification/VerificationBasic.js";
import VerificationCover from "views/Authentication/Verification/VerificationCover.js";
import VerificationIllustration from "views/Authentication/Verification/VerificationIllustration.js";
import Default from "views/Dashboard/Default.js";
import Billing from "views/Pages/Account/Billing.js";
import Invoice from "views/Pages/Account/Invoice.js";
import Settings from "views/Pages/Settings/Settings.js";
import Pricing from "views/Pages/Pricing.js";
import Overview from "views/Pages/Profile/Overview.js";
import Projects from "views/Pages/Profile/Projects.js";
import Teams from "views/Pages/Profile/Teams.js";
import General from "views/Pages/Projects/General.js";
import Timeline from "views/Pages/Projects/Timeline.js";
import RTLPage from "views/Pages/RTLPage.js";
import Reports from "views/Pages/Users/Reports.js";
import ForgotPassword from "views/Authentication/ForgotPassword/ForgotPassword";
import { SettingsIcon } from "components/Icons/Icons";
import NewUserValidation from "views/Authentication/newUserValidation/newUserValidation";
import { FaUsersGear } from "react-icons/fa6";
import Users from "views/Pages/Management/Users";
import PatientManagment from "views/Pages/PatientManagment/PatientManagment";
import PatientInfo from "views/Pages/PatientManagment/PatientInfo";
import { ExitIcon } from "components/Icons/Icons";
import { UsersGroupIcon } from "components/Icons/Icons";
import { InstitutionIcon } from "components/Icons/Icons";
import Events from "views/Pages/Management/Events";
import { MdEvent } from "react-icons/md";
import Todos from "views/Pages/Management/ToDo";
import { RiTodoFill } from "react-icons/ri";
import ActivityLog from "views/Pages/Activity/ActivityLog";
import Finance from "views/Pages/Finance/Finance";
import ConfirmAccount from "views/Authentication/confirmAccount/ConfirmAccount";
const dashRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon color="inherit" />,
    authIcon: <HomeIcon color="inherit" />,
    component: <Default />,
    layout: "/admin",
    collapse: false,
  },
  {
    name: "Patient Management",
    path: "/patient-management",
    icon: <PersonIcon color="inherit" />,
    component: <PatientManagment />,
    layout: "/admin",
    collapse: false,
  },
  {
    name: "Activity log",
    path: "/activity-log",
    icon: <StatsIcon color="inherit" />,
    component: <ActivityLog />,
    layout: "/admin",
  },
  {
    name: "Finance",
    path: "/finance",
    icon: <CartIcon color="inherit" />,
    component: <Finance />,
    layout: "/admin",
    collapse: false,
  },
  {
    name: "Managment",
    path: "/management",
    icon: <FaUsersGear color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Users",
        secondaryNavbar: false,
        icon: <UsersGroupIcon color="inherit" />,
        path: "/management/users",
        component: <Users />,
        layout: "/admin",
      },
      {
        name: "Institution",
        secondaryNavbar: false,
        icon: <InstitutionIcon color="inherit" />,
        path: "/management/institution",
        component: "",
        layout: "/admin",
      },
      {
        name: "Events",
        secondaryNavbar: false,
        icon: <MdEvent color="inherit" />,
        path: "/management/events",
        component: <Events />,
        layout: "/admin",
      },
      {
        name: "Todos",
        secondaryNavbar: false,
        icon: <RiTodoFill color="inherit" />,
        path: "/management/todos",
        component: <Todos />,
        layout: "/admin",
      },
    ],
  },

  {
    name: "Settings",
    icon: <SettingsIcon color="inherit" />,
    path: "/pages/settings",
    component: <Settings />,
    layout: "/admin",
  },
  {
    name: "Logout",
    icon: <ExitIcon color="inherit" />,
  },
  {
    name: "ROUTES",
    category: "routes",
    items: [
      {
        name: "PatientInformation",
        component: <PatientInfo />,
        path: "/personnel-management/patient-information/:patientId",
        layout: "/admin",
      },
      {
        name: "Pages",
        path: "/pages",
        collapse: true,
        icon: <DocumentIcon color="inherit" />,
        items: [
          {
            name: "Profile",
            path: "/profile",
            collapse: true,
            authIcon: <HomeIcon color="inherit" />,
            items: [
              {
                name: "Profile Overview",
                secondaryNavbar: true,
                path: "/pages/profile/overview",
                component: <Overview />,
                layout: "/admin",
              },
              {
                name: "Teams",
                secondaryNavbar: true,
                path: "/pages/profile/teams",
                component: <Teams />,
                layout: "/admin",
              },
              {
                name: "All Projects",
                secondaryNavbar: true,
                path: "/pages/profile/profile-projects",
                component: <Projects />,
                layout: "/admin",
              },
            ],
          },
          {
            name: "Users",
            path: "/users",
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Reports",
                path: "/pages/users/reports",
                component: <Reports />,
                layout: "/admin",
              },
              {
                name: "New User",
                path: "/pages/users/new-user",
                component: "",
                layout: "/admin",
              },
            ],
          },
          {
            name: "Account",
            path: "/account",
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Settings",
                path: "/pages/account/settings",
                component: <Settings />,
                layout: "/admin",
              },
              {
                name: "Billing",
                component: <Billing />,
                path: "/pages/account/billing",
                layout: "/admin",
              },
              {
                name: "Invoice",
                component: <Invoice />,
                path: "/pages/account/invoice",
                layout: "/admin",
              },
            ],
          },
          {
            name: "Projects",
            path: "/projects",
            collapse: true,
            authIcon: <StatsIcon color="inherit" />,
            items: [
              {
                name: "General",
                path: "/pages/projects/general",
                component: <General />,
                layout: "/admin",
              },
              {
                name: "Timeline",
                path: "/pages/projects/timeline",
                component: <Timeline />,
                layout: "/admin",
              },
            ],
          },
          {
            name: "Pricing Page",
            component: <Pricing />,
            path: "/pages/pricing-page",
            layout: "/auth",
          },
          {
            name: "RTL",
            component: <RTLPage />,
            path: "/pages/rtl-support-page",
            layout: "/rtl",
          },
          // {
          //   name: "Widgets",
          //   component: <Widgets />,
          //   path: "/pages/widgets",
          //   layout: "/admin",
          // },
          // {
          //   name: "Charts",
          //   component: <Charts />,
          //   path: "/pages/charts",
          //   layout: "/admin",
          // },
          // {
          //   name: "Alerts",
          //   path: "/pages/alerts",
          //   component: <Alerts />,
          //   layout: "/admin",
          // },
        ],
      },
      {
        name: "Authentication",
        path: "/authentication",
        icon: <PersonIcon color="inherit" />,
        collapse: true,
        items: [
          {
            name: "Sign In",
            path: "/authentication/sign-in",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <SignInBasic />,
                path: "/authentication/sign-in",
                layout: "/auth",
              },
            ],
          },
          {
            name: "Confirm Account",
            path: "/authentication/confirm-account/:id",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <ConfirmAccount />,
                path: "/authentication/confirm-account/:id",
                layout: "/auth",
              },
            ],
          },
          {
            name: "Confirm Account",
            path: "/authentication/complete-account/:id",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <NewUserValidation />,
                path: "/authentication/complete-account/:id",
                layout: "/auth",
              },
            ],
          },
          {
            name: "Forgot password",
            path: "/authentication/forgot-password",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <ForgotPassword />,
                path: "/authentication/forgot-password",
                layout: "/auth",
              },
            ],
          },
          {
            name: "Reset password",
            path: "/authentication/reset-password/:id",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <ResetBasic />,
                path: "/authentication/reset-password/:id",
                layout: "/auth",
              },
            ],
          },
          {
            name: "Lock",
            path: "/authentication/lock",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <LockBasic />,
                path: "/authentication/lock/basic",
                layout: "/auth",
              },
              {
                name: "Cover",
                component: <LockCover />,
                path: "/authentication/lock/cover",
                layout: "/auth",
              },
              {
                name: "Illustration",
                secondaryNavbar: true,
                component: <LockIllustration />,
                path: "/authentication/lock/illustration",
                layout: "/auth",
              },
            ],
          },
          {
            name: "2-Step Verification",
            path: "/authentication/verification",
            collapse: true,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                component: <VerificationBasic />,
                path: "/authentication/verification/basic",
                layout: "/auth",
              },
              {
                name: "Cover",
                component: <VerificationCover />,
                path: "/authentication/verification/cover",
                layout: "/auth",
              },
              {
                name: "Illustration",
                secondaryNavbar: true,
                component: <VerificationIllustration />,
                path: "/authentication/verification/illustration",
                layout: "/auth",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default dashRoutes;
