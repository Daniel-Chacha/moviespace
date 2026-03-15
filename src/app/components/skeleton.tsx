'use client'

const SKELETON_WIDTHS = [120, 100, 130, 110, 125, 115, 105, 120, 130, 110, 120, 100];

export const CategorySkeleton = () => {
  return (
    <>
      {SKELETON_WIDTHS.map((width, i) => (
        <div
          key={i}
          className="h-[180px] flex-shrink-0 rounded-md overflow-hidden relative"
          style={{
            width: `${width}px`,
            animationDelay: `${i * 120}ms`,
          }}
        >
          {/* Base dark background */}
          <div className="absolute inset-0 bg-gray-800" />

          {/* Shimmer sweep — each card has its own delay so they pulse independently */}
          <div
            className="absolute inset-0 shimmer-sweep"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .shimmer-sweep {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(103, 232, 249, 0.08) 40%,
            rgba(103, 232, 249, 0.18) 50%,
            rgba(103, 232, 249, 0.08) 60%,
            transparent 100%
          );
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
