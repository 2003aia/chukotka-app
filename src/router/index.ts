import { createRouter, createWebHistory, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import AuthPage from '@/views/Auth.vue';
import RegistrationPage from '@/views/Registration.vue';
import ConfirmPage from '@/views/Confirm.vue';
import CodeConfirmPage from '@/views/CodeConfirm.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: AuthPage,
  },
  {
    path: '/reg',
    component: RegistrationPage,
  },
  {
    path: '/codeConfirm',
    component: CodeConfirmPage,

  },
  {
    path: '/confirm',
    component: ConfirmPage,
  },

  {
    path: '/passwordRecovery',
    component: () => import('@/views/PasswordRecovery.vue'),
  },
  
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/main'
      },
      {
        path: 'main',
        name: 'Главная',
        component: () => import('@/views/Main.vue')
      },
      {
        path: 'indices',
        name: 'Показания',

        component: () => import('@/views/Indications.vue')
      },
      {
        path: 'payment',
        name: 'Оплата услуг',

        component: () => import('@/views/Payment.vue')
      },
      {
        path: 'profile',
        name: 'Профиль',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'addAcc',
        component: () => import('@/views/AddAccount.vue')
      },
      {
        path: 'profileEdit',
        name: 'ProfileEdit',
        component: () => import('@/views/ProfileEdit.vue')
      },
      {
        path: 'services',
        component: () => import('@/views/Services.vue')
      },
      {
        path: 'notif',
        component: () => import('@/views/Notifications.vue')
      },
      {
        path: 'feedback',
        component: () => import('@/views/Feedback.vue')
      },
      {
        path: 'feedbackAdd',
        component: () => import('@/views/FeedbackAdd.vue')
      },
      {
        path: 'accrualAndPayment',
        component: () => import('@/views/AccrualAndPayment.vue')
      },
      {
        path: 'receipt',
        component: () => import('@/views/Receipt.vue')
      },
      {
        path: 'downloadDocs',
        component: () => import('@/views/DownloadDocs.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
