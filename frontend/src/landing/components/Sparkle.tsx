export const Sparkle = ({ style }: { style: React.CSSProperties }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    className="absolute pointer-events-none"
    style={style}
  >
    <path
      d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z"
      fill="#f5c842"
      opacity={0.7}
    />
  </svg>
);
