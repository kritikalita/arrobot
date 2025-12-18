import { useState } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion"; 
import { uasProducts } from "../data";
import TiltCard from "./TiltCard";
import DecryptText from "./DecryptText";
import ProductModal from "./ProductModal"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSlider = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    // ✅ FIXED: Optimized padding for Tablet (md:px-12) vs Desktop (lg:px-20)
    // This prevents cards from being too narrow on iPad Portrait views
    <div id="uas" className="py-20 bg-transparent text-white px-6 md:px-12 lg:px-20 relative">
      
      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 border-l-4 border-cyan-500 pl-4 md:pl-6"
        >
          {/* ✅ FIXED: Font size scaling for tablets */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
            <DecryptText text="UAS & C-UAS Systems" />
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Advanced autonomous defense solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            // ✅ CONFIRMED: These breakpoints are perfect for Tablet (2 slides) and Desktop (3 slides)
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
          >
            {uasProducts.map((item) => (
              <SwiperSlide key={item.id}>
                
                <div 
                  onClick={() => setSelectedProduct(item)} 
                  className="cursor-pointer"
                >
                  <TiltCard className="relative h-[420px] w-full flex flex-col rounded-xl bg-black border border-gray-700 overflow-hidden group">
                    
                    <span 
                      style={{ transform: "translateZ(60px)" }} 
                      className="absolute top-6 right-6 text-5xl font-bold text-white/50 z-30 group-hover:text-cyan-500 transition-colors duration-300"
                    >
                      0{item.id}
                    </span>

                    <div 
                      style={{ transform: "translateZ(30px)" }}
                      className="h-48 w-full overflow-hidden relative shrink-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div 
                      style={{ transform: "translateZ(50px)" }}
                      className="p-6 flex flex-col flex-grow bg-black relative"
                    >
                      <h3 className="text-2xl font-bold text-cyan-500 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 font-mono uppercase">
                        {item.type}
                      </p>

                      <p className="text-gray-300 mb-6 text-sm flex-grow leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>

                      <div className="mt-auto text-center text-xs text-cyan-500/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pt-4 pb-2">
                        Click for details
                      </div>

                    </div>
                  </TiltCard>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductSlider;