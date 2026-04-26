import React, { useState, useEffect } from "react";
import { ZoomIn } from "lucide-react";

interface ProductDetailCardProps {
  images?: string[];
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Thumbnail Strip (Vertical on Desktop, Horizontal on Mobile) */}
      <div className="order-2 md:order-1 flex md:flex-col gap-4 w-full md:w-24 md:max-h-[520px] overflow-x-auto md:overflow-y-auto no-scrollbar py-2 px-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 shadow-sm ${currentImage === image ? "border-violet-600 scale-105 shadow-md" : "border-gray-100 hover:border-gray-200"
              }`}
            onClick={() => setCurrentImage(image)}
          >
            <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="order-1 md:order-2 flex-1 w-full relative group">
        <div
          className="relative aspect-[4/4] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden cursor-zoom-in transition-all duration-500 hover:shadow-xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Product Image with Magnifier Zoom */}
          <img
            src={currentImage}
            alt="Main product"
            className={`w-full h-full object-contain transition-transform duration-200 ease-out ${isHovered ? 'scale-[2.5]' : 'scale-100'}`}
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`
            }}
          />

          <div className="absolute top-4 right-4 flex flex-col gap-3">
          </div>

          {/* Zoom Indicator */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>

        {/* Brand Background Glow (Subtle Aesthetic) */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-violet-100/30 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default ProductDetailCard;
