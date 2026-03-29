export const Cloud = ({ className }: { className: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="relative">
      <div
        className="absolute w-16 h-10 rounded-full bg-white opacity-80"
        style={{ top: 8, left: 8 }}
      />
      <div
        className="absolute w-20 h-12 rounded-full bg-white opacity-80"
        style={{ top: 4, left: 20 }}
      />
      <div
        className="absolute w-14 h-9 rounded-full bg-white opacity-80"
        style={{ top: 10, left: 36 }}
      />
      <div className="w-48 h-8 rounded-full bg-white opacity-70 mt-8" />
    </div>
  </div>
);
