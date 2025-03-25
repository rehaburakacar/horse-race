<template>
  <div v-if="show" class="countdown-overlay">
    <div class="countdown-card">
      <img src="/assets/countdown.gif" alt="Countdown" class="countdown-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])
const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
    emit('done')
  }, 2800)
})
</script>

<style scoped>
.countdown-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.countdown-card {
  background-color: var(--dark-greens);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: scale-up 0.3s ease-in-out;
}

.countdown-image {
  width: 400px;
  height: auto;
  display: block;
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
