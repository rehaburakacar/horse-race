<template>
  <div class="center-container">
    <div class="dark-overlay"></div>

    <n-card class="centered-card" bordered>
      <h1 class="title">Welcome to Horse Racing Game</h1>
      <p class="subtitle">Begin your journey and enjoy the excitement of game 🐎💨</p>
      <n-button type="primary" size="large" class="start-button" @click="startGame">
        Start the Race!
      </n-button>
    </n-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const startGame = () => {
  router.push('/race')
}
</script>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--dark-blue);
  background-image: url('/assets/horses/horse_wallpaper.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--black);
  opacity: 0.4;
  z-index: 1;
}

.centered-card {
  z-index: 2;
  max-width: 600px;
  width: 90%;
  padding: 32px;
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

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gold);
  margin-bottom: 16px;
  text-shadow: 1px 1px 4px var(--black);
}

.subtitle {
  font-size: 1.125rem;
  color: var(--light-grey);
  margin-bottom: 24px;
}

.start-button {
  padding: 12px 24px;
  background-color: var(--red-dark);
  color: white;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.start-button:hover {
  background-color: var(--red-dark-hover);
  box-shadow: 0 0 10px var(--gold);
  transform: scale(1.05);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoom-in {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
</style>
