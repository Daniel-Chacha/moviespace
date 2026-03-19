'use client'

const SKELETON_WIDTHS = [
  120, 105, 130, 115, 125, 110, 120, 100,
  130, 115, 105, 125, 110, 120, 100, 130,
];

export const CategorySkeleton = () => {
  return (
    // Wrapper is the full combined width of all cards — the shimmer travels across it
    <div className="relative flex flex-row gap-4 flex-shrink-0 overflow-hidden">

      {SKELETON_WIDTHS.map((width, i) => (
        <div
          key={i}
          className="h-[180px] flex-shrink-0 rounded-md bg-gray-700"
          style={{ width: `${width}px` }}
        />
      ))}

      {/* Single wave that travels from the first element to the last */}
      <div className="shimmer-wave" />

      <style>{`
        @keyframes skeleton-wave {
          0%   { left: -25%; }
          100% { left: 110%; }
        }
        .shimmer-wave {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(156, 163, 175, 0.12) 30%,
            rgba(209, 213, 219, 0.28) 50%,
            rgba(156, 163, 175, 0.12) 70%,
            transparent 100%
          );
          animation: skeleton-wave 2.2s ease-in-out infinite;
          pointer-events: none;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
