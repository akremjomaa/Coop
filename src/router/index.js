import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/connect',
      name: 'connect',
      component: () => import('../views/ConnectView.vue')
    },
    {
      path: '/createAccount',
      name: 'CreateAccount',
      component: () => import('../views/CreateAccountView.vue')
    },
    {
      path: '/memberList',
      name: 'memberList',
      component: () => import('../views/MemberListView.vue')
    },
    {
      path: '/oneMember/:id',
      name: 'oneMember',
      component: () => import('../views/OneMemberView.vue')
    },
    {
      path: '/conversationsList',
      name: 'conversationsList',
      component: () => import('../views/ConversationsListView.vue')
    },
    {
      path: '/createConversationView',
      name: 'createConversationView',
      component: () => import('../views/CreateConversationView.vue')
    },
    {
      path: '/oneConversationView/:id',
      name: 'oneConversationView',
      component: () => import('../views/OneConversationView.vue')
    },
  ]
})

export default router
