<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
    <div class="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl animate-slide-up">
      <!-- Confetti Effect for Winner -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 text-6xl animate-bounce">🎉</div>
      
      <h2 class="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg mt-8">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400">
          Final Results
        </span>
      </h2>

      <!-- Top 3 Podium -->
      <div class="flex justify-center items-end gap-4 mb-12 h-52">
        <!-- 2nd Place -->
        <div v-if="sortedPlayers[1]" class="flex flex-col items-center animate-slide-up" style="animation-delay: 0.2s">
          <PlayerAvatar :name="sortedPlayers[1].name" :avatar="sortedPlayers[1].avatar" size="lg" class="mb-2 border-4 border-gray-300 shadow-xl" />
          <div class="w-24 h-32 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl flex flex-col items-center justify-end pb-3 shadow-lg relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10"></div>
            <span class="text-3xl font-black text-gray-800 relative z-10">2</span>
            <span class="text-sm font-bold text-gray-700 relative z-10">{{ sortedPlayers[1].score }} pts</span>
          </div>
          <span class="text-white font-semibold mt-2 truncate max-w-[100px] text-center">{{ sortedPlayers[1].name }}</span>
        </div>

        <!-- 1st Place -->
        <div v-if="sortedPlayers[0]" class="flex flex-col items-center animate-slide-up z-10" style="animation-delay: 0.1s">
          <div class="relative">
            <PlayerAvatar :name="sortedPlayers[0].name" :avatar="sortedPlayers[0].avatar" size="xl" class="mb-2 border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-500/30" />
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl animate-bounce">👑</div>
          </div>
          <div class="w-28 h-44 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-xl flex flex-col items-center justify-end pb-4 shadow-xl ring-4 ring-yellow-400/30 relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10"></div>
            <span class="text-4xl font-black text-yellow-900 relative z-10">1</span>
            <span class="text-lg font-bold text-yellow-800 relative z-10">{{ sortedPlayers[0].score }} pts</span>
          </div>
          <span class="text-yellow-300 font-bold mt-2 text-lg truncate max-w-[120px] text-center">{{ sortedPlayers[0].name }}</span>
        </div>

        <!-- 3rd Place -->
        <div v-if="sortedPlayers[2]" class="flex flex-col items-center animate-slide-up" style="animation-delay: 0.3s">
          <PlayerAvatar :name="sortedPlayers[2].name" :avatar="sortedPlayers[2].avatar" size="lg" class="mb-2 border-4 border-orange-400 shadow-xl" />
          <div class="w-24 h-24 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-xl flex flex-col items-center justify-end pb-2 shadow-lg relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10"></div>
            <span class="text-2xl font-black text-orange-900 relative z-10">3</span>
            <span class="text-sm font-bold text-orange-800 relative z-10">{{ sortedPlayers[2].score }} pts</span>
          </div>
          <span class="text-white font-semibold mt-2 truncate max-w-[100px] text-center">{{ sortedPlayers[2].name }}</span>
        </div>
      </div>

      <!-- List of other players -->
      <div v-if="sortedPlayers.length > 3" class="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar mb-6">
        <div
          v-for="(player, index) in sortedPlayers.slice(3)"
          :key="player.id"
          class="flex items-center bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors"
        >
          <span class="text-gray-400 font-bold w-8 text-center">{{ index + 4 }}</span>
          <PlayerAvatar :name="player.name" :avatar="player.avatar" size="sm" class="mr-3" />
          <span class="text-white font-medium flex-1 truncate">{{ player.name }}</span>
          <div class="flex items-center gap-4">
            <div class="text-xs text-gray-400 flex flex-col items-end">
              <span class="text-green-400">✓ {{ player.correctCount }}</span>
              <span class="text-red-400">✗ {{ player.wrongCount }}</span>
            </div>
            <span class="text-xl font-bold text-white w-16 text-right">{{ player.score }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 mt-8">
        <button
          v-if="showAnswerHistoryBtn"
          @click="$emit('viewAnswers')"
          class="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span>📋</span>
          View My Answers
        </button>
        <button
          @click="$emit('close')"
          class="flex-1 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          Back to Home
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlayerAvatar from "~/components/ui/PlayerAvatar.vue";

const props = defineProps({
  players: {
    type: Array,
    required: true,
  },
  showAnswerHistoryBtn: {
    type: Boolean,
    default: true,
  }
});

defineEmits(['close', 'viewAnswers']);

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.score - a.score);
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
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
