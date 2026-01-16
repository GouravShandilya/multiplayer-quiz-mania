<template>
  <div class="card-base p-6 space-y-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Leaderboard</h3>
      <span class="text-sm text-muted-foreground">{{ players.length }} players</span>
    </div>
    
    <div class="space-y-2">
      <div 
        v-for="(player, index) in sortedPlayers" 
        :key="player.id"
        class="flex items-center gap-3 p-3 rounded-md transition-colors"
        :class="index === 0 ? 'bg-foreground/5 border border-foreground/10' : 'hover:bg-accent'"
      >
        <div class="flex-shrink-0 w-8 text-center">
          <span 
            class="font-bold"
            :class="getRankClass(index)"
          >
            {{ index + 1 }}
          </span>
        </div>
        
        <PlayerAvatar 
          :name="player.name" 
          :show-name="false"
          class="flex-shrink-0"
        />
        
        <div class="flex-1 min-w-0">
          <div class="font-semibold truncate">{{ player.name }}</div>
        </div>
        
        <div class="flex-shrink-0">
          <div class="text-right">
            <div class="font-bold">{{ player.score }}</div>
            <div class="text-xs text-muted-foreground">points</div>
          </div>
        </div>
        
        <div v-if="index === 0" class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Player {
  id: string
  name: string
  score: number
}

interface Props {
  players: Player[]
}

const props = defineProps<Props>()

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.score - a.score)
})

const getRankClass = (index: number) => {
  if (index === 0) return 'text-foreground text-xl'
  if (index === 1) return 'text-foreground/80 text-lg'
  if (index === 2) return 'text-foreground/60 text-lg'
  return 'text-muted-foreground'
}
</script>
