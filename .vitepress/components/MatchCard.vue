<script setup>
import { computed } from 'vue'

const match={
      "date": "2023-10-05",
      "tournament": "亚运会 (Asian Games)",
      "round": "Men's Singles - Final",
      "status": "Finished", // or 'Live', 'Upcoming'
      "p1": { "name": "Shi Yu Qi", "country": "CHN", "is_winner": false },
      "p2": { "name": "Li Shi Feng", "country": "CHN", "is_winner": true },
      "scores": ["21-23", "13-21"] // 字符串数组
    }

// 简单的状态颜色辅助函数
const statusClass = computed(() => {
  if (match.status === 'Live') return 'status-live'
  if (match.status === 'Upcoming') return 'status-upcoming'
  return 'status-finished'
})
</script>

<template>
  <div class="match-card">
    <div class="card-header">
      <span class="tournament-name">{{ match.tournament }}</span>
      <span class="round-info">{{ match.round }}</span>
    </div>

    <div class="card-body">
      <div class="player player-left" :class="{ 'winner': match.p1.is_winner }">
        <span class="country">{{ match.p1.country }}</span>
        <span class="name">{{ match.p1.name }}</span>
      </div>

      <div class="score-board">
        <div class="status-badge" :class="statusClass">{{ match.status }}</div>
        <div class="scores">
          <span v-for="(set, index) in match.scores" :key="index" class="set-score">
            {{ set }}
          </span>
        </div>
      </div>

      <div class="player player-right" :class="{ 'winner': match.p2.is_winner }">
        <span class="name">{{ match.p2.name }}</span>
        <span class="country">{{ match.p2.country }}</span>
      </div>
    </div>
    
    <div class="card-footer">
      {{ match.date }}
    </div>
  </div>
</template>

<style scoped>
.match-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  margin-bottom: 16px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
  border-bottom: 1px dashed var(--vp-c-divider);
  padding-bottom: 8px;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

.player-left { align-items: flex-start; }
.player-right { align-items: flex-end; text-align: right; }

.player.winner .name {
  color: #E60012; /* 冠军红 */
  font-weight: 800;
}

.country {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.score-board {
  flex: 0 0 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  margin-bottom: 6px;
  font-weight: bold;
}
.status-finished { background: #eee; color: #666; }
.status-live { background: #ffebeb; color: #E60012; animation: pulse 1.5s infinite; }
.status-upcoming { background: #e6f7ff; color: #1890ff; }

.scores {
  display: flex;
  gap: 8px;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: bold;
}

.card-footer {
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* 移动端适配 */
@media (max-width: 600px) {
  .card-body { flex-direction: column; gap: 10px; }
  .player-left, .player-right { align-items: center; text-align: center; }
  .score-board { margin: 5px 0; }
}
</style>
