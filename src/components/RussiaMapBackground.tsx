import { useRef, useEffect, useCallback } from 'react';

// Russia outline (~200 points), projection: lon 27°E–192°E → x 0–1, lat 78°N–42°N → y 0–1
const RUSSIA: [number, number][] = [
    [0.018, 0.222], [0.024, 0.236], [0.030, 0.250], [0.036, 0.253], [0.042, 0.264],
    [0.052, 0.269], [0.061, 0.264], [0.067, 0.250], [0.073, 0.264], [0.079, 0.278],
    [0.085, 0.292], [0.094, 0.306], [0.100, 0.264], [0.106, 0.292],
    [0.097, 0.319], [0.085, 0.347], [0.073, 0.375], [0.061, 0.403],
    [0.067, 0.389], [0.079, 0.361], [0.091, 0.333], [0.103, 0.319], [0.115, 0.306],
    [0.127, 0.292], [0.139, 0.278], [0.152, 0.264], [0.164, 0.250],
    [0.176, 0.250], [0.188, 0.236], [0.200, 0.236],
    [0.218, 0.222], [0.236, 0.194], [0.248, 0.153], [0.255, 0.139],
    [0.261, 0.167], [0.267, 0.194],
    [0.273, 0.167], [0.282, 0.153], [0.285, 0.181], [0.279, 0.222],
    [0.285, 0.208], [0.297, 0.194], [0.309, 0.181],
    [0.321, 0.167], [0.339, 0.153], [0.358, 0.139],
    [0.376, 0.111], [0.394, 0.083], [0.412, 0.056], [0.424, 0.042],
    [0.442, 0.014], [0.455, 0.028], [0.467, 0.042],
    [0.473, 0.056], [0.485, 0.083], [0.497, 0.111], [0.503, 0.125],
    [0.521, 0.139], [0.533, 0.125], [0.545, 0.139], [0.558, 0.139], [0.570, 0.153],
    [0.582, 0.139], [0.594, 0.125], [0.606, 0.139],
    [0.618, 0.153], [0.624, 0.167], [0.636, 0.194],
    [0.655, 0.181], [0.673, 0.194], [0.685, 0.208],
    [0.703, 0.222], [0.715, 0.236], [0.733, 0.250],
    [0.745, 0.264], [0.764, 0.278], [0.776, 0.292], [0.794, 0.306], [0.806, 0.319],
    [0.818, 0.333], [0.830, 0.347], [0.842, 0.333],
    [0.855, 0.347], [0.867, 0.347], [0.879, 0.333],
    [0.891, 0.347], [0.903, 0.342], [0.915, 0.333],
    [0.927, 0.347], [0.939, 0.361], [0.952, 0.375],
    [0.964, 0.389], [0.976, 0.417], [0.982, 0.444], [0.976, 0.472],
    [0.964, 0.528], [0.952, 0.556], [0.945, 0.583],
    [0.933, 0.611], [0.927, 0.639], [0.915, 0.667],
    [0.903, 0.694], [0.897, 0.722], [0.891, 0.750],
    [0.885, 0.736], [0.891, 0.694], [0.879, 0.667],
    [0.861, 0.611], [0.842, 0.556], [0.824, 0.528], [0.806, 0.500],
    [0.788, 0.514], [0.776, 0.528], [0.764, 0.542],
    [0.745, 0.569], [0.733, 0.611], [0.721, 0.653], [0.709, 0.694], [0.697, 0.736],
    [0.685, 0.778], [0.679, 0.819], [0.667, 0.861],
    [0.661, 0.889], [0.655, 0.917], [0.648, 0.944],
    [0.642, 0.972], [0.636, 0.986], [0.630, 0.972],
    [0.624, 0.958], [0.618, 0.931], [0.612, 0.903],
    [0.606, 0.861], [0.600, 0.833], [0.588, 0.806],
    [0.576, 0.778], [0.564, 0.764], [0.552, 0.750], [0.539, 0.764],
    [0.533, 0.778], [0.521, 0.764], [0.509, 0.736],
    [0.503, 0.722], [0.491, 0.736], [0.479, 0.764],
    [0.467, 0.778], [0.455, 0.764], [0.442, 0.778], [0.430, 0.792],
    [0.412, 0.778], [0.394, 0.778], [0.382, 0.792], [0.370, 0.778], [0.364, 0.750],
    [0.352, 0.750], [0.339, 0.736], [0.327, 0.722],
    [0.315, 0.708], [0.303, 0.722], [0.291, 0.708],
    [0.279, 0.694], [0.267, 0.722], [0.255, 0.736],
    [0.242, 0.750], [0.230, 0.764], [0.218, 0.750],
    [0.206, 0.736], [0.194, 0.750], [0.182, 0.750],
    [0.170, 0.764], [0.158, 0.778], [0.145, 0.806], [0.139, 0.847], [0.133, 0.875],
    [0.127, 0.903], [0.121, 0.931], [0.115, 0.944],
    [0.109, 0.958], [0.103, 0.972], [0.097, 0.986],
    [0.091, 0.972], [0.085, 0.958], [0.079, 0.944], [0.076, 0.958],
    [0.067, 0.917], [0.061, 0.875], [0.058, 0.833],
    [0.055, 0.806], [0.048, 0.778], [0.042, 0.750],
    [0.036, 0.722], [0.030, 0.708], [0.024, 0.694],
    [0.018, 0.667], [0.015, 0.639], [0.012, 0.611],
    [0.006, 0.583], [0.006, 0.556], [0.006, 0.528], [0.009, 0.500], [0.012, 0.472],
    [0.009, 0.444], [0.006, 0.417], [0.009, 0.389],
    [0.012, 0.361], [0.012, 0.333], [0.012, 0.306],
    [0.012, 0.278], [0.012, 0.264], [0.015, 0.250], [0.018, 0.222],
];

// Major cities of Russia — normalized coordinates (same projection)
// Red dots marking populated areas to create a sense of scale
const CITIES: { x: number; y: number; size: number }[] = [
    // === European Russia (dense cluster) ===
    { x: 0.064, y: 0.618, size: 1.4 },  // Москва
    { x: 0.060, y: 0.603, size: 0.7 },  // Тверь
    { x: 0.054, y: 0.588, size: 0.6 },  // Великий Новгород
    { x: 0.032, y: 0.503, size: 1.1 },  // Санкт-Петербург
    { x: 0.036, y: 0.253, size: 0.7 },  // Мурманск
    { x: 0.058, y: 0.364, size: 0.6 },  // Архангельск
    { x: 0.103, y: 0.603, size: 0.9 },  // Нижний Новгород
    { x: 0.074, y: 0.611, size: 0.7 },  // Владимир
    { x: 0.064, y: 0.639, size: 0.6 },  // Рязань
    { x: 0.058, y: 0.658, size: 0.6 },  // Тула
    { x: 0.074, y: 0.731, size: 0.8 },  // Воронеж
    { x: 0.048, y: 0.700, size: 0.6 },  // Курск
    { x: 0.042, y: 0.675, size: 0.6 },  // Брянск
    { x: 0.048, y: 0.644, size: 0.6 },  // Смоленск
    { x: 0.134, y: 0.617, size: 0.9 },  // Казань
    { x: 0.140, y: 0.689, size: 0.8 },  // Самара
    { x: 0.175, y: 0.647, size: 0.8 },  // Уфа
    { x: 0.115, y: 0.636, size: 0.7 },  // Чебоксары
    { x: 0.121, y: 0.658, size: 0.7 },  // Ульяновск
    { x: 0.106, y: 0.814, size: 0.8 },  // Волгоград
    { x: 0.115, y: 0.736, size: 0.7 },  // Саратов
    { x: 0.127, y: 0.708, size: 0.7 },  // Пенза
    { x: 0.177, y: 0.556, size: 0.8 },  // Пермь
    { x: 0.085, y: 0.575, size: 0.7 },  // Кострома
    { x: 0.091, y: 0.558, size: 0.7 },  // Ярославль
    { x: 0.070, y: 0.542, size: 0.6 },  // Вологда
    { x: 0.077, y: 0.856, size: 0.8 },  // Ростов-на-Дону
    { x: 0.072, y: 0.917, size: 0.7 },  // Краснодар
    { x: 0.079, y: 0.956, size: 0.6 },  // Сочи
    { x: 0.100, y: 0.961, size: 0.7 },  // Махачкала
    { x: 0.091, y: 0.944, size: 0.6 },  // Грозный
    { x: 0.085, y: 0.889, size: 0.6 },  // Ставрополь
    { x: 0.133, y: 0.781, size: 0.6 },  // Оренбург
    { x: 0.103, y: 0.783, size: 0.6 },  // Энгельс
    // === Урал ===
    { x: 0.204, y: 0.589, size: 0.9 },  // Екатеринбург
    { x: 0.209, y: 0.636, size: 0.8 },  // Челябинск
    { x: 0.218, y: 0.611, size: 0.6 },  // Курган
    { x: 0.249, y: 0.578, size: 0.7 },  // Тюмень
    // === Западная Сибирь ===
    { x: 0.281, y: 0.642, size: 0.8 },  // Омск
    { x: 0.339, y: 0.639, size: 0.9 },  // Новосибирск
    { x: 0.351, y: 0.597, size: 0.7 },  // Томск
    { x: 0.333, y: 0.681, size: 0.7 },  // Барнаул
    { x: 0.370, y: 0.653, size: 0.7 },  // Кемерово
    // === Восточная Сибирь ===
    { x: 0.400, y: 0.611, size: 0.8 },  // Красноярск
    { x: 0.469, y: 0.714, size: 0.7 },  // Иркутск
    { x: 0.491, y: 0.681, size: 0.6 },  // Улан-Удэ
    { x: 0.460, y: 0.639, size: 0.5 },  // Братск
    { x: 0.370, y: 0.242, size: 0.5 },  // Норильск
    // === Дальний Восток ===
    { x: 0.622, y: 0.444, size: 0.6 },  // Якутск
    { x: 0.655, y: 0.819, size: 0.7 },  // Хабаровск
    { x: 0.636, y: 0.972, size: 0.7 },  // Владивосток
    { x: 0.667, y: 0.750, size: 0.5 },  // Комсомольск-на-Амуре
    { x: 0.797, y: 0.694, size: 0.5 },  // Петропавловск-Камчатский
    { x: 0.564, y: 0.531, size: 0.5 },  // Магадан
    { x: 0.679, y: 0.861, size: 0.5 },  // Южно-Сахалинск
];

function pip(x: number, y: number, poly: [number, number][]): boolean {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
}

function dte(x: number, y: number, poly: [number, number][]): number {
    let min = Infinity;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const ax = poly[j][0], ay = poly[j][1], bx = poly[i][0], by = poly[i][1];
        const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
        const t = Math.max(0, Math.min(1, l2 === 0 ? 0 : ((x - ax) * dx + (y - ay) * dy) / l2));
        const d = Math.sqrt((x - ax - t * dx) ** 2 + (y - ay - t * dy) ** 2);
        if (d < min) min = d;
    }
    return min;
}

interface Dot {
    x: number; y: number;
    baseR: number; baseA: number;
    ph1: number; ph2: number; ph3: number;
    spd: number; twSpd: number; twInt: number;
    inside: boolean; border: boolean;
}

export default function RussiaMapBackground({ style, className }: { style?: React.CSSProperties; className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const animRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const dprRef = useRef(1);

    const gen = useCallback((w: number, h: number): Dot[] => {
        const dots: Dot[] = [];
        const sp = 12;
        const cols = Math.ceil(w / sp) + 1;
        const rows = Math.ceil(h / sp) + 1;
        const px = w * 0.02, py = h * 0.02;
        const mw = w * 0.96, mh = h * 0.96;
        const brd = 0.018;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * sp, y = r * sp;
                const nx = (x - px) / mw, ny = (y - py) / mh;
                const ib = nx >= -0.02 && nx <= 1.02 && ny >= -0.02 && ny <= 1.02;
                const ins = ib && pip(nx, ny, RUSSIA);
                const d = ib ? dte(nx, ny, RUSSIA) : 1;
                const onB = d < brd && ins;

                let baseR: number, baseA: number;
                if (ins) {
                    if (onB) {
                        const f = 1 - d / brd;
                        baseR = 1.0 + f * 1.5;
                        baseA = 0.12 + f * 0.22;
                    } else {
                        baseR = 0.5 + Math.random() * 0.7;
                        baseA = 0.03 + Math.random() * 0.05;
                    }
                } else if (d < 0.04) {
                    const f = 1 - d / 0.04;
                    baseR = 0.3 + f * 0.3;
                    baseA = 0.01 + f * 0.015;
                } else {
                    baseR = 0.2 + Math.random() * 0.15;
                    baseA = 0.006 + Math.random() * 0.006;
                }

                dots.push({
                    x, y, baseR, baseA,
                    ph1: Math.random() * Math.PI * 2,
                    ph2: Math.random() * Math.PI * 2,
                    ph3: Math.random() * Math.PI * 2,
                    spd: 0.12 + Math.random() * 0.3,
                    twSpd: 0.3 + Math.random() * 0.7,
                    twInt: ins ? (Math.random() < 0.15 ? 0.12 + Math.random() * 0.1 : 0.03 + Math.random() * 0.06) : 0.01,
                    inside: ins, border: onB,
                });
            }
        }
        return dots;
    }, []);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const obs = new ResizeObserver(es => {
            for (const e of es) {
                const { width: w, height: h } = e.contentRect;
                const d = Math.min(window.devicePixelRatio || 1, 2);
                dprRef.current = d;
                cv.width = w * d; cv.height = h * d;
                cv.style.width = `${w}px`; cv.style.height = `${h}px`;
                sizeRef.current = { w, h };
                dotsRef.current = gen(w, h);
            }
        });
        obs.observe(cv.parentElement || cv);
        return () => obs.disconnect();
    }, [gen]);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const noM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const t0 = performance.now();

        const draw = (ts: number) => {
            const ctx = cv.getContext('2d');
            if (!ctx) return;
            const el = (ts - t0) / 1000;
            const d = dprRef.current;
            const { w, h } = sizeRef.current;
            const px = w * 0.02, py = h * 0.02, mw = w * 0.96, mh = h * 0.96;

            ctx.clearRect(0, 0, w * d, h * d);
            ctx.scale(d, d);

            // Draw grid dots
            for (const dot of dotsRef.current) {
                let a = 1;
                if (!noM) {
                    const w1 = Math.sin(el * dot.spd * 0.5 + dot.ph1);
                    const w2 = Math.sin(el * dot.twSpd + dot.ph2);
                    const w3 = Math.sin(el * dot.spd * 1.0 + dot.ph3);
                    const tw = Math.pow(Math.max(0, w2), 3) * dot.twInt;
                    a = (w1 * 0.5 + 0.5) * 0.15 + 0.85 + (w3 * 0.5 + 0.5) * 0.06 + tw;
                }
                const r = dot.baseR * a;
                const op = dot.baseA * a;
                if (op < 0.004 || r < 0.12) continue;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
                ctx.fillStyle = dot.border
                    ? `rgba(59, 108, 240, ${op})`
                    : dot.inside
                        ? `rgba(59, 108, 240, ${op * 0.7})`
                        : `rgba(30, 40, 80, ${op * 0.4})`;
                ctx.fill();
            }

            // Draw red city markers with gentle pulse
            for (const city of CITIES) {
                const cx = px + city.x * mw;
                const cy = py + city.y * mh;
                let pulse = 1;
                if (!noM) {
                    pulse = 0.85 + Math.sin(el * 0.8 + city.x * 20 + city.y * 30) * 0.15;
                }
                const cr = (2.5 + city.size * 2) * pulse;
                const ca = (0.55 + city.size * 0.15) * pulse;

                // Glow
                ctx.beginPath();
                ctx.arc(cx, cy, cr * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 50, 47, ${ca * 0.12})`;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 50, 47, ${ca})`;
                ctx.fill();
            }

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, []);

    return (
        <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, ...style }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
}
