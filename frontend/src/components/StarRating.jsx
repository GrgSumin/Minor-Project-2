import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ value = 0, count, size = 14, showCount = true }) {
  const stars = [];
  const v = Number(value) || 0;
  for (let i = 1; i <= 5; i++) {
    if (v >= i) stars.push(<FaStar key={i} />);
    else if (v >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#f59e0b", fontSize: size }}>
      {stars}
      {showCount && count !== undefined && (
        <span style={{ color: "var(--text-muted)", fontSize: size - 1, marginLeft: 4 }}>
          ({count})
        </span>
      )}
    </span>
  );
}
