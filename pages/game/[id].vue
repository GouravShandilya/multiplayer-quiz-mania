<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex flex-col items-center p-4 relative overflow-hidden"
  >
    <!-- Background Animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px] animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[150px] animate-pulse-slow delay-1000"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-if="errorState"
      class="flex-1 flex items-center justify-center relative z-10"
    >
      <div class="text-center">
        <div
          class="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
        >
          <span class="text-5xl">❌</span>
        </div>
        <h1 class="text-3xl font-bold text-white mb-4">{{ errorState }}</h1>
        <p class="text-gray-400 mb-8">
          Please check the room code or create a new game.
        </p>
        <NuxtLink
          to="/"
          class="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>

    <!-- Main Game Content -->
    <template v-else>
      <!-- Header: Timer & Progress -->
      <div
        class="w-full max-w-4xl flex items-center justify-between mb-8 relative z-10"
      >
        <div
          class="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 text-white font-bold border border-white/10"
        >
          Q: {{ currentQuestionNumber }} / {{ totalQuestions }}
        </div>

        <div
          class="flex-1 mx-8 h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-md"
        >
          <div
            class="h-full transition-all duration-1000 ease-linear rounded-full"
            :class="timerBarClass"
            :style="{ width: `${(timeLeft / 10) * 100}%` }"
          ></div>
        </div>

        <div
          class="w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center text-white font-bold text-2xl border-2 transition-colors"
          :class="timerCircleClass"
        >
          {{ timeLeft }}
        </div>
      </div>

      <!-- Game Content -->
      <div
        class="w-full max-w-6xl flex-1 flex flex-col items-center justify-center relative z-10"
      >
        <!-- Waiting for Host to Start -->
        <div v-if="status === 'waiting'" class="text-center">
          <div
            class="w-32 h-32 mx-auto mb-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse"
          >
            <span class="text-6xl">🎮</span>
          </div>
          <h2 class="text-4xl font-bold text-white mb-4">Get Ready!</h2>
          <p class="text-gray-400 text-lg">
            Waiting for the host to start the game...
          </p>
          <div class="mt-8 flex justify-center gap-2">
            <span
              class="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
              style="animation-delay: 0s"
            ></span>
            <span
              class="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></span>
            <span
              class="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></span>
          </div>
        </div>

        <!-- Active Question -->
        <QuestionCard
          v-else-if="currentQuestion && !showHostReview"
          :question="currentQuestion"
          :selected-option="selectedOption"
          :disabled="hasAnswered || isHost"
          :show-result="showResult"
          :correct-option="correctOption"
          :is-host="isHost"
          @answer="submitAnswer"
        />

        <!-- Host Review Screen -->
        <AnswerReview
          v-if="isHost && showHostReview && hostReviewData"
          :review-data="hostReviewData"
          @advance="advanceGame"
        />

        <!-- Host Status During Question -->
        <div
          v-if="
            isHost && currentQuestion && !showHostReview && status === 'active'
          "
          class="mt-8 text-center"
        >
          <div
            class="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
          >
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Answers:</span>
              <span class="text-white font-bold"
                >{{ answeredCount }}/{{ totalPlayers }}</span
              >
            </div>
            <div class="w-px h-6 bg-white/20"></div>
            <div class="text-gray-400 text-sm">Players are answering...</div>
          </div>
        </div>

        <!-- Player Status After Answering -->
        <div
          v-if="!isHost && hasAnswered && !showResult"
          class="mt-8 text-center animate-fade-in"
        >
          <div
            class="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-400"
          >
            <span class="text-xl">✓</span>
            <span class="font-medium"
              >Answer submitted! Waiting for timer...</span
            >
          </div>
        </div>
      </div>
    </template>

    <!-- Game Over / Leaderboard -->
    <Leaderboard
      v-if="status === 'completed'"
      :players="leaderboardData"
      :show-answer-history-btn="!isHost"
      @close="goHome"
      @view-answers="showAnswerHistory = true"
    />

    <!-- Answer History Modal (for players) -->
    <AnswerHistory
      v-if="showAnswerHistory && myAnswerHistory.length > 0"
      :answer-history="myAnswerHistory"
      :stats="myStats"
      @close="showAnswerHistory = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  useSocket,
  getHostCredentials,
  isValidHost,
  connectSocket,
} from "~/services/socket";
import QuestionCard from "~/components/Game/QuestionCard.vue";
import Leaderboard from "~/components/Game/Leaderboard.vue";
import AnswerReview from "~/components/Game/AnswerReview.vue";
import AnswerHistory from "~/components/Game/AnswerHistory.vue";
import debug from "debug";

const log = debug("quiz-mania:game");

const route = useRoute();
const router = useRouter();
const roomCode = route.params.id;

// Determine if user is host based on stored credentials (not URL parameter)
const isHost = computed(() => isValidHost(roomCode));

const status = ref("waiting"); // waiting, active, reviewing, completed
const currentQuestion = ref(null);
const currentQuestionNumber = ref(0);
const totalQuestions = ref(0);
const timeLeft = ref(10);
const selectedOption = ref(null);
const hasAnswered = ref(false);
const showResult = ref(false);
const correctOption = ref(null);
const leaderboardData = ref([]);
const errorState = ref(null);

// Host-specific state
const showHostReview = ref(false);
const hostReviewData = ref(null);
const answeredCount = ref(0);
const totalPlayers = ref(0);

// Player-specific state
const myAnswerHistory = ref([]);
const myStats = ref({ score: 0, correctCount: 0, wrongCount: 0, rank: 0 });
const showAnswerHistory = ref(false);

// Timer styling
const timerBarClass = computed(() => {
  if (timeLeft.value <= 3) return "bg-gradient-to-r from-red-500 to-red-600";
  if (timeLeft.value <= 5)
    return "bg-gradient-to-r from-yellow-500 to-orange-500";
  return "bg-gradient-to-r from-green-400 to-emerald-500";
});

const timerCircleClass = computed(() => {
  if (timeLeft.value <= 3) return "bg-red-500/20 border-red-500 text-red-400";
  if (timeLeft.value <= 5)
    return "bg-yellow-500/20 border-yellow-500 text-yellow-400";
  return "bg-white/10 border-white/20";
});

const submitAnswer = (index) => {
  if (hasAnswered.value || isHost.value) return;

  selectedOption.value = index;
  hasAnswered.value = true;

  const socket = useSocket();
  socket.emit("submitAnswer", {
    roomCode,
    answerIndex: index,
  });
};

const advanceGame = () => {
  if (!isHost.value) return;

  const socket = useSocket();
  const { hostToken } = getHostCredentials();

  socket.emit("hostAdvance", { roomCode, hostToken });
  showHostReview.value = false;
  hostReviewData.value = null;
};

const goHome = () => {
  router.push("/");
};

onMounted(() => {
  connectSocket();
  const socket = useSocket();

  // Verify room exists first (for players)
  if (!isHost.value) {
    socket.emit("verifyRoom", roomCode);

    socket.once("roomVerified", (data) => {
      if (!data.exists) {
        errorState.value = "Room not found";
      }
    });
  }

  socket.on("gameStarted", () => {
    // Game has started, waiting for first question
    status.value = "waiting";
  });

  socket.on("newQuestion", (data) => {
    status.value = "active";
    currentQuestion.value = data.question;
    currentQuestionNumber.value = data.question.current;
    totalQuestions.value = data.question.total;
    timeLeft.value = data.timeLeft;

    // Reset state for new question
    selectedOption.value = null;
    hasAnswered.value = false;
    showResult.value = false;
    correctOption.value = null;
    showHostReview.value = false;
    hostReviewData.value = null;
    answeredCount.value = 0;
  });

  socket.on("timerUpdate", (data) => {
    timeLeft.value = data.timeLeft;
  });

  socket.on("playerAnswered", (data) => {
    answeredCount.value = data.answeredCount;
    totalPlayers.value = data.totalPlayers;
  });

  socket.on("questionResult", (data) => {
    showResult.value = true;
    correctOption.value = data.correctOptionIndex;
  });

  // Host receives detailed review data
  socket.on("hostAnswerReview", (data) => {
    hostReviewData.value = data;
    showHostReview.value = true;
    status.value = "reviewing";
  });

  socket.on("gameOver", (data) => {
    status.value = "completed";
    leaderboardData.value = data.leaderboard;
    currentQuestion.value = null;
    showHostReview.value = false;

    // Store player-specific data
    if (data.myAnswerHistory) {
      myAnswerHistory.value = data.myAnswerHistory;
    }
    if (data.myStats) {
      myStats.value = data.myStats;
    }
  });

  socket.on("error", (data) => {
    log("Game error: %s", data.message);
  });

  socket.on("roomClosed", (data) => {
    errorState.value = data.message || "Room was closed";
  });
});

onUnmounted(() => {
  const socket = useSocket();
  socket.off("gameStarted");
  socket.off("newQuestion");
  socket.off("timerUpdate");
  socket.off("playerAnswered");
  socket.off("questionResult");
  socket.off("hostAnswerReview");
  socket.off("gameOver");
  socket.off("error");
  socket.off("roomClosed");
  socket.off("roomVerified");
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
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
