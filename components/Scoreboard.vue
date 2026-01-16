<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-white">Leaderboard</h2>
      <div class="text-sm text-white/60">{{ players.length }} players</div>
    </div>

    <div class="space-y-3">
      <div
        v-for="(player, index) in sortedPlayers"
        :key="player.id"
        class="animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <ui-player-avatar
          :name="player.name"
          :score="player.score"
          :rank="index + 1"
          :is-leader="index === 0"
        />
      </div>
    </div>

    <div v-if="players.length === 0" class="text-center py-8 text-white/50">
      <p>No players yet. Be the first to join!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Player {
  id: string;
  name: string;
  score: number;
}

interface Props {
  players: Player[];
}

const props = defineProps<Props>();

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.score - a.score);
});
</script>
