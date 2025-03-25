import { createStore } from 'vuex'
import { generateHorses } from '../packages/horseRace/utils/generateHorses'

export interface Horse {
  id: string
  name: string
  imagePath: string
  staticImagePath: string
  conditionScore: number
}

export interface Round {
  distance: number
  horses: Horse[]
  results: Horse[]
}

export interface State {
  horses: Horse[]
  rounds: Round[]
  currentRoundIndex: number
  raceStarted: boolean
  results: Horse[][]
}

function generateRaceDistances(start: number, increment: number, count: number): number[] {
  return Array.from({ length: count }, (v, i) => start + i * increment)
}

const store = createStore<State>({
  state: {
    horses: [],
    rounds: [],
    currentRoundIndex: 0,
    raceStarted: false,
    results: []
  },
  mutations: {
    setHorses(state, horses: Horse[]) {
      state.horses = horses
    },
    setRounds(state, rounds: Round[]) {
      state.rounds = rounds
    },
    startRace(state) {
      state.raceStarted = true
      state.currentRoundIndex = 0
      state.results = []
    },
    saveRoundResult(state, result: Horse[]) {
      if (state.rounds[state.currentRoundIndex]) {
        state.rounds[state.currentRoundIndex].results = result
        state.results.push(result)
        state.currentRoundIndex++
      }
    }
  },
  actions: {
    generateGame({ commit }) {
      const horses = generateHorses()
      commit('setHorses', horses)

      const distances = generateRaceDistances(1200, 200, 6)
      const rounds: Round[] = distances.map(distance => {
        const selectedHorses = [...horses].sort(() => 0.5 - Math.random()).slice(0, 10)
        return {
          distance,
          horses: selectedHorses,
          results: []
        }
      })

      commit('setRounds', rounds)
    },
    startRace({ commit }) {
      commit('startRace')
    },
    completeRound({ commit }, result: Horse[]) {
      commit('saveRoundResult', result)
    }
  },
  getters: {
    currentRound(state): Round | undefined {
      return state.rounds[state.currentRoundIndex]
    }
  }
})

export default store
