<template>
  <div class="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black flex items-center justify-center p-4 overflow-hidden relative">
    
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
    </div>

    <div class="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
      <!-- Left Side: Hero Text -->
      <div class="text-center md:text-left space-y-8 animate-slide-up">
        <div class="space-y-4">
          <div class="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-primary-300 mb-2">
            🚀 The Ultimate Trivia Experience
          </div>
          <h1 class="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl tracking-tight leading-tight">
            Quiz <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Mania</span>
          </h1>
          <p class="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
            Challenge your friends in real-time. Test your knowledge, climb the leaderboard, and become the ultimate quiz champion.
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-5 pt-4 justify-center md:justify-start">
          <button 
            @click="showJoinModal = true"
            class="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 flex items-center gap-2">
              Join Game
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <NuxtLink 
            to="/host/create"
            class="group px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Host Game</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Side: Visual/Illustration -->
      <div class="hidden md:flex justify-center relative">
        <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        <!-- Floating Cards Composition -->
        <div class="relative w-[500px] h-[500px] animate-float-slow">
          <!-- Main Card -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-20">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">Q</div>
                <div>
                  <div class="h-2 w-20 bg-white/20 rounded mb-1"></div>
                  <div class="h-2 w-12 bg-white/10 rounded"></div>
                </div>
              </div>
              <div class="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">00:15</div>
            </div>
            <div class="space-y-3 mb-6">
              <div class="h-24 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/5 flex items-center justify-center">
                <span class="text-5xl">?</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="h-12 bg-white/5 rounded-lg border border-white/5 hover:bg-primary-500/20 hover:border-primary-500/50 transition-colors cursor-pointer"></div>
              <div class="h-12 bg-white/5 rounded-lg border border-white/5 hover:bg-primary-500/20 hover:border-primary-500/50 transition-colors cursor-pointer"></div>
              <div class="h-12 bg-primary-500/20 rounded-lg border border-primary-500/50 flex items-center justify-center">
                <div class="w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
              </div>
              <div class="h-12 bg-white/5 rounded-lg border border-white/5 hover:bg-primary-500/20 hover:border-primary-500/50 transition-colors cursor-pointer"></div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute top-20 right-10 w-16 h-16 bg-secondary-500/20 backdrop-blur-md border border-secondary-500/30 rounded-2xl rotate-12 animate-float-delayed z-10 flex items-center justify-center">
            <span class="text-2xl">🎮</span>
          </div>
          <div class="absolute bottom-32 left-0 w-20 h-20 bg-primary-500/20 backdrop-blur-md border border-primary-500/30 rounded-full -rotate-6 animate-float-reverse z-30 flex items-center justify-center">
             <span class="text-2xl">🏆</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Join Game Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showJoinModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showJoinModal = false"></div>
        <div class="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
          <!-- Decorative gradient -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
          
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">Join Game</h2>
            <p class="text-gray-400 text-sm">Enter the code shared by your host</p>
            <p v-if="errorMsg" class="text-red-500 text-sm mt-2 bg-red-500/10 py-1 px-2 rounded">{{ errorMsg }}</p>
          </div>
          
          <form @submit.prevent="joinGame" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider">Room Code</label>
              <div class="relative">
                <input 
                  v-model="roomCode"
                  type="text" 
                  placeholder="000000"
                  class="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-center text-3xl tracking-[0.5em] font-mono placeholder-gray-700 transition-all"
                  required
                  maxlength="6"
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-gray-400 text-xs font-bold uppercase tracking-wider">Your Nickname</label>
              <input 
                v-model="playerName"
                type="text" 
                placeholder="e.g. QuizMaster99"
                class="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div class="pt-4 flex gap-3">
              <button 
                type="button" 
                @click="showJoinModal = false"
                class="flex-1 px-4 py-3.5 bg-white/5 text-gray-300 font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="flex-1 px-4 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all transform active:scale-95"
              >
                Enter Lobby
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSocket, connectSocket } from '~/services/socket';

const router = useRouter();
const showJoinModal = ref(false);
const roomCode = ref('');
const playerName = ref('');
const errorMsg = ref('');
const isJoining = ref(false);

const joinGame = () => {
  if (!roomCode.value || !playerName.value || isJoining.value) return;
  errorMsg.value = '';
  isJoining.value = true;
  
  connectSocket();
  const socket = useSocket();
  
  // Generate a random avatar seed
  const avatar = Math.random().toString(36).substring(7);
  
  // First verify room exists
  socket.emit('verifyRoom', roomCode.value);
  
  const cleanup = () => {
    socket.off('roomVerified');
    socket.off('playerJoined', successHandler);
    socket.off('joinError');
    isJoining.value = false;
  };

  socket.once('roomVerified', (data) => {
    if (!data.exists) {
      errorMsg.value = 'Room not found. Please check the code.';
      cleanup();
      return;
    }
    
    // Room exists, now try to join
    socket.emit('joinRoom', {
      roomCode: roomCode.value,
      playerName: playerName.value,
      avatar
    });
  });

  // Listen for join errors
  socket.once('joinError', (data) => {
    errorMsg.value = data.message;
    cleanup();
  });

  // Listen for successful join
  const successHandler = (data) => {
    const me = data.players.find(p => p.name === playerName.value);
    if (me) {
      cleanup();
      router.push(`/game/${roomCode.value}`);
    }
  };

  socket.on('playerJoined', successHandler);
  
  // Timeout fallback
  setTimeout(() => {
    if (isJoining.value) {
      errorMsg.value = 'Connection timeout. Please try again.';
      cleanup();
    }
  }, 10000);
};
</script>

<style>
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 7s ease-in-out infinite 1s;
}

.animate-float-reverse {
  animation: floatReverse 9s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes slideUp {
  0% { transform: translateY(40px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes floatReverse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}
</style>
