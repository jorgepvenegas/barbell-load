import { type Component, createMemo, For, Show } from "solid-js";
import type { DataPoint } from "@barbell/shared";

interface LineChartProps {
  data: DataPoint[];
  label: string;
  unit: string;
  color?: string;
}

const CHART_W = 320;
const CHART_H = 180;
const PAD_L = 48;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 40;

const formatShortDate = (d: string) => {
  const [, m, day] = d.split("-");
  return `${parseInt(m)}/${parseInt(day)}`;
};

const LineChart: Component<LineChartProps> = (props) => {
  const color = () => props.color ?? "var(--accent-purple)";

  const bounds = createMemo(() => {
    const vals = props.data.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const padding = range * 0.1;
    return { min: min - padding, max: max + padding };
  });

  const plotW = () => CHART_W - PAD_L - PAD_R;
  const plotH = () => CHART_H - PAD_T - PAD_B;

  const toX = (i: number) =>
    PAD_L + (props.data.length === 1 ? plotW() / 2 : (i / (props.data.length - 1)) * plotW());

  const toY = (v: number) => {
    const { min, max } = bounds();
    return PAD_T + plotH() - ((v - min) / (max - min)) * plotH();
  };

  const linePath = createMemo(() => {
    if (props.data.length === 0) return "";
    return props.data
      .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(d.value).toFixed(1)}`)
      .join(" ");
  });

  const areaPath = createMemo(() => {
    if (props.data.length === 0) return "";
    const base = PAD_T + plotH();
    const line = props.data
      .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(d.value).toFixed(1)}`)
      .join(" ");
    return `${line} L${toX(props.data.length - 1).toFixed(1)},${base} L${toX(0).toFixed(1)},${base} Z`;
  });

  const yTicks = createMemo(() => {
    const { min, max } = bounds();
    const count = 4;
    return Array.from({ length: count + 1 }, (_, i) => {
      const v = min + ((max - min) / count) * i;
      return { value: v, y: toY(v) };
    });
  });

  const xLabels = createMemo(() => {
    const len = props.data.length;
    if (len <= 5) return props.data.map((d, i) => ({ label: formatShortDate(d.date), x: toX(i) }));
    const step = Math.ceil(len / 5);
    const labels: { label: string; x: number }[] = [];
    for (let i = 0; i < len; i += step) {
      labels.push({ label: formatShortDate(props.data[i].date), x: toX(i) });
    }
    if ((len - 1) % step !== 0) {
      labels.push({ label: formatShortDate(props.data[len - 1].date), x: toX(len - 1) });
    }
    return labels;
  });

  return (
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-inter font-semibold text-primary-color">{props.label}</span>
        <Show when={props.data.length > 0}>
          <span class="text-sm font-inter font-bold" style={{ color: color() }}>
            {props.data[props.data.length - 1].value.toFixed(0)} {props.unit}
          </span>
        </Show>
      </div>
      <Show
        when={props.data.length >= 2}
        fallback={
          <div class="flex items-center justify-center h-[180px] rounded-xl bg-elevated">
            <span class="text-sm font-inter text-tertiary-color">
              {props.data.length === 1 ? "Need at least 2 sessions to plot" : "No data yet"}
            </span>
          </div>
        }
      >
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} class="w-full rounded-xl bg-elevated" preserveAspectRatio="xMidYMid meet">
          <For each={yTicks()}>
            {(tick) => (
              <>
                <line
                  x1={PAD_L}
                  y1={tick.y}
                  x2={CHART_W - PAD_R}
                  y2={tick.y}
                  stroke="var(--text-muted)"
                  stroke-width="0.5"
                  stroke-dasharray="3,3"
                />
                <text
                  x={PAD_L - 6}
                  y={tick.y + 3}
                  text-anchor="end"
                  fill="var(--text-tertiary)"
                  font-size="9"
                  font-family="Inter, sans-serif"
                >
                  {tick.value.toFixed(0)}
                </text>
              </>
            )}
          </For>

          <defs>
            <linearGradient id={`grad-${props.label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color={color()} stop-opacity="0.25" />
              <stop offset="100%" stop-color={color()} stop-opacity="0.02" />
            </linearGradient>
          </defs>

          <path d={areaPath()} fill={`url(#grad-${props.label})`} />
          <path d={linePath()} fill="none" stroke={color()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

          <For each={props.data}>
            {(d, i) => (
              <circle cx={toX(i())} cy={toY(d.value)} r="3" fill={color()} />
            )}
          </For>

          <For each={xLabels()}>
            {(label) => (
              <text
                x={label.x}
                y={CHART_H - 8}
                text-anchor="middle"
                fill="var(--text-tertiary)"
                font-size="9"
                font-family="Inter, sans-serif"
              >
                {label.label}
              </text>
            )}
          </For>
        </svg>
      </Show>
    </div>
  );
};

export default LineChart;
