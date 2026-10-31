<template>
  <SectionCard title="战备">
    <template #icon>
      <svg class="icon-svg" viewBox="0 0 24 24">
        <path
          d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
          fill="#40a9ff"
        />
      </svg>
    </template>

    <ul class="team-list">
      <li v-if="members.length === 0" class="empty-hint">队伍整备中，无常驻出击成员</li>
      <li v-for="member in members" :key="member.name" class="member-card">
        <div class="member-top">
          <span class="member-name">{{ member.name }}</span>
          <div class="power-group">
            <span class="power-badge-base">基础战力 {{ member.basePower }}</span>
            <span class="power-badge-current">当前战力 {{ member.power }}</span>
          </div>
        </div>

        <div>
          <div class="sub-bar-label">
            <span>源质余额</span>
            <span class="sub-bar-val">{{ member.energy }}</span>
          </div>
          <div class="fluid-progress-bg">
            <div class="fluid-progress-bar" :style="{ width: `${member.energy}%` }"></div>
          </div>
        </div>

        <div class="bipolar-meter-wrap">
          <div class="sub-bar-label">
            <span>情绪波动</span>
            <span class="sub-bar-val mood-val-strong" :style="{ color: getMoodTextColor(member.mood) }">
              {{ member.mood }}
            </span>
          </div>
          <div class="bipolar-track">
            <div class="bipolar-center-line"></div>
            <div class="bipolar-bar-left" :style="{ width: `${member.moodHalfWidth}%` }"></div>
            <div class="bipolar-bar-right" :style="{ width: `${member.moodHalfWidth}%` }"></div>
          </div>
        </div>
      </li>
    </ul>
  </SectionCard>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import { getMoodTextColor } from '../utils';
import SectionCard from './SectionCard.vue';

const store = useDataStore();

/* 战力公式 = 基础战力 * (源质余额 / 100) * (1 + 情绪波动 / 100) */
const members = computed(() =>
  _(store.data.镜头人物)
    .entries()
    .map(([name, info]) => ({
      name,
      basePower: info.基础战力,
      power: Math.round(info.基础战力 * (info.源质余额 / 100) * (1 + info.情绪波动 / 100)),
      energy: info.源质余额,
      mood: info.情绪波动,
      moodHalfWidth: (info.情绪波动 / 100) * 50,
    }))
    .value(),
);
</script>

<style lang="scss" scoped>
.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.member-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(64, 169, 255, 0.2);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.member-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 4px;
}

.member-name {
  font-weight: 600;
  color: #e6f7ff;
  font-size: 13px;
}

.power-group {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.power-badge-base {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1px 5px;
  border-radius: 4px;
  color: #d9d9d9;
  font-family: monospace;
}

.power-badge-current {
  font-size: 11px;
  background: rgba(24, 144, 255, 0.25);
  border: 1px solid rgba(64, 169, 255, 0.4);
  padding: 1px 5px;
  border-radius: 4px;
  color: #91d5ff;
  font-weight: bold;
  font-family: monospace;
}

.sub-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #8c8c8c;
  margin-bottom: 2px;
}

.sub-bar-val {
  color: #adc6ff;
  font-family: monospace;
}

.mood-val-strong {
  font-weight: 800;
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.fluid-progress-bg {
  width: 100%;
  height: 7px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  border: 1px solid rgba(64, 169, 255, 0.2);
  overflow: hidden;
  position: relative;
}

.fluid-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #36cfc9);
  box-shadow: 0 0 8px rgba(54, 207, 201, 0.6);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.bipolar-meter-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

.bipolar-track {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 3px;
  overflow: hidden;
}

.bipolar-center-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  background: rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.bipolar-bar-left,
.bipolar-bar-right {
  position: absolute;
  top: 0;
  bottom: 0;
  transition: width 0.3s ease;
}

.bipolar-bar-left {
  right: 50%;
  background: linear-gradient(to left, #e6f7ff 0%, #ff7875 50%, #820014 100%);
  box-shadow: 0 0 6px rgba(255, 77, 79, 0.4);
}

.bipolar-bar-right {
  left: 50%;
  background: linear-gradient(to right, #e6f7ff 0%, #ff7875 50%, #820014 100%);
  box-shadow: 0 0 6px rgba(255, 77, 79, 0.4);
}
</style>
