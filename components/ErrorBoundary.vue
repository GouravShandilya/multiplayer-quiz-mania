<template>
  <div v-if="error" class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      <div class="mb-4 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p class="text-gray-600 mb-6">
        We're sorry, but an unexpected error occurred. Please try refreshing the page.
      </p>
      <div class="space-y-3">
        <button
          @click="reloadPage"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Refresh Page
        </button>
        <button
          @click="clearError"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition duration-200"
        >
          Try Again
        </button>
      </div>
      <div v-if="isDev" class="mt-8 text-left bg-gray-50 p-4 rounded overflow-auto text-xs text-red-800 max-h-48">
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';
import debug from 'debug';

const log = debug('quiz-mania:error');

const error = ref(null);
const isDev = process.env.NODE_ENV === 'development';

onErrorCaptured((err, instance, info) => {
  log('Error captured in boundary: %O %O', err, info);
  error.value = err;
  return false; // Stop propagation
});

const reloadPage = () => {
  window.location.reload();
};

const clearError = () => {
  error.value = null;
};
</script>
