import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../packages/horseRace/pages/WelcomePage.vue'
import RaceTrack from '../packages/horseRace/pages/RaceTrack.vue'
import ResultsBoard from '../packages/results/pages/ResultBoard.vue'

const routes = [
  { path: '/', redirect: '/start' },
  { path: '/start', component: WelcomePage },
  { path: '/race', component: RaceTrack },
  { path: '/results', component: ResultsBoard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
