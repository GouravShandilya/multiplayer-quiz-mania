<template>
  <div class="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black text-white p-6 flex items-center justify-center">
    <div class="max-w-4xl w-full">
      <header class="flex items-center justify-between mb-8 animate-slide-up">
        <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 drop-shadow-lg">
          Create New Game
        </h1>
        <NuxtLink 
          to="/" 
          class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium backdrop-blur-md"
        >
          Cancel
        </NuxtLink>
      </header>

      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-slide-up" style="animation-delay: 0.1s">
        <!-- Host Name -->
        <div class="mb-8">
          <label class="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Your Name</label>
          <input 
            v-model="hostName"
            type="text" 
            placeholder="Enter your name"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
          />
        </div>

        <!-- Game Settings -->
        <div class="mb-8">
          <label class="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Question Source</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              @click="mode = 'default'"
              class="relative p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group overflow-hidden"
              :class="mode === 'default' ? 'border-primary-500 bg-primary-500/10 text-primary-400 shadow-lg shadow-primary-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:border-white/20'"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" v-if="mode !== 'default'"></div>
              <span class="text-4xl transform group-hover:scale-110 transition-transform duration-300">🎲</span>
              <div class="text-center relative z-10">
                <span class="font-bold text-lg block mb-1">Default Questions</span>
                <span class="text-xs opacity-70">Use pre-made general knowledge questions</span>
              </div>
            </button>
            <button 
              @click="mode = 'custom'"
              class="relative p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 group overflow-hidden"
              :class="mode === 'custom' ? 'border-secondary-500 bg-secondary-500/10 text-secondary-400 shadow-lg shadow-secondary-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:border-white/20'"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" v-if="mode !== 'custom'"></div>
              <span class="text-4xl transform group-hover:scale-110 transition-transform duration-300">✏️</span>
              <div class="text-center relative z-10">
                <span class="font-bold text-lg block mb-1">Custom Questions</span>
                <span class="text-xs opacity-70">Create your own quiz questions</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Custom Questions Form -->
        <div v-if="mode === 'custom'" class="space-y-6 animate-fade-in">
          <div v-for="(q, index) in customQuestions" :key="index" class="bg-black/20 p-6 rounded-2xl border border-white/5 relative group hover:border-white/10 transition-colors">
            <button 
              @click="removeQuestion(index)"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              title="Remove Question"
            >
              ✕
            </button>
            
            <div class="mb-4">
              <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Question {{ index + 1 }}</label>
              <input 
                v-model="q.text"
                type="text" 
                placeholder="Enter your question here..."
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(opt, optIndex) in q.options" :key="optIndex" class="relative group/option">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 pointer-events-none">
                  {{ ['A', 'B', 'C', 'D'][optIndex] }}
                </div>
                <input 
                  v-model="q.options[optIndex]"
                  type="text" 
                  :placeholder="`Option ${optIndex + 1}`"
                  class="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-10 py-3 text-sm text-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                  :class="{'ring-2 ring-green-500/50 border-green-500/50 bg-green-500/5': q.correctOptionIndex === optIndex}"
                />
                <button 
                  @click="q.correctOptionIndex = optIndex"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border flex items-center justify-center transition-all"
                  :class="q.correctOptionIndex === optIndex ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-500/20' : 'border-gray-600 text-gray-600 hover:border-gray-400 hover:text-gray-400'"
                  title="Mark as correct answer"
                >
                  <span v-if="q.correctOptionIndex === optIndex" class="text-xs font-bold">✓</span>
                </button>
              </div>
            </div>
          </div>

          <button 
            @click="addQuestion"
            class="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <span>+</span> Add Another Question
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {{ errorMsg }}
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button 
            @click="createGame"
            :disabled="!canCreate || isCreating"
            class="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/25 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
          >
            <span v-if="isCreating" class="animate-spin">⏳</span>
            {{ isCreating ? 'Creating...' : 'Create Lobby' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSocket, connectSocket, setHostCredentials } from '~/services/socket';

const router = useRouter();
const mode = ref('default');
const hostName = ref('');
const isCreating = ref(false);
const errorMsg = ref('');

const customQuestions = ref([
  {
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0
  }
]);

const addQuestion = () => {
  customQuestions.value.push({
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0
  });
};

const removeQuestion = (index) => {
  if (customQuestions.value.length > 1) {
    customQuestions.value.splice(index, 1);
  }
};

const canCreate = computed(() => {
  if (!hostName.value.trim()) return false;
  if (mode.value === 'default') return true;
  return customQuestions.value.every(q => 
    q.text.trim() && 
    q.options.every(o => o.trim())
  );
});

const createGame = () => {
  if (!canCreate.value || isCreating.value) return;
  
  isCreating.value = true;
  errorMsg.value = '';
  
  connectSocket();
  const socket = useSocket();
  
  const payload = {
    hostName: hostName.value.trim(),
    customQuestions: mode.value === 'custom' ? customQuestions.value : null
  };
  
  // Listen for errors
  socket.once('error', (data) => {
    errorMsg.value = data.message;
    isCreating.value = false;
  });

  socket.emit('createRoom', payload);
  
  socket.once('roomCreated', ({ roomCode, hostToken }) => {
    // Store host credentials securely
    setHostCredentials(roomCode, hostToken);
    
    isCreating.value = false;
    router.push(`/host/lobby?code=${roomCode}`);
  });

  // Timeout fallback
  setTimeout(() => {
    if (isCreating.value) {
      errorMsg.value = 'Connection timeout. Please try again.';
      isCreating.value = false;
    }
  }, 10000);
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
