<template>
  <div class="min-h-screen p-4 md:p-8 overflow-hidden">
    <div class="max-w-4xl mx-auto">
      <!-- Confetti Animation -->
      <div v-if="showConfetti" class="fixed inset-0 pointer-events-none z-50">
        <div
          v-for="i in 50"
          :key="i"
          class="absolute w-2 h-2 animate-confetti"
          :class="confettiColors[i % confettiColors.length]"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animationDelay: `${Math.random() * 2}s`,
          }"
        />
      </div>

      <!-- Winner Announcement -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="relative inline-block mb-6">
          <div class="text-8xl animate-bounce-subtle">🏆</div>
          <div class="absolute inset-0 animate-glow rounded-full"></div>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          <span v-if="isWinner" class="text-gradient">Congratulations!</span>
          <span v-else class="text-gradient">Game Over!</span>
        </h1>

        <p v-if="isWinner" class="text-xl text-white/80 mb-2">
          You are the champion! 🎉
        </p>
        <p v-else class="text-xl text-white/80 mb-2">
          Great effort! Keep practicing! 💪
        </p>

        <div
          class="inline-block px-6 py-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-white/20 rounded-full"
        >
          <span class="text-3xl font-bold text-gradient"
            >{{ playerScore }} points</span
          >
        </div>
      </div>

      <!-- Leaderboard -->
      <ui-card class="mb-8 animate-slide-up">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">Final Rankings</h2>
            <div class="text-sm text-white/60">
              {{ players.length }} players
            </div>
          </div>
        </template>

        <!-- Top 3 Podium -->
        <div v-if="players.length >= 3" class="mb-8">
          <div class="flex items-end justify-center gap-4 mb-8">
            <!-- 2nd Place -->
            <div
              class="flex-1 text-center animate-slide-up"
              style="animation-delay: 0.2s"
            >
              <div
                class="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-lg text-2xl"
              >
                🥈
              </div>
              <div
                class="bg-gradient-to-br from-slate-400/20 to-slate-500/20 rounded-t-2xl p-4 h-32 flex flex-col justify-center"
              >
                <p class="font-bold text-white truncate">
                  {{ players[1].name }}
                </p>
                <p class="text-2xl font-bold text-slate-300">
                  {{ players[1].score }}
                </p>
                <p class="text-xs text-white/50">#2</p>
              </div>
            </div>

            <!-- 1st Place -->
            <div
              class="flex-1 text-center animate-slide-up"
              style="animation-delay: 0.1s"
            >
              <div
                class="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 text-3xl animate-glow"
              >
                👑
              </div>
              <div
                class="bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-500/50 rounded-t-2xl p-4 h-40 flex flex-col justify-center"
              >
                <p class="font-bold text-white truncate text-lg">
                  {{ players[0].name }}
                </p>
                <p class="text-3xl font-bold text-yellow-300">
                  {{ players[0].score }}
                </p>
                <p class="text-xs text-white/50">#1</p>
              </div>
            </div>

            <!-- 3rd Place -->
            <div
              class="flex-1 text-center animate-slide-up"
              style="animation-delay: 0.3s"
            >
              <div
                class="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg text-2xl"
              >
                🥉
              </div>
              <div
                class="bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-t-2xl p-4 h-24 flex flex-col justify-center"
              >
                <p class="font-bold text-white truncate">
                  {{ players[2].name }}
                </p>
                <p class="text-2xl font-bold text-orange-300">
                  {{ players[2].score }}
                </p>
                <p class="text-xs text-white/50">#3</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Leaderboard -->
        <Scoreboard :players="players" />
      </ui-card>

      <!-- Game Stats -->
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <ui-card
          class="text-center animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <div class="text-4xl mb-2">✅</div>
          <p class="text-2xl font-bold text-white mb-1">{{ correctAnswers }}</p>
          <p class="text-sm text-white/60">Correct Answers</p>
        </ui-card>

        <ui-card
          class="text-center animate-slide-up"
          style="animation-delay: 0.2s"
        >
          <div class="text-4xl mb-2">⚡</div>
          <p class="text-2xl font-bold text-white mb-1">
            {{ avgResponseTime }}s
          </p>
          <p class="text-sm text-white/60">Avg Response Time</p>
        </ui-card>

        <ui-card
          class="text-center animate-slide-up"
          style="animation-delay: 0.3s"
        >
          <div class="text-4xl mb-2">🎯</div>
          <p class="text-2xl font-bold text-white mb-1">{{ accuracy }}%</p>
          <p class="text-sm text-white/60">Accuracy</p>
        </ui-card>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
        style="animation-delay: 0.4s"
      >
        <ui-button variant="primary" size="lg" @click="playAgain">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Play Again
        </ui-button>

        <ui-button variant="secondary" size="lg" @click="shareResults">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Results
        </ui-button>

        <ui-button variant="outline" size="lg" @click="goHome">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const gameCode = computed(() => route.params.code as string);

// Mock data - would come from API/WebSocket
const playerScore = ref(850);
const correctAnswers = ref(8);
const avgResponseTime = ref(12);
const accuracy = ref(80);

const players = ref([
  { id: "1", name: "Alice Johnson", score: 950 },
  { id: "2", name: "Bob Smith", score: 850 },
  { id: "3", name: "Charlie Brown", score: 750 },
  { id: "4", name: "Diana Prince", score: 680 },
  { id: "5", name: "Ethan Hunt", score: 550 },
]);

const isWinner = computed(() => {
  return players.value[0]?.score === playerScore.value;
});

const showConfetti = ref(false);
const confettiColors = [
  "bg-primary-500",
  "bg-secondary-500",
  "bg-accent-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-blue-500",
];

onMounted(() => {
  if (isWinner.value) {
    showConfetti.value = true;
    setTimeout(() => {
      showConfetti.value = false;
    }, 5000);
  }
});

const playAgain = () => {
  // Generate new game code
  const newGameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  router.push(`/host/${newGameCode}`);
};

const shareResults = async () => {
  const text = `I scored ${playerScore.value} points in Quiz Mania! Can you beat my score? 🏆`;

  if (process.client && navigator.share) {
    try {
      await navigator.share({
        title: "Quiz Mania Results",
        text: text,
        url: window.location.origin,
      });
    } catch (err) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(text);
      alert("Results copied to clipboard!");
    }
  }
};

const goHome = () => {
  router.push("/");
};
</script>
