/**
 * Stylised Mongolia outline for the placeholder maps. Coordinates are approximate
 * (lon, lat) border vertices projected into the same % space used by /data
 * (x = (lon − 87.7) / 32.2 × 100, y = (52.1 − lat) / 10.5 × 100).
 */
const border: [number, number][] = [
  [87.8, 49.2], [88.9, 49.5], [90.1, 50.1], [91.5, 50.5], [92.5, 50.8], [94.3, 50.6], [95.0, 49.9],
  [96.4, 50.0], [97.8, 49.9], [98.3, 50.5], [97.8, 51.0], [98.9, 52.05], [100.0, 51.7], [101.2, 51.5],
  [102.1, 51.4], [102.4, 50.6], [103.7, 50.2], [105.3, 50.4], [106.8, 50.3], [107.9, 49.9], [108.5, 49.3],
  [110.7, 49.15], [112.0, 49.5], [113.1, 49.6], [114.4, 50.25], [115.4, 49.9], [116.7, 49.85], [116.2, 49.0],
  [115.5, 48.15], [116.0, 47.8], [117.4, 47.65], [118.5, 48.0], [119.7, 47.2], [119.9, 46.7], [118.9, 46.75],
  [117.4, 46.6], [116.0, 45.7], [114.5, 45.4], [113.5, 44.8], [111.9, 45.1], [111.3, 44.4], [110.4, 42.9],
  [108.8, 42.5], [107.4, 42.4], [105.0, 41.6], [103.0, 42.2], [101.8, 42.5], [100.0, 42.6], [97.2, 42.8],
  [96.3, 43.0], [95.3, 44.2], [93.5, 45.0], [92.1, 45.1], [90.9, 45.3], [90.7, 46.0], [91.0, 46.6],
  [90.3, 47.7], [89.0, 48.0], [88.1, 48.6],
];

/** Horizontal stretch so the outline keeps its real proportions (≈ cos 47° correction). */
export const MAP_ASPECT = 2.09;

export const toPct = (lon: number, lat: number) => ({ x: ((lon - 87.7) / 32.2) * 100, y: ((52.1 - lat) / 10.5) * 100 });

/** Project a % point into the SVG viewBox (0 0 209 100). */
export const proj = (p: { x: number; y: number }) => ({ x: p.x * MAP_ASPECT, y: p.y });

export const outlinePath =
  border
    .map(([lon, lat], i) => {
      const { x, y } = proj(toPct(lon, lat));
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join("") + "Z";

/** Ulaanbaatar, for orientation on every map. */
export const capital = toPct(106.9, 47.9);
