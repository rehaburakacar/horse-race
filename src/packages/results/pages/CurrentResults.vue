<template>
  <n-drawer
    :show="show"
    display-directive="show"
    placement="left"
    width="300"
    :show-mask="false"
    :trap-focus="false"
    :auto-focus="false"
    :block-scroll="false"
    class="custom-drawer"
    @update:show="emit('toggle', $event)"
  >
    <n-drawer-content title="Current Results">
      <template #header>
        <div class="flex justify-between items-center drawer-header">
          <span>Current Results</span>
          <n-button text @click="emit('toggle', false)">❌</n-button>
        </div>
      </template>

      <n-scrollbar style="max-height: calc(100vh - 100px)">
        <n-list bordered v-if="sortedHorses.length">
          <n-list-item v-for="(entry, index) in sortedHorses" :key="entry.horse.id">
            <template #prefix>
              <n-avatar :src="entry.horse.staticImagePath" size="medium" round />
            </template>
            <div class="list-text">
              <div class="font-semibold">{{ index + 1 }}. {{ entry.horse.name }}</div>
              <div class="distance-text">
                Distance: {{ Math.floor(Math.min(entry.distance, roundDistance)) }}m
              </div>
            </div>
          </n-list-item>
        </n-list>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>

  <n-button
    v-if="!show"
    @click="emit('toggle', true)"
    class="drawer-toggle-btn"
    type="primary"
    size="small"
  >
    📊 Open Results
  </n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Horse } from '../../../store'
import { NDrawer, NDrawerContent, NList, NListItem, NAvatar, NScrollbar, NButton } from 'naive-ui'

const props = defineProps<{
  horses: Horse[]
  positions: number[]
  finishedOrder: number[]
  roundDistance: number
  show: boolean
}>()

const emit = defineEmits<(e: 'toggle', value: boolean) => void>()

const sortedHorses = computed(() => {
  return props.horses
    .map((horse, i) => ({
      horse,
      index: i,
      distance: props.positions[i] || 0
    }))
    .sort((a, b) => {
      const aFinished = props.finishedOrder.indexOf(a.index)
      const bFinished = props.finishedOrder.indexOf(b.index)

      if (aFinished !== -1 && bFinished !== -1) {
        return aFinished - bFinished
      } else if (aFinished !== -1) {
        return -1
      } else if (bFinished !== -1) {
        return 1
      } else {
        return b.distance - a.distance
      }
    })
})
</script>

<style scoped>
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.list-text {
  color: #ffffff;
}

.distance-text {
  color: var(--gold);
}

.n-list-item {
  align-items: center;
  background-color: var(--dark-green);
}
</style>
