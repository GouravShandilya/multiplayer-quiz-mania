<template>
  <div
    :class="[
      'glass-effect rounded-2xl shadow-xl transition-all duration-300',
      hoverable && 'hover:shadow-2xl hover:scale-[1.02] cursor-pointer',
      className,
    ]"
    @click="hoverable && $emit('click', $event)"
  >
    <div v-if="$slots.header" class="border-b border-white/10 px-6 py-4">
      <slot name="header" />
    </div>

    <div class="p-6">
      <slot />
    </div>

    <div v-if="$slots.footer" class="border-t border-white/10 px-6 py-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
  className: "",
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
