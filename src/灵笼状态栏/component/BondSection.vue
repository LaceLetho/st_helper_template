<template>
  <SectionCard title="羁绊">
    <template #icon>
      <svg class="icon-svg" viewBox="0 0 24 24">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#40a9ff"
        />
      </svg>
    </template>

    <ul class="bonds-list">
      <li v-if="bonds.length === 0" class="empty-hint">暂无羁绊联结</li>
      <li v-for="bond in bonds" :key="bond.name" class="bond-item">
        <div class="bond-header">
          <span class="bond-name">{{ bond.name }}</span>
          <span class="bond-val" :style="{ color: bond.color }">{{ bond.value }}</span>
        </div>
        <div class="bond-progress-bg">
          <div
            class="bond-progress-bar"
            :style="{ width: `${bond.percent}%`, backgroundColor: bond.color, boxShadow: `0 0 6px ${bond.color}` }"
          ></div>
        </div>
      </li>
    </ul>
  </SectionCard>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import { getBondColor } from '../utils';
import SectionCard from './SectionCard.vue';

const store = useDataStore();

const bonds = computed(() =>
  _(store.data.角色好感度)
    .entries()
    .map(([name, value]) => ({
      name,
      value,
      percent: ((value + 100) / 200) * 100,
      color: getBondColor(value),
    }))
    .value(),
);
</script>

<style lang="scss" scoped>
.bonds-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.bond-item {
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(64, 169, 255, 0.2);
}

.bond-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
}

.bond-name {
  font-weight: 500;
  color: #fff0f6;
}

.bond-val {
  font-family: monospace;
  font-weight: 600;
}

.bond-progress-bg {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.bond-progress-bar {
  height: 100%;
  border-radius: 3px;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}
</style>
