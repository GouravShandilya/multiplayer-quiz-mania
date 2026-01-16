<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
    <div class="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-white/10 shrink-0">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">Your Answers</h2>
            <p class="text-gray-400 text-sm">Review how you did on each question</p>
          </div>
          <button 
            @click="$emit('close')"
            class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Stats Summary -->
        <div class="flex gap-4 mt-4">
          <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
            <span class="text-green-400 text-lg">✓</span>
            <span class="text-green-300 font-bold">{{ stats.correctCount }}</span>
            <span class="text-green-400/70 text-sm">correct</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <span class="text-red-400 text-lg">✗</span>
            <span class="text-red-300 font-bold">{{ stats.wrongCount }}</span>
            <span class="text-red-400/70 text-sm">wrong</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500/10 border border-primary-500/20 ml-auto">
            <span class="text-primary-300 font-bold text-lg">{{ stats.score }}</span>
            <span class="text-primary-400/70 text-sm">points</span>
          </div>
        </div>
      </div>

      <!-- Questions List -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        <div 
          v-for="(answer, index) in answerHistory" 
          :key="index"
          class="rounded-2xl border transition-all"
          :class="answer.isCorrect 
            ? 'bg-green-500/5 border-green-500/20' 
            : 'bg-red-500/5 border-red-500/20'"
        >
          <!-- Question Header -->
          <div class="flex items-center gap-3 p-4 border-b border-white/5">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              :class="answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
            >
              {{ answer.isCorrect ? '✓' : '✗' }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white font-medium text-sm truncate">Question {{ index + 1 }}</p>
              <p class="text-xs" :class="answer.isCorrect ? 'text-green-400' : 'text-red-400'">
                {{ answer.isCorrect ? `+${answer.pointsEarned} points` : 'No points' }}
              </p>
            </div>
          </div>

          <!-- Question Content -->
          <div class="p-4">
            <p class="text-white text-sm mb-4">{{ answer.questionText }}</p>
            
            <div class="grid gap-2">
              <div 
                v-for="(option, optIndex) in answer.options" 
                :key="optIndex"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
                :class="getOptionClass(answer, optIndex)"
              >
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  :class="getOptionBadgeClass(answer, optIndex)">
                  {{ ['A', 'B', 'C', 'D'][optIndex] }}
                </span>
                <span class="flex-1 truncate">{{ option }}</span>
                <span v-if="optIndex === answer.correctAnswer" class="text-green-400 text-xs">✓ Correct</span>
                <span v-else-if="optIndex === answer.playerAnswer && !answer.isCorrect" class="text-red-400 text-xs">Your pick</span>
              </div>
            </div>

            <div v-if="answer.playerAnswer === null" class="mt-3 text-center text-yellow-500/70 text-xs">
              ⚠️ You didn't answer this question
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-white/10 shrink-0">
        <button 
          @click="$emit('close')"
          class="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
        >
          Back to Leaderboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  answerHistory: {
    type: Array,
    required: true,
    // Expected: [{ questionIndex, questionText, options, playerAnswer, correctAnswer, isCorrect, pointsEarned }]
  },
  stats: {
    type: Object,
    required: true,
    // Expected: { score, correctCount, wrongCount, rank }
  }
});

defineEmits(['close']);

const getOptionClass = (answer, optIndex) => {
  if (optIndex === answer.correctAnswer) {
    return 'bg-green-500/20 border border-green-500/30';
  }
  if (optIndex === answer.playerAnswer && !answer.isCorrect) {
    return 'bg-red-500/20 border border-red-500/30';
  }
  return 'bg-white/5 border border-white/5';
};

const getOptionBadgeClass = (answer, optIndex) => {
  if (optIndex === answer.correctAnswer) {
    return 'bg-green-500 text-white';
  }
  if (optIndex === answer.playerAnswer && !answer.isCorrect) {
    return 'bg-red-500 text-white';
  }
  return 'bg-white/10 text-gray-400';
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
