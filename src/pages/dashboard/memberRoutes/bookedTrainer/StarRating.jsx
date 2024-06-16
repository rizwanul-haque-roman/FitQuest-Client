import { useState } from "react";

const StarRating = ({ totalStars = 5, setRating, rating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
    return (
      <span
        className="text-3xl"
        style={{ cursor: "pointer", color: filled ? "#ffc107" : "#e4e5e9" }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        ★
      </span>
    );
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            filled={starValue <= (hoverRating || rating)}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
