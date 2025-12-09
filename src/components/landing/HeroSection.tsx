import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0b0b0b] flex flex-col items-center justify-center text-white">
            {/* ✨ Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0b0b0b] to-black" />
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[180px]" />

            {/* 🌟 Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-emerald-400/30 rounded-full"
                        style={{
                            width: Math.random() * 3 + "px",
                            height: Math.random() * 3 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* 🧠 Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative text-center px-6 z-10"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                    Empower Your Trading Edge
                </h1>
                <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Gain an advantage with real-time insights, algorithmic precision,
                    and professional-grade tools built for serious traders.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/subscribe")}
                    className="relative mt-10 inline-flex items-center justify-center px-10 py-4 
            text-lg font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400
            hover:from-emerald-400 hover:to-emerald-300 transition-all duration-300
            text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-300/30"
                >
                    Start Your Journey →
                </motion.button>

                <p className="mt-6 text-sm text-gray-500">No commitments. Cancel anytime.</p>
            </motion.div>

            {/* 🩶 Metallic shine overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/[0.03] to-transparent" />

            {/* 🧬 Keyframes */}
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
        `}
            </style>
        </section>
    );
}
