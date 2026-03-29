export const Flower = ({
  style,
  color,
  size = 20,
}: {
  style: React.CSSProperties;
  color: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className="absolute pointer-events-none"
    style={style}
  >
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <ellipse
        key={i}
        cx={20 + 10 * Math.cos((angle * Math.PI) / 180)}
        cy={20 + 10 * Math.sin((angle * Math.PI) / 180)}
        rx={6}
        ry={4}
        fill={color}
        transform={`rotate(${angle}, ${20 + 10 * Math.cos((angle * Math.PI) / 180)}, ${20 + 10 * Math.sin((angle * Math.PI) / 180)})`}
        opacity={0.85}
      />
    ))}
    <circle cx={20} cy={20} r={5} fill="#ffe066" />
  </svg>
);
