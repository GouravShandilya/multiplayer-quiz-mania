<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <!-- Question Text -->
    <div
      class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 mb-8 text-center shadow-2xl border border-white/10 animate-slide-up"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-white leading-relaxed">
        {{ question.text }}
      </h2>
    </div>

    <!-- Options Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="handleClick(index)"
        :disabled="disabled"
        class="relative group h-24 md:h-28 rounded-2xl p-6 text-left transition-all duration-300 transform disabled:cursor-not-allowed overflow-hidden"
        :class="[
          getButtonClasses(index),
          !disabled && 'hover:scale-[1.02] hover:shadow-xl active:scale-95',
          disabled && 'opacity-70',
        ]"
      >
        <!-- Background Gradient Overlay -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent"
        ></div>

        <!-- Shape/Icon -->
        <div
          class="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity"
        >
          <span class="text-3xl font-bold text-white/50">{{
            ["▲", "●", "■", "◆"][index]
          }}</span>
        </div>

        <!-- Option Content -->
        <div class="relative z-10 flex items-center h-full">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mr-4 shrink-0"
            :class="getLetterBadgeClass(index)"
          >
            {{ ["A", "B", "C", "D"][index] }}
          </div>
          <span
            class="text-lg md:text-xl font-semibold text-white drop-shadow-md"
          >
            {{ option }}
          </span>
        </div>

        <!-- Selection Indicator -->
        <div
          v-if="selectedOption === index"
          class="absolute inset-0 ring-4 ring-white rounded-2xl pointer-events-none"
        ></div>

        <!-- Correct/Wrong Indicators -->
        <div
          v-if="showResult && index === correctOption"
          class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-once"
        >
          <span class="text-green-600 font-bold">✓</span>
        </div>
        <div
          v-if="
            showResult && selectedOption === index && index !== correctOption
          "
          class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span class="text-red-600 font-bold">✗</span>
        </div>
      </button>
    </div>

    <!-- Host Indicator -->
    <div v-if="isHost" class="mt-6 text-center">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm"
      >
        <span class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
        Viewing as Host (cannot select answers)
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedOption: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showResult: {
    type: Boolean,
    default: false,
  },
  correctOption: {
    type: Number,
    default: null,
  },
  isHost: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["answer"]);

const handleClick = (index) => {
  if (!props.disabled && !props.isHost) {
    emit("answer", index);
  }
};

const baseColor = "bg-gradient-to-br from-slate-700 to-slate-800";

const getButtonClasses = (index) => {
  if (props.showResult) {
    if (index === props.correctOption) {
      return "bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30 shadow-xl";
    }
    if (props.selectedOption === index && index !== props.correctOption) {
      return "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30 shadow-xl";
    }
    return baseColor + " opacity-40";
  }

  if (props.selectedOption === index) {
    return baseColor + " shadow-xl ring-2 ring-white/50";
  }

  return baseColor + " hover:from-slate-600 hover:to-slate-700";
};

const getLetterBadgeClass = (index) => {
  if (props.showResult && index === props.correctOption) {
    return "bg-white text-green-600";
  }
  if (
    props.showResult &&
    props.selectedOption === index &&
    index !== props.correctOption
  ) {
    return "bg-white/20 text-white";
  }
  return "bg-white/20 text-white";
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-bounce-once {
  animation: bounceOnce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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

@keyframes bounceOnce {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
