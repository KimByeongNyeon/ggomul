export const Leaf = ({
  style,
  rotate = 0,
}: {
  style: React.CSSProperties;
  rotate?: number;
}) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    className="absolute pointer-events-none"
    style={{ ...style, transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M12 2 C6 2 2 8 2 14 C2 18 5 22 12 22 C19 22 22 18 22 14 C22 8 18 2 12 2Z"
      fill="#7dc47d"
      opacity={0.75}
    />
    <line
      x1="12"
      y1="4"
      x2="12"
      y2="20"
      stroke="#5aa85a"
      strokeWidth={1.2}
      opacity={0.6}
    />
  </svg>
);
