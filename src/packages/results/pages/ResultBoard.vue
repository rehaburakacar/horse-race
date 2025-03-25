<template>
  <n-space vertical size="large" class="mt-10">
    <n-alert type="info" title="🏆 Race Results" class="text-3xl main-content">
      View the detailed outcomes of each race round below.
    </n-alert>

    <n-card v-for="(roundResult, index) in results" :key="index" bordered class="main-content">
      <template #header>
        <span class="text-xl font-semibold">Round {{ index + 1 }}</span>
      </template>

      <n-space vertical size="small" class="p-4 main-grid">
        <n-grid :cols="3" x-gap="16" y-gap="16" class="main-thing">
          <n-grid-item v-for="(horse, rank) in roundResult" :key="horse.id" :span="1">
            <n-card bordered class="h-full card-background">
              <template #header>
                <div class="flex items-center space-x-3 card-item">
                  <img :src="horse.staticImagePath" alt="Horse" class="horse-image" />
                  <span class="text-lg font-bold"> #{{ rank + 1 }} - {{ horse.name }} </span>
                </div>
              </template>

              <n-space vertical align="center" class="p-4">
                <span class="text-sm">Condition Score: {{ horse.conditionScore }}</span>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { NAlert, NCard, NGrid, NGridItem, NSpace } from 'naive-ui'
import type { State, Horse } from '../../../store'
import router from '../../../router'
import { onMounted } from 'vue'

const store = useStore<State>()

const results = computed<Horse[][]>(() => store.state.results)

onMounted(() => {
  if (store.state.results.length === 0) {
    router.push('/race')
  }
})
</script>

<style scoped>
.main-content {
  z-index: 2;
  backdrop-filter: blur(7px);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--gold);
  box-shadow: 0 0 20px rgba(198, 40, 40, 0.4);
  animation:
    fade-in 2s ease-in-out forwards,
    zoom-in 0.5s ease;
  transition: all 0.3s ease;
}

.n-alert {
  text-align: center;
}

.card-background {
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-green);
  color: white;
}

.card-background:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-item {
  color: var(--gold);
}

.horse-image {
  width: 15vh;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
