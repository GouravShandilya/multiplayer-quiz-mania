<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium mb-2 text-white/80">
      {{ label }}
      <span v-if="required" class="text-accent-400">*</span>
    </label>

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="['input-field', error && 'border-accent-500', className]"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />

    <p v-if="error" class="mt-1 text-sm text-accent-400">
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-1 text-sm text-white/50">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  type?: "text" | "email" | "password" | "number";
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
  className: "",
});

defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
  focus: [];
}>();
</script>
