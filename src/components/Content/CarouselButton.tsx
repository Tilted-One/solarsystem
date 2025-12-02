type CarouselButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function CarouselButton({
  direction,
  onClick,
}: CarouselButtonProps) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 bg-white rounded-2xl py-2 px-3 flex items-center justify-center cursor-pointer z-10 shadow-md ${
        isLeft ? "left-6" : "right-6"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d={isLeft ? "M14.75 18l-6-6 6-6" : "M9.25 6l6 6-6 6"}
        />
      </svg>
    </button>
  );
}


