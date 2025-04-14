import { motion } from "framer-motion";
import { Sparkles, Hammer, Clock } from "lucide-react";

export default function FeatureComingSoon() {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-[#83c0f2] via-blue-600 to-blue-500 text-white shadow-2xl rounded-2xl p-8 max-w-md text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-4"
          >
            <Hammer size={48} />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            Coming Soon <Sparkles size={24} />
          </h2>
          <p className="text-lg mb-4">
            This feature is currently under development. Stay tuned!
          </p>
          <motion.div
            className="flex justify-center gap-2"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Clock size={32} />
            <Clock size={32} />
            <Clock size={32} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}