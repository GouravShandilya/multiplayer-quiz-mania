<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-white/80">Time Remaining</span>
      <span class="text-lg font-bold text-white">{{ formattedTime }}</span>
    </div>

    <div class="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
      <div
        :class="[
          'absolute top-0 left-0 h-full transition-all duration-1000 ease-linear rounded-full',
          progressColorClass,
        ]"
        :style="{ width: `${percentage}%` }"
      >
        <div class="absolute inset-0 animate-pulse bg-white/20"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalTime: number; // in seconds
  currentTime: number; // in seconds
}

const props = defineProps<Props>();

const percentage = computed(() => {
  return Math.max(
    0,
    Math.min(100, (props.currentTime / props.totalTime) * 100)
  );
});

const formattedTime = computed(() => {
  const minutes = Math.floor(props.currentTime / 60);
  const seconds = props.currentTime % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const progressColorClass = computed(() => {
  if (percentage.value > 50) {
    return "bg-gradient-to-r from-primary-500 to-primary-600";
  } else if (percentage.value > 20) {
    return "bg-gradient-to-r from-yellow-500 to-orange-500";
  } else {
    return "bg-gradient-to-r from-accent-500 to-accent-600 animate-pulse";
  }
});
</script>
