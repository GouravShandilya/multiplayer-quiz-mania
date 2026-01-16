<template>
  <div
    class="relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 shadow-inner"
    :class="sizeClasses"
  >
    <img
      v-if="avatar && avatar !== 'default'"
      :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`"
      :alt="name"
      class="w-full h-full object-cover"
    />
    <span v-else class="text-white font-bold select-none" :class="textSize">
      {{ initials }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "Player",
  },
  avatar: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
  },
});

const initials = computed(() => {
  return props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-8 h-8";
    case "lg":
      return "w-16 h-16";
    case "xl":
      return "w-24 h-24";
    default:
      return "w-12 h-12";
  }
});

const textSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-xs";
    case "lg":
      return "text-xl";
    case "xl":
      return "text-3xl";
    default:
      return "text-base";
  }
});
</script>
