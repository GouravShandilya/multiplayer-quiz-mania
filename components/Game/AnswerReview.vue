<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
    <div class="w-full max-w-3xl bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl animate-slide-up">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="text-sm text-gray-400 uppercase tracking-wider mb-1">Question {{ reviewData.questionIndex + 1 }} Review</p>
          <h2 class="text-2xl font-bold text-white">Answer Statistics</h2>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-sm font-medium" 
            :class="reviewData.isLastQuestion ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'">
            {{ reviewData.isLastQuestion ? 'Final Question' : 'More Questions' }}
          </span>
        </div>
      </div>

      <!-- Question -->
      <div class="bg-white/5 rounded-2xl p-6 mb-6 border border-white/5">
        <p class="text-xl text-white font-medium">{{ reviewData.questionText }}</p>
      </div>

      <!-- Answer Distribution -->
      <div class="grid gap-3 mb-6">
        <div 
          v-for="(option, index) in reviewData.options" 
          :key="index"
          class="flex items-center gap-4 p-4 rounded-xl transition-all"
          :class="[
            index === reviewData.correctOptionIndex 
              ? 'bg-green-500/20 border-2 border-green-500/50' 
              : 'bg-white/5 border border-white/5'
          ]"
        >
          <!-- Option Label -->
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
            :class="index === reviewData.correctOptionIndex ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'"
          >
            {{ ['A', 'B', 'C', 'D'][index] }}
          </div>
          
          <!-- Option Text -->
          <div class="flex-1">
            <p class="text-white font-medium">{{ option }}</p>
            <p v-if="index === reviewData.correctOptionIndex" class="text-green-400 text-sm flex items-center gap-1">
              <span>✓</span> Correct Answer
            </p>
          </div>

          <!-- Vote Count/Bar -->
          <div class="w-32 flex items-center gap-2">
            <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500"
                :class="index === reviewData.correctOptionIndex ? 'bg-green-500' : 'bg-white/30'"
                :style="{ width: `${getPercentage(index)}%` }"
              ></div>
            </div>
            <span class="text-white font-bold text-sm w-8 text-right">{{ reviewData.answerStats[index] || 0 }}</span>
          </div>
        </div>
      </div>

      <!-- Player Breakdown -->
      <div class="bg-white/5 rounded-2xl p-4 mb-6 max-h-40 overflow-y-auto">
        <p class="text-sm text-gray-400 uppercase tracking-wider mb-3">Player Answers</p>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="player in reviewData.playerAnswers" 
            :key="player.id"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
            :class="player.isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'"
          >
            <span>{{ player.isCorrect ? '✓' : '✗' }}</span>
            <span class="font-medium">{{ player.name }}</span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        @click="$emit('advance')"
        class="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
      >
        {{ reviewData.isLastQuestion ? 'Show Leaderboard' : 'Next Question' }}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reviewData: {
    type: Object,
    required: true,
    // Expected: { questionIndex, questionText, options, correctOptionIndex, answerStats, playerAnswers, isLastQuestion }
  }
});

defineEmits(['advance']);

const getPercentage = (index) => {
  const total = Object.values(props.reviewData.answerStats).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return ((props.reviewData.answerStats[index] || 0) / total) * 100;
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
</style>
