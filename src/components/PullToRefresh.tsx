import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

const THRESHOLD = 100;

function ChewingLogo({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`text-[#FF5C34] font-black text-xl leading-none ${active ? "animate-chew" : ""}`}
        style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}
      >
        co
      </span>
      <span
        className={`block rounded-full bg-[#FF5C34] ${active ? "animate-bg-pulse" : ""}`}
        style={{ width: 6, height: 6 }}
      />
      <span
        className={`text-[#FF5C34] font-black text-xl leading-none ${active ? "animate-chew" : ""}`}
        style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800 }}
      >
        my
      </span>
    </div>
  );
}

export function PullToRefresh({ onRefresh, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY <= 0) startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (refreshing) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0 && window.scrollY <= 0) setPullDistance(Math.min(dy * 0.5, 150));
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

  const reached = pullDistance >= THRESHOLD;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {(pullDistance > 0 || refreshing) && (
        <div className="flex justify-center" style={{ height: refreshing ? 60 : pullDistance }}>
          <motion.div
            animate={{ scale: reached || refreshing ? 1 : 0.6 + (pullDistance / THRESHOLD) * 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center pt-3"
          >
            <ChewingLogo active={refreshing || reached} />
          </motion.div>
        </div>
      )}
      {children}
    </div>
  );
}
