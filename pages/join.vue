<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <ui-card class="animate-fade-in">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg shadow-secondary-500/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Join Game</h1>
          <p class="text-white/60">Enter your details to join the quiz</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="joinGame" class="space-y-6">
          <ui-input
            v-model="playerName"
            label="Your Name"
            placeholder="Enter your name"
            required
            :error="errors.name"
          />

          <ui-input
            v-model="gameCodeInput"
            label="Game Code"
            placeholder="Enter 6-digit code"
            required
            :error="errors.code"
            class-name="uppercase font-mono"
          />

          <div class="space-y-3">
            <ui-button
              type="submit"
              variant="secondary"
              size="lg"
              class="w-full"
              :loading="isJoining"
              :disabled="!isFormValid"
            >
              Join Game
            </ui-button>

            <ui-button
              variant="ghost"
              size="md"
              class="w-full"
              @click="navigateHome"
            >
              Back to Home
            </ui-button>
          </div>
        </form>

        <!-- Info -->
        <div class="mt-6 p-4 bg-white/5 rounded-xl">
          <p class="text-sm text-white/60 text-center">
            Don't have a code? Ask the host to share it with you.
          </p>
        </div>
      </ui-card>

      <!-- Quick Join Banner (if code in URL) -->
      <div v-if="prefilledCode" class="mt-4 text-center animate-slide-up">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm"
        >
          <span
            class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"
          ></span>
          Game code detected! Just enter your name.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const playerName = ref("");
const gameCodeInput = ref("");
const isJoining = ref(false);
const errors = ref({
  name: "",
  code: "",
});

// Check if code is provided in URL query
const prefilledCode = computed(() => route.query.code as string);

onMounted(() => {
  if (prefilledCode.value) {
    gameCodeInput.value = prefilledCode.value;
  }
});

const isFormValid = computed(() => {
  return (
    playerName.value.trim().length > 0 &&
    gameCodeInput.value.trim().length === 6
  );
});

const validateForm = () => {
  errors.value = { name: "", code: "" };
  let isValid = true;

  if (playerName.value.trim().length === 0) {
    errors.value.name = "Please enter your name";
    isValid = false;
  }

  if (gameCodeInput.value.trim().length === 0) {
    errors.value.code = "Please enter a game code";
    isValid = false;
  } else if (gameCodeInput.value.trim().length !== 6) {
    errors.value.code = "Game code must be 6 characters";
    isValid = false;
  }

  return isValid;
};

const joinGame = async () => {
  if (!validateForm()) return;

  isJoining.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, validate game code with backend
    const gameCode = gameCodeInput.value.toUpperCase();

    // Store player info (in real app, this would be sent to server)
    if (process.client) {
      sessionStorage.setItem("playerName", playerName.value);
      sessionStorage.setItem("gameCode", gameCode);
    }

    // Navigate to game
    router.push(`/game/${gameCode}`);
  } catch (error) {
    errors.value.code = "Invalid game code. Please try again.";
  } finally {
    isJoining.value = false;
  }
};

const navigateHome = () => {
  router.push("/");
};
</script>
