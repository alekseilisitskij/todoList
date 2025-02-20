export const PlusBtn = ({ count, handelClick }) => {
  return (
    <button className="btn btn-reset btn__contacts" onClick={handelClick}>
      <svg
        className="contacts__svgNumber"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="7.5" stroke="#9873FF" />
        <text
          x="50%"
          y="50%"
          fontSize="8"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#333333"
        >
          {`+${count - 4}`}
        </text>
      </svg>
    </button>
  );
};
