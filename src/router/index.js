import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/common/LogIn.vue";
import Signup from "../views/common/SignUp.vue";

import DashboardCollector from "../components/Dashboard-Collector/Dashboard-Collector.vue";
import JoinResearch from "../views/Data-Collector/JoinResearch.vue";
import OngoingResearch from "../views/Data-Collector/OngoingResearch.vue";

import DashboardResOwner from "../components/Research-Owner/Dashboard-ResOwner.vue"
import DV from '../views/Research-Owner/DV.vue'
import CreateForms from '../views/Research-Owner/CreateForms.vue'
import JoinRequests from '../views/Research-Owner/JoinRequests.vue'
import PublishedForms from '../views/Research-Owner/PublishedForms.vue'


const routes = [
    {
        path: "/",
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
        ],
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
        }]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;  