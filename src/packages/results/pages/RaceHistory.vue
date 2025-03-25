<template>
  <n-drawer
    :show="show"
    placement="right"
    width="300"
    :show-mask="false"
    :trap-focus="false"
    :auto-focus="false"
    :block-scroll="false"
    @update:show="emit('toggle', $event)"
  >
    <n-drawer-content title="Race History">
      <template #header>
        <div class="header-container">
          <span>Race History</span>
          <n-button text @click="emit('toggle', false)">❌</n-button>
        </div>
      </template>

      <n-scrollbar style="max-height: calc(100vh - 100px)">
        <n-space vertical size="large" class="p-2">
          <n-card
            v-for="(round, index) in history"
            :key="index"
            size="small"
            class="bg-white shadow-sm"
          >
            <template #header> 🏁 Round {{ index + 1 }} </template>
            <ul class="text-xs text-gray-700 list-disc pl-4">
              <li><strong>Distance:</strong> {{ round.distance }}m</li>
              <li><strong>Horses:</strong> {{ round.horses.length }}</li>
              <li>
                <strong>Top 3:</strong>
                <ul class="pl-3 list-decimal">
                  <li v-for="(h, i) in round.horses.slice(0, 3)" :key="i">
                    {{ h.name }} ({{ h.conditionScore }})
                  </li>
                </ul>
              </li>
            </ul>
          </n-card>
        </n-space>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { NDrawer, NDrawerContent, NButton, NScrollbar, NSpace, NCard } from 'naive-ui'
import type { Round } from '../../../store'

const props = defineProps<{
  history: Round[]
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.n-card {
  background-color: var(--dark-green);
  color: #ffffff;
}
</style>
