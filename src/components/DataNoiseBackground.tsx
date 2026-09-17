import {useEffect, useRef} from "react";


const GLYPHS =  '01アイウエオカキクケコサシスセソ$#@%&*+-<>[]{}!?';
const FONT_SIZE = 14;
const color = '0, 255, 255';

export function DataNoiseBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let width: number, height: number, columns: number, drops: number[];
        let frameId: number;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / FONT_SIZE);
            drops = new Array(columns).fill(0).map(() => Math.random() * -100);
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.fillStyle = 'rgba(5, 8, 10, 0.12)';
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${FONT_SIZE}px monospace`;

            for (let i = 0; i < columns; i++) {
                const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;
                const isLead = Math.random() > 0.975;

                ctx.fillStyle = isLead ? `rgba(${color}, 0.5)` : `rgba(${color}, 0.12)`;
                ctx.fillText(char, x, y);

                if(y > height && Math.random() > 0.975) drops[i] = 0;
                drops[i] += 0.4;
            }
            frameId = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
        };

    }, [color]);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
    );
}