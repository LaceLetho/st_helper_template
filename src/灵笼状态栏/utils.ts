export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export function getMoodTextColor(val: number) {
  if (val < 25) return '#e6f7ff';
  if (val < 50) return '#ffa39e';
  if (val < 75) return '#ff4d4f';
  return '#cf1322';
}

/* 好感度颜色计算：
   -100 到 0：绿色 rgb(0, 139, 0) 渐变至 灰色 rgb(190, 190, 190)
   0 到 100：灰色 rgb(190, 190, 190) 渐变至 粉红色 rgb(255, 105, 180) */
export function getBondColor(val: number) {
  const v = clamp(val, -100, 100);
  if (v <= 0) {
    const ratio = (v + 100) / 100;
    const r = Math.round(0 + (190 - 0) * ratio);
    const g = Math.round(139 + (190 - 139) * ratio);
    const b = Math.round(0 + (190 - 0) * ratio);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else {
    const ratio = v / 100;
    const r = Math.round(190 - (190 - 255) * ratio);
    const g = Math.round(190 - (190 - 105) * ratio);
    const b = Math.round(190 - (190 - 180) * ratio);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
