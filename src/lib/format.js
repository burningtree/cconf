/** Compact duration from seconds: "2.05 ms", "1.58 s". */
export function fmtDuration(sec) {
  if (!isFinite(sec)) return '∞';
  if (sec < 1) return `${(sec * 1000).toFixed(sec < 0.01 ? 2 : sec < 0.1 ? 1 : 0)} ms`;
  if (sec < 60) return `${sec.toFixed(2)} s`;
  const m = Math.floor(sec / 60);
  return `${m}m ${String(Math.round(sec % 60)).padStart(2, '0')}s`;
}

/** Bit rate from bits/sec: "1.76 kbps", "915 bps". */
export function fmtRate(bps) {
  if (!isFinite(bps)) return '—';
  if (bps >= 1000) return `${(bps / 1000).toFixed(2)} kbps`;
  return `${Math.round(bps)} bps`;
}
