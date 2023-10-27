import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import Login from "../views/common/LogIn.vue";
import Signup from "../views/common/SignUp.vue";
import Home from "../views/common/LandingPage.vue"

import DashboardCollector from "../components/Dashboard-Collector/Dashboard-Collector.vue";
import JoinResearch from "../views/Data-Collector/JoinResearch.vue";
import OngoingResearch from "../views/Data-Collector/OngoingResearch.vue";

import DashboardResOwner from "../components/Research-Owner/Dashboard-ResOwner.vue"
import DV from '../views/Research-Owner/DV.vue'
import CreateForms from '../views/Research-Owner/CreateForms.vue'
import JoinRequests from '../views/Research-Owner/JoinRequests.vue'
import PublishedForms from '../views/Research-Owner/PublishedForms.vue'

import OtpDialog from "../views/common/OtpDialog.vue";
import CreateOrganization from "../views/common/CreateOrganization.vue";
import UpdateUserProfile from "../views/common/UpdateUserProfile.vue"
import ForgotPassword from "../views/common/ForgotPassword.vue"
import NewPassword from "../views/common/EnterNewPassword.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,

    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup,
    },
    {
        path: "/dashboard-collector",
        name: "dashboard-collector",
        component: DashboardCollector,
            children: [
            {
                path: "join-research",
                name: "join-research",
                component: JoinResearch,
            },
            {
                path: "ongoing-research", //removed / from the beginning
                name: "ongoing-research",
                component: OngoingResearch,
            },
            {
                path: "update-profile-2",
                name: "update-profile-2",
                component: UpdateUserProfile,
            }

        ],
        beforeEnter(to, from, next) {
            const status = (store.getters.getLoginStatus);
            if (status) {
                next()
            }
            else {
                alert("Please login first");
            }
        },
      },
      { 
        path: '/dashboard-research-owner',
        name: 'dashboard-research-owner',
        component: DashboardResOwner,
        children:  [{
            path: 'data-visualization',
            name: 'data-visualization',
            component: DV,
        },
        {
            path: 'create-forms',
            name: 'create-forms',
            component: CreateForms,
        },
        {
            path: 'join-requests',
            name: 'join-requests',
            component: JoinRequests,
        },
        {
            path: 'published-forms',
            name: 'published-forms',
            component: PublishedForms,
        },
        {
            path: "update-profile-1",
            name: "update-profile-1",
            component: UpdateUserProfile,
        }
    ]
    },
    {
        path: "/verify-otp",
        name: "verify-otp",
        component: OtpDialog,
        props: true,
    },
    {
        path: "/create-organization",
        name: "create-organization",
        component: CreateOrganization,
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
    },
    {
        path: "/new-password",
        name: "new-password",
        component: NewPassword,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;  