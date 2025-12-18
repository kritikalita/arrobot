import { motion } from "framer-motion";
import { X, ShieldCheck, Activity, Zap } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 1. Backdrop (Click to close) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* 2. Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900 border border-cyan-500/30 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl shadow-cyan-500/10 flex flex-col md:flex-row"
      >
        
        {/* Close Button (Absolute Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-cyan-500 text-white p-2 rounded-full transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        {/* LEFT: Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Overlay Title for Mobile */}
            <div className="absolute bottom-4 left-6 z-20 md:hidden">
                <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                <p className="text-cyan-400 font-mono text-sm">{product.type}</p>
            </div>
        </div>

        {/* RIGHT: Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
            
            {/* Header (Desktop) */}
            <div className="hidden md:block mb-6 border-b border-gray-800 pb-4">
                <h2 className="text-4xl font-bold text-white mb-2">{product.name}</h2>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded">
                        Operational
                    </span>
                    <span className="text-gray-400 font-mono text-sm uppercase">
                        {product.type}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                {product.desc}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {product.specs.map((spec, idx) => (
                    <div key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                             {/* Reusing the filter-cyan class from your index.css */}
                             <img src={spec.icon} className="w-5 h-5 filter-cyan opacity-80" alt="" />
                             <span className="text-xs text-gray-500 uppercase font-bold">{spec.label}</span>
                        </div>
                        <p className="text-xl font-bold text-white">{spec.value}</p>
                    </div>
                ))}
            </div>

            {/* Extra Features List (Mocked for visual depth) */}
            <div className="mt-auto">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-cyan-500" />
                    Mission Capabilities
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-400">
                        <Activity size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                        Real-time telemetry and autonomous navigation systems.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-400">
                        <Zap size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                        High-redundancy power architecture for extended endurance.
                    </li>
                </ul>
            </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;