<template>
  <button
    :class="[
      'font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      variantClasses,
      sizeClasses,
      className,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="inline-block mr-2">
      <svg
        class="animate-spin h-5 w-5 inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  className: "",
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const variantClasses = computed(() => {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-primary-500/50 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg hover:shadow-secondary-500/50 hover:scale-105",
    outline:
      "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:scale-105",
    ghost: "text-white/80 hover:bg-white/10 hover:text-white",
    danger:
      "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-accent-500/50 hover:scale-105",
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg py-4 px-8",
  };
  return sizes[props.size];
});
</script>
