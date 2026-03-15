import { useRef, useEffect, useCallback } from 'react';

interface DotGridBackgroundProps {
    /** Dot color in RGB format, e.g. "180, 190, 210" */
    dotColor?: string;
    /** Secondary dot color (unused in uniform mode, kept for API compat) */
    dotColorNeutral?: string;
    /** Grid spacing in px */
    spacing?: number;
    /** Min dot radius */
    minRadius?: number;
    /** Max dot radius */
    maxRadius?: number;
    /** Base opacity of dots */
    baseOpacity?: number;
    /** Animation speed multiplier */
    speed?: number;
    /** Style for the container */
    style?: React.CSSProperties;
    /** Class for the container */
    className?: string;
}

export default function DotGridBackground({
    dotColor = '180, 190, 210',
    spacing = 22,
    minRadius = 0.8,
    maxRadius = 1.0,
    baseOpacity = 0.35,
    speed = 0.3,
    style,
    className,
}: DotGridBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const dprRef = useRef(1);
    const gridRef = useRef<{ x: number; y: number; r: number; phase: number }[]>([]);

    const generateGrid = useCallback(
        (width: number, height: number) => {
            const dots: { x: number; y: number; r: number; phase: number }[] = [];
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;
            const rRange = maxRadius - minRadius;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    dots.push({
                        x: col * spacing,
                        y: row * spacing,
                        r: minRadius + Math.random() * rRange,
                        phase: Math.random() * Math.PI * 2,
                    });
                }
            }
            return dots;
        },
        [spacing, minRadius, maxRadius],
    );

    // Resize handling
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                dprRef.current = dpr;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                sizeRef.current = { w: width, h: height };
                gridRef.current = generateGrid(width, height);
            }
        });

        resizeObserver.observe(canvas.parentElement || canvas);
        return () => resizeObserver.disconnect();
    }, [generateGrid]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const t0 = performance.now();

        const draw = (timestamp: number) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const elapsed = (timestamp - t0) / 1000;
            const dpr = dprRef.current;
            const { w, h } = sizeRef.current;

            ctx.clearRect(0, 0, w * dpr, h * dpr);
            ctx.scale(dpr, dpr);

            const dots = gridRef.current;
            const color = dotColor;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];

                // Very subtle breathing: opacity gently oscillates ±8%
                let opacity = baseOpacity;
                if (!prefersReducedMotion) {
                    const wave = Math.sin(elapsed * speed + dot.phase);
                    opacity = baseOpacity * (0.92 + wave * 0.08);
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${opacity})`;
                ctx.fill();
            }

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [dotColor, baseOpacity, speed]);

    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}
