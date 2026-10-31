<template>
  <li class="asset-item">
    <span class="asset-type-badge">{{ type }}</span>
    <span class="asset-name">{{ name }}</span>
    <button
      v-if="detail.trim() !== ''"
      ref="button"
      type="button"
      class="asset-info-btn"
      :class="{ active }"
      aria-label="查看详情"
      @click="active = !active"
    >
      !
      <div class="asset-tooltip">{{ detail }}</div>
    </button>
  </li>
</template>

<script setup lang="ts">
defineProps<{ name: string; type: string; detail: string }>();

const active = ref(false);
const button = ref<HTMLButtonElement | null>(null);

/* 点击页面其他空白处时，自动收起已打开的详情浮层 */
onClickOutside(button, () => {
  active.value = false;
});
</script>

<style lang="scss" scoped>
.asset-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  position: relative;
}

.asset-type-badge {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(64, 169, 255, 0.2);
  color: #b5f5ec;
}

.asset-name {
  color: #e6f7ff;
  font-weight: 500;
}

.asset-info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(64, 169, 255, 0.15);
  border: 1px solid rgba(64, 169, 255, 0.4);
  color: #70c0ff;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  font-family: monospace;
  font-weight: bold;
  transition: all 0.2s ease;
  outline: none;
  position: relative;
  user-select: none;
}

.asset-info-btn:hover,
.asset-info-btn:focus,
.asset-info-btn.active {
  background: rgba(64, 169, 255, 0.35);
  color: #ffffff;
  border-color: #40a9ff;
  box-shadow: 0 0 6px rgba(64, 169, 255, 0.6);
}

.asset-tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(10, 25, 47, 0.95);
  color: #d6e4ff;
  border: 1px solid rgba(64, 169, 255, 0.4);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 1.4;
  white-space: normal;
  width: max-content;
  max-width: 240px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.6),
    0 0 8px rgba(64, 169, 255, 0.2);
  z-index: 100;
  pointer-events: none;
  word-break: break-all;
}

.asset-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(64, 169, 255, 0.4) transparent transparent transparent;
}

.asset-info-btn:hover .asset-tooltip,
.asset-info-btn:focus .asset-tooltip,
.asset-info-btn.active .asset-tooltip {
  display: block;
}
</style>
