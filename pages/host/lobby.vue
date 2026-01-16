<template>
  <div
    class="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"
      ></div>
    </div>

    <!-- Error State -->
    <div v-if="errorState" class="relative z-10 text-center">
      <div
        class="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
      >
        <span class="text-4xl">❌</span>
      </div>
      <h1 class="text-3xl font-bold text-white mb-4">{{ errorState }}</h1>
      <NuxtLink
        to="/host/create"
        class="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-500 transition-colors"
      >
        Create New Game
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <div v-else class="relative z-10 w-full max-w-5xl text-center">
      <div class="animate-slide-up">
        <h1 class="text-5xl font-black text-white mb-2 tracking-tight">
          Game Lobby
        </h1>
        <p class="text-gray-400 mb-10 text-lg">
          Waiting for players to join the arena...
        </p>
      </div>

      <!-- Room Code Card -->
      <div
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 mb-16 inline-block shadow-2xl animate-scale-in relative group overflow-hidden"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
        <p
          class="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
        >
          Room Code
        </p>
        <div
          class="text-7xl md:text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-secondary-400 tracking-widest cursor-pointer hover:scale-105 transition-transform duration-300"
          @click="copyCode"
          title="Click to copy"
        >
          {{ roomCode }}
        </div>
        <div
          class="mt-4 text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Click code to copy
        </div>
        <div v-if="copied" class="mt-2 text-green-400 text-sm animate-fade-in">
          Copied to clipboard!
        </div>
      </div>

      <!-- Players Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16 px-4"
      >
        <TransitionGroup name="list">
          <div
            v-for="player in players"
            :key="player.id"
            class="flex flex-col items-center group"
          >
            <div
              class="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-lg opacity-20 group-hover:opacity-50 transition-opacity"
              ></div>
              <img
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}`"
                class="w-24 h-24 rounded-full bg-[#1a1a1a] border-4 border-white/10 shadow-xl relative z-10 group-hover:border-white/20 transition-colors"
              />
              <div
                class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0a0a0a] z-20 shadow-lg animate-bounce-subtle"
              ></div>
            </div>
            <span
              class="text-white font-bold truncate w-full px-2 py-1 rounded-lg bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors text-sm"
              >{{ player.name }}</span
            >
          </div>
        </TransitionGroup>

        <!-- Empty Slots placeholders -->
        <div
          v-for="i in Math.max(0, 5 - players.length)"
          :key="`empty-${i}`"
          class="flex flex-col items-center opacity-20"
        >
          <div
            class="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-4"
          >
            <span class="text-3xl text-white/20">?</span>
          </div>
          <span class="text-white/20 font-medium text-sm">Waiting...</span>
        </div>
      </div>

      <!-- Start Button -->
      <div
        class="fixed bottom-10 left-0 w-full flex justify-center z-50 pointer-events-none"
      >
        <button
          @click="startGame"
          class="pointer-events-auto px-16 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-primary-500/40 transform hover:-translate-y-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none border border-white/10 backdrop-blur-md"
          :disabled="players.length === 0 || isStarting"
        >
          <span class="flex items-center gap-3">
            <span v-if="isStarting" class="animate-spin">⏳</span>
            {{ isStarting ? "Starting..." : "Start Game" }}
            <svg
              v-if="!isStarting"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSocket, getHostCredentials, isValidHost } from "~/services/socket";
import debug from "debug";

const log = debug("quiz-mania:host");

const route = useRoute();
const router = useRouter();
const roomCode = route.query.code;
const players = ref([]);
const copied = ref(false);
const isStarting = ref(false);
const errorState = ref(null);

// Verify host credentials
onMounted(() => {
  if (!roomCode) {
    errorState.value = "No room code provided";
    return;
  }

  if (!isValidHost(roomCode)) {
    errorState.value = "Invalid host credentials. Please create a new game.";
    return;
  }

  const socket = useSocket();

  socket.on("playerJoined", (data) => {
    players.value = data.players;
  });

  socket.on("playerLeft", (data) => {
    players.value = data.players;
  });

  socket.on("gameStarted", () => {
    router.push(`/game/${roomCode}`);
  });

  socket.on("error", (data) => {
    log("Socket error: %s", data.message);
    isStarting.value = false;
  });

  socket.on("roomClosed", () => {
    errorState.value = "Room was closed";
  });
});

const copyCode = () => {
  navigator.clipboard.writeText(roomCode);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const startGame = () => {
  if (players.value.length === 0 || isStarting.value) return;

  isStarting.value = true;
  const socket = useSocket();
  const { hostToken } = getHostCredentials();

  // Send with host token for authentication
  socket.emit("startGame", { roomCode, hostToken });
};

onUnmounted(() => {
  const socket = useSocket();
  socket.off("playerJoined");
  socket.off("playerLeft");
  socket.off("gameStarted");
  socket.off("error");
  socket.off("roomClosed");
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: scale(0.9);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
