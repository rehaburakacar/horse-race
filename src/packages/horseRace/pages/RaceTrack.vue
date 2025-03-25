<template>
  <div v-if="showStartButton" class="start-game-container">
    <button @click="startGameHandler" class="start-game-btn">
      <img src="/assets/start-button.png" alt="Start Game" />
    </button>
  </div>

  <div v-if="showCountdown" class="countdown-blur-background">
    <Count @done="startGame" />
  </div>

  <CurrentResults
    v-if="currentRound && currentRound.horses && isRaceActive"
    :horses="currentRound.horses"
    :positions="positions"
    :finishedOrder="finishedOrder"
    :roundDistance="currentRound.distance"
    :show="showLeftDrawer"
    @toggle="showLeftDrawer = $event"
  />

  <RaceHistory
    :history="completedRounds"
    :show="showRightDrawer"
    @toggle="showRightDrawer = $event"
  />

  <n-button
    v-if="!showRightDrawer && completedRounds.length"
    class="reopen-right-btn"
    size="small"
    type="primary"
    @click="showRightDrawer = true"
  >
    📜 History
  </n-button>

  <div
    :class="[
      'main-content',
      {
        'drawer-left-open': showLeftDrawer,
        'drawer-right-open': showRightDrawer,
        'drawer-left-open drawer-right-open': showLeftDrawer && showRightDrawer
      }
    ]"
  >
    <div class="mt-10 space-y-6" v-if="currentRound">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800">
          Round {{ roundNumber }} – {{ currentRound.distance }}m
        </h2>
      </div>

      <div
        v-if="isRaceActive"
        ref="trackRef"
        class="track-style"
        style="background-image: url('/assets/horse_race_ground.png')"
      >
        <div
          v-for="(horse, index) in currentRound.horses"
          :key="horse.id"
          class="horse-position"
          :style="{
            transform: `translateX(${(positions[index] / currentRound.distance) * ((trackRef?.clientWidth || 0) - 130)}px)`,
            top: `${index % 2 === 0 ? 50 : 120}px`
          }"
        >
          <img
            :src="
              isRunning && positions[index] < currentRound.distance
                ? horse.imagePath
                : horse.staticImagePath
            "
            alt="horse"
            class="horse-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import Count from './Count.vue'
import CurrentResults from '../../results/pages/CurrentResults.vue'
import RaceHistory from '../../results/pages/RaceHistory.vue'
import { simulateRace } from '../utils/RaceEngine'
import { generateHorses, getRandomSubset } from '../utils/generateHorses'
import type { State, Horse, Round } from '../../../store'
import { NButton } from 'naive-ui'
import router from '../../../router'

const store = useStore<State>()

const allHorses = ref<Horse[]>(generateHorses())
const showLeftDrawer = ref(true)
const showRightDrawer = ref(false)
const showCountdown = ref(false)
const showStartButton = ref(true)

const positions = ref<number[]>([])
const finishedOrder = ref<number[]>([])
const completedRounds = ref<Round[]>([])

const isRunning = ref(false)
const isRaceActive = ref(false)
const raceFinished = ref(false)
const trackRef = ref<HTMLElement | null>(null)
const trackWidth = ref(0)

const currentRound = computed(() => store.getters.currentRound)
const roundNumber = computed(() => store.state.currentRoundIndex + 1)

onMounted(async () => {
  await nextTick()
  if (trackRef.value) trackWidth.value = trackRef.value.clientWidth
})

const generateGame = () => {
  store.dispatch('generateGame')
  startGame()
}

const startGame = () => {
  store.dispatch('startRace')
  startRaceFlow()
}

const startGameHandler = () => {
  showStartButton.value = false
  generateGame()
}

const startRaceFlow = () => {
  showCountdown.value = true
  raceFinished.value = false

  setTimeout(() => {
    showCountdown.value = false
    const newHorses = getRandomSubset(allHorses.value, 10)
    if (store.getters.currentRound) {
      store.getters.currentRound.horses = newHorses
      runNextRound()
    }
  }, 2800)
}

const runNextRound = () => {
  const round = currentRound.value
  if (!round) return

  const horses = round.horses
  positions.value = horses.map(() => 0)
  isRaceActive.value = true
  finishedOrder.value = []

  const momentum = horses.map(() => 1)
  const fatigueThreshold = round.distance * 0.8

  const raceInterval = setInterval(() => {
    positions.value = positions.value.map((pos, i) => {
      if (pos >= round.distance) return pos

      const baseSpeed = Math.max(
        horses[i].conditionScore * (horses[i].conditionScore < 40 ? 3.4 : 2),
        100
      )
      if (Math.random() < 0.25) momentum[i] += (Math.random() - 0.5) * 0.3
      if (pos > fatigueThreshold && Math.random() < 0.3) momentum[i] -= 0.1
      if (pos >= round.distance && !finishedOrder.value.includes(i)) finishedOrder.value.push(i)

      momentum[i] = Math.max(0.6, Math.min(momentum[i], 1.4))
      return Math.min(pos + baseSpeed * momentum[i] * 0.1, round.distance)
    })

    if (positions.value.every(pos => pos >= round.distance)) {
      clearInterval(raceInterval)
      isRaceActive.value = false

      if (!showCountdown.value) {
        const result = simulateRace(horses, round.distance)
        store.dispatch('completeRound', result)
        completedRounds.value = [...completedRounds.value, JSON.parse(JSON.stringify(round))]
      }
      raceFinished.value = true

      if (store.state.currentRoundIndex >= 6) {
        router.push('/results')
      } else {
        raceFinished.value = false
        startRaceFlow()
      }
    }
  }, 80)
}

watch(
  () => store.state.raceStarted,
  started => {
    if (started && !isRunning.value) {
      isRunning.value = true
      startRaceFlow()
    }
  }
)

watch(completedRounds, newRounds => {
  if (newRounds.length > 0 && !showRightDrawer.value) {
    showRightDrawer.value = true
  }
})
</script>

<style scoped>
.start-game-container {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  height: 100vh; /* Make the container fill the entire height of the viewport */
  width: 100vw; /* Make the container fill the entire width of the viewport */
  position: absolute; /* Positioning it relative to the nearest positioned ancestor (usually the body) */
  top: 0;
  left: 0;
}

.start-game-btn {
  background: none; /* No background */
  border: none; /* No border */
}

.start-game-btn img {
  width: 60%; /* Ensures the image fills the button */
  vertical-align: middle; /* Aligns the image properly within the button */
}

.start-game-btn:hover img {
  opacity: 0.6; /* Slight opacity change on hover for visual feedback */
}

.main-content {
  transition: all 0.3s ease;
  padding: 1rem;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
}

.drawer-left-open {
  margin-left: 300px;
  width: calc(100% - 300px);
}

.drawer-right-open {
  margin-right: 300px;
  width: calc(100% - 300px);
}

.drawer-left-open.drawer-right-open {
  width: calc(100% - 600px) !important;
}

.horse-image {
  width: 130px;
  height: 90px;
  object-fit: contain;
}

.reopen-right-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
