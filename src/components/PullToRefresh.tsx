import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

interface Props {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

const THRESHOLD = 100;

export function PullToRefresh({ onRefresh, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (refreshing) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0 && containerRef.current && containerRef.current.scrollTop <= 0) {
        setPullDistance(Math.min(dy * 0.5, 150));
      }
    },
    [refreshing],
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, refreshing, onRefresh]);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-auto"
    >
      {pullDistance > 0 && (
        <div className="flex justify-center py-4" style={{ height: pullDistance }}>
          <motion.div
            animate={{ rotate: pullDistance > THRESHOLD ? 360 : pullDistance * 3.6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-[#FF5C34]"
          >
            <Utensils size={24} />
          </motion.div>
        </div>
      )}
      {refreshing && (
        <div className="flex justify-center py-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="text-[#FF5C34]"
          >
            <Utensils size={24} />
          </motion.div>
        </div>
      )}
      {children}
    </div>
  );
}
