import { useEffect, useState } from "react";

export default function BackgroundFX() {
    const [particles, setParticles] = useState<
        { top: string; left: string; size: number; delay: number; duration: number }[]
    >([]);

    useEffect(() => {
        const arr = Array.from({ length: 25 }).map(() => ({
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            size: Math.random() * 3 + 1,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 5,
        }));
        setParticles(arr);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* ✨ Emerald glow gradients */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[180px]" />

            {/* 🌟 Floating particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute bg-emerald-400/30 rounded-full"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: p.top,
                        left: p.left,
                        animation: `float ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}

            {/* ✨ Metallic reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-transparent pointer-events-none" />

            {/* 🔮 Keyframes */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
