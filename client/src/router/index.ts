import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TetrisView from '../views/TetrisView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tetris',
      component: TetrisView,
      children: [
        { 
          path: 'username',
          name: 'tetris-username',
          component: () => import('../views/viewstetris/TetrisUsernameView.vue')
        }, 
        {
          path: 'settings',
          name: 'tetris-settings',
          component: () => import('../views/viewstetris/TetrisSettingsView.vue')
        }, 
        { 
          path: '/#:id[:username]',
          name: 'tetris-game',
          component: () => import('../views/viewstetris/TetrisGameView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
