import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardStack = ({
  images = [],
  className = "",
  cardWidth = 200,
  cardHeight = 250,
}) => {
  const [cards, setCards] = useState(images);

  useEffect(() => {
    setCards(images);
  }, [images]);

  const handleDragEnd = (event, info) => {
    // If dragged far enough left or right, move card to back
    if (Math.abs(info.offset.x) > 100) {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ minHeight: cardHeight + 50, minWidth: cardWidth + 50 }}
    >
      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === 0;
          const offset = index * 8;
          const scale = 1 - index * 0.05;
          const rotate = index * 2;

          return (
            <motion.div
              key={card.id || index}
              className="absolute rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl flex items-center justify-center"
              style={{
                zIndex: cards.length - index,
                // Dynamic sizing: Use auto to respect aspect ratio, but constrain max dimensions
                width: card.width || "auto",
                height: card.height || "auto",
                maxWidth: cardWidth,
                maxHeight: cardHeight,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                x: offset,
                y: offset,
                scale,
                rotate,
                opacity: index < 4 ? 1 : 0,
              }}
              exit={{ x: -300, opacity: 0, rotate: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ cursor: "grabbing", scale: 1.05 }}
            >
              <img
                src={card.src}
                alt={card.alt || `Card ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              {card.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-medium">{card.label}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Swipe hint */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 text-white/40 text-sm z-50">
        Swipe to explore
      </div>
    </div>
  );
};

export default CardStack;
