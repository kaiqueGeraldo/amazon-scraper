interface RatingProps {
  ratingString: string;
}

const parseRating = (ratingString: string): number => {
  const match = ratingString.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

export default function Rating({ ratingString }: RatingProps) {
  const value = parseRating(ratingString);
  const fullStars = Math.floor(value);
  const decimal = value - fullStars;
  const halfStar = decimal >= 0.25 && decimal < 0.75;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1 text-yellow-500 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {halfStar && <span>✩</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
      <span className="text-gray-600 ml-2">{value.toFixed(1)}/5</span>
    </span>
  );
}
